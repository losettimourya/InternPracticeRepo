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
import Observable from 'zen-observable';

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
  mutation AddTodo($description: String!, $completed: Boolean!) {
    addTodo(description: $description, completed: $completed) {
      id
      description   
      completed
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
                  completed
                }
              `
            });
            // return existingTodos.concat(newTodoRef);
            return [...existingTodos, newTodoRef];
          },

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
            variables: { description: input.value, completed: false },
            optimisticResponse: {
              addTodo: {
                id: 'temp-id',
                __typename: "Todo",
                description: input.value,
                completed: false
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
              // return existingCounters.concat(newCounterRef);
              return [...existingCounters, newCounterRef];
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
          addCounter({ variables: { count: 0, name: name } });
          count = 0;
          name = "";
        }}
      >
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
  const observableQuery = client.watchQuery({
    query: GET_COUNTERS,
    pollInterval: 5000,
  });



  const [
    updateCounter,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_COUNTER);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
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
  return (
    <div>
      <ul>
        {counters}
      </ul>
    </div>
  );

}
function CacheFunctions() {
  const [extractedcache, setExtractedCache] = React.useState(null);
  const extractedCache = () => {
    const extractedCache = cache.extract();
    console.log(extractedCache);
    setExtractedCache(extractedCache);
  };
  return (
    <div>
    <button onClick={() => cache.restore()}>Restore Cache</button> 
    <button onClick={() => cache.gc()}>Garbage Collect</button>
    <button onClick={extractedCache}>Extract Cache</button>
  <ul>
      {extractedcache && Object.keys(extractedcache).map(key => {
        return <li key={key}>{key} : {JSON.stringify(extractedcache[key])}</li>
      })}
    </ul>

    </div>
  );
}

function Observables() {
  const Color = new Observable(observer => {
    observer.next('red');
    observer.next('green');
    observer.next('blue');
  }
  );

  Color.subscribe({
    next(color) { console.log(color); },
    error(err) { console.error(err); },
    complete() { console.log('done'); }
  });

  const Colprom = new Promise((res, rej) => {
    res('red');
    res('green');
    res('blue');
  }
  );

  Colprom.then(console.log);


  var observable = new Observable(res => {
    res.next("Hello Piyush");
    res.next("Hello Vivek");
    res.next("Hello Rajesh");
});
observable.subscribe(console.log)

var promise = new Promise(res => {
    res("Hello Piyush");
    res("Hello Vivek");
    res("Hello Rajesh");
});
promise.then(console.log)


// const observable1 = new Observable((res) => {
//   let count = 0;
//   setInterval(() => {
//       count = count + 1;
//       res.next(count);
//   }, 1000)
// })
// //subscribe the observable
// this.subscription = observable1.subscribe(ele => {
//   console.log(ele)
// })
// //unsubscribe the observable
// setTimeout(() => {
//   this.subscription?.unsubscribe();
// }, 12000)

  return (
    <div>
      <p>Check the console for the observable values</p>
    </div>
  );

}

function watchCacheChanges(client) {
  return new Observable(observer => {
    const handleChange = () => {
      const newData = cache.extract();
      observer.next(newData);
    };

    const subscription = cache.watch({
      query: gql`
        query WatchAll {
          __typename
        }
      `,
      callback: handleChange
    });

    return () => subscription.unsubscribe();
  });
}

function CacheWatcher() {
  React.useEffect(() => {
    const cacheObservable = watchCacheChanges(client);

    const subscription = cacheObservable.subscribe({
      next(data) {
        console.log('Cache data changed:', data);
      },
      error(err) {
        console.error('Error watching cache:', err);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <p>Check the console for cache changes</p>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        {/* <h2>My to-do list</h2>
        <AddTodo />
        <Todos /> */}
        <h2>Counter</h2>
        <AddCounter />
        <Counters />
        <h2>Observables</h2>
        <Observables />
        <h2>Cache Functions</h2>
        <CacheFunctions />
        <h2>Cache Watcher</h2>
        <CacheWatcher />

      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
