import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(-2);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // setInterval(() => setCount1((count1) => count1 + 1), 1000);
    setCount1((count1) => count1 + 1);
  }, [count]);
  // useEffect(() => {
  //   console.log('Component Mounted');
  //   alert(count*2)
  // }, [count]);

  let handler = async function (event) {
    console.log(event.target.id)
    setInterval(() => {
      event.target.style.backgroundColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
    }, 1000);
    return;
  };
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Success');
    }, 1000);
  });

  let handlerr = function (event) {
    console.log(event.target.id);
    alert('hi')
  }
  // useEffect((count) =>  alert(count*2), [count])
  function switch1() {
    return;
  }

  let addTodos = function (event) {
    event.preventDefault();
    let todo = document.getElementById('todo').value;
    setTodos([...todos, todo]);
  }

  let clearTodos = function () {
    setTodos([]);
  }

  return (
    <div className="App" >
      {/* <button id="button" onClick={() => handler(this)}>Learn Express</button> */}
      <button id="button" onClick={handler}>Learn Express</button>
      <br />
      <br />
      {/* <button id="button1" onClick={() => alert('hi')}>Learn Express1</button>
      <button id="button2" onClick={() => console.log('hi')}>Learn Express2</button>
      <button id="button3" onClick={() => promise.then(console.log)}>Learn Express3</button>
      <a href="https://www.google.com" onClick={(event) => { event.preventDefault(); console.log("prevent default called"); }}>Google</a>

      <form id="form" onSubmit={handlerr}>
        <button type="submit">Submit</button>
      </form> */}
      <h1 className="todo-title">Counter</h1>
      <button className="button plusButton" onClick={() => setCount(count + 1)}>+</button>
      <button className="button minusButton" onClick={() => setCount(count - 1)}>-</button>
      <p className="count">{count}</p>

      <p className="operationCount">Number of Operations: {count1}</p>

      <div className="todo-container">
        {todos && todos.length && <h1 className="todo-title">Todo List</h1>}
        <ul className="todo-list">
          {todos && todos.length && todos.map((todo, index) => {
            // return (<li key={index} className="todo-item">{todo}</li>);
            return (
              <li key={index} className="todo-item">
                <input type="checkbox" />
                {todo}
                <button className='edit-button' onClick={() => {
                  let newTodo = prompt('Enter new todo');
                  let newTodos = todos.map((t, i) => {
                    if (i === index) {
                      return newTodo;
                    }
                    return t;
                  });
                  setTodos(newTodos);
                }}>Edit</button>
                <button className="delete-button" onClick={() => {
                  let newTodos = todos.filter((t, i) => i !== index);
                  setTodos(newTodos);
                }}>Delete</button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={addTodos} className="todo-form">
          <input type="text" id="todo" className="todo-input" placeholder="Enter todo..." />
          <button type="submit" className="todo-button">Add Todo</button>
        </form>
        <button onClick={clearTodos} className="clear-button">Clear Todos</button>
      </div>
      </div>
  );
}

export default App;
