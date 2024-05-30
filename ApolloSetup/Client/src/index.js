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
import Counter from "./counter";

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

const ADD_COUNTER = gql`
    mutation AddCounter($count: Int!, $name: String!) {
        addCounter(count: $count, name: $name) {
        id
        count
        name
        }
    }
    `;

const GET_COUNTERS = gql`
    query GetCounters {
        counters {
        id
        count
        name
        }
    }
    `;

const UPDATE_COUNTER = gql`
    mutation UpdateCounter($id: String!, $count: Int!, $name: String!) {
        updateCounter(id: $id, count: $count, name: $name) {
        id
        count
        name
        }
    }
    `;

function AddCounter() {
  let count;
  let name;
  const [addCounter] = useMutation(ADD_COUNTER, 
    {
      update(
        cache,
        {
          data: { addCounter }
        }
      ) {
        cache.modify({
          fields: {
            counters(existingCounters = []) {
              const newCounterRef = cache.writeFragment({
                data: addCounter,
                fragment: gql`
                  fragment NewCounter on Counter {
                    id
                    count
                    name
                  }
                `
              });
              return existingCounters.concat(newCounterRef);
            }
          }
        });
      }
    }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCounter({ variables: { count: count, name: name } });
          count = 0;
          name = "";
        }}
      >
        <input
          type="number"
          value={count}
          onChange={(e) => count = parseInt(e.target.value)}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => name = e.target.value}
        />
        <button type="submit">Add Counter</button>
      </form>
    </div>
  );
}

function Counters() {
  const { loading, error, data } = useQuery(GET_COUNTERS);
  // const observableQuery = client.watchQuery({
  //   query: GET_COUNTERS,
  //   pollInterval: 5000,
  // });
  const [
    updateCounter,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_COUNTER);

  // React.useEffect(() => {
  //   const subscription = observableQuery.subscribe({
  //     next({ data }) {
  //       console.log('Data from observable query:', data);
  //     },
  //     error(error) {
  //       console.error('Error from observable query:', error);
  //     },
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [observableQuery]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {mutationError.message}</p>;

  const counters = data.counters.map(({ id, count, name }) => {
    let input;

    return (
      <li key={id}>
        <p>{name}</p>
        <p>{count}</p>

          <button onClick={(e) => {
            e.preventDefault();
            updateCounter({ variables: { id: id, count: count + 1, name: name } });
          }}>Increment</button>

          <button onClick={(e) => {
            e.preventDefault();
            updateCounter({ variables: { id: id, count: count - 1, name: name } });
          }}>Decrement</button>

      </li>
    );
  });
    
}
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My to-do list</h2>
        <AddTodo />
        <Todos />
        <AddCounter />
        <Counters />
        {/* <Counter /> */}
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
