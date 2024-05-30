import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
  ObservableQuery
} from "@apollo/client";
import './styles.css';

const serverURL = 'http://localhost:4000';

const cache = new InMemoryCache();

cache.watch({
  query: gql`
    query GetTodos {
      todos {
        id
        description
        completed
      }
    }
  `,
  callback: (newData) => {
    console.log('Cache data updated:', newData);
  },
});

// class LoggingCache extends InMemoryCache {
//   broadcastWatches() {
//     super.broadcastWatches();
//     console.log('Cache data:', this.extract());
//   }
// }

// const cache = new LoggingCache();


const client = new ApolloClient({
  uri: serverURL,
  cache: cache,
  connectToDevTools: true
});

const ADD_TODO = gql`
  mutation AddTodo($description: String!) {
    addTodo(description: $description) {
      id
      description   
    }
  }
`;

function AddTodo() {
  let input;
  const [addTodo] = useMutation(ADD_TODO, {
    update(
      cache,
      {
        data: { addTodo }
      }
    ) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  description
                }
              `
            });
            return existingTodos.concat(newTodoRef);
          }
        }
      });
    }
  });

  return (
    <div id="add-todo-container">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            alert("Cannot add an empty to-do item.");
            return;
          }
          addTodo({
            variables: { description: input.value },
            optimisticResponse: {
              addTodo: {
                id: 'temp-id',
                __typename: "Todo",
                description: input.value,
              }
            }
          });

          input.value = "";
        }}
        id="add-todo-form"
      >
        <input
          ref={node => {
            input = node;
          }}
          id="add-todo-input"
          className="add-todo-input"
        />
        <button type="submit" id="add-todo-button" className="add-todo-button">Create item</button>
      </form>
    </div>
  );
}

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $description: String!, $completed: Boolean!) {
    updateTodo(id: $id, description: $description, completed: $completed) {
      id
      description
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const observableQuery = client.watchQuery({
    query: GET_TODOS,
    pollInterval: 5000,
  });
  const [
    updateTodo,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_TODO);

  const [deleteTodo] = useMutation(DELETE_TODO);
  
  React.useEffect(() => {
    const subscription = observableQuery.subscribe({
      next({ data }) {
        console.log('Data from observable query:', data);
      },
      error(error) {
        console.error('Error from observable query:', error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [observableQuery]);

  if (loading) return <p id="loading-message">Loading...</p>;
  if (error) return <p id="error-message">Error: {error.message}</p>;

  const todos = data.todos.map(({ id, description, completed }) => {
    let input;

    return (
      <li key={id} className="todo-item">
        <input
          type="checkbox"
          checked={completed}
          onChange={e => {
            updateTodo({ variables: { id, description, completed: e.target.checked } });
          }}
          className="todo-checkbox"
        />
        <p className="todo-description">{description}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo({ variables: { id, description: input.value, completed: false } });
            input.value = "";
          }}
          className="todo-form"
        >
          <input
            ref={node => {
              input = node;
            }}
            className="todo-input"
          />
          <button type="submit" className="todo-button">Update item</button>
        </form>
        
        <button className="delete-button" onClick={e => {
            e.preventDefault();
            console.log('Delete button clicked');
            console.log('id:', id);
            deleteTodo({ variables: { id } });
            window.location.reload();
          }}> Delete Item</button>
          
      </li>
    );
  });

  return (
    <div id="todo-container">
      <ul id="todo-list">{todos}</ul>
      {mutationLoading && <p id="mutation-loading-message">Loading...</p>}
      {mutationError && <p id="mutation-error-message">Error: {mutationError.message}</p>}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My to-do list</h2>
        <AddTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
