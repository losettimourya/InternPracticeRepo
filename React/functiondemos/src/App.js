// useLayout vs useEffect

import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { useState } from 'react';

function App() {
  const [uselayoutval, setuselayoutval] = useState("Initial Value")
  const [useeffectval, setuseeffectval] = useState("Initial Value")

  useEffect(() => {
    console.log("useEffect")
    setTimeout(() => {
      setuseeffectval("useEffect Value")
    }, 5000)
  }, [useeffectval])

  useLayoutEffect(() => {
    console.log("useLayoutEffect")
    setTimeout(() => {
      setuselayoutval("useLayoutEffect Value")
    }, 5000)
  }, [uselayoutval])
  return (
    <div className="App">
      <h1>useLayoutEffect</h1>
      <p>{uselayoutval}</p>
      <h1>useEffect</h1>
      <p>{useeffectval}</p>
      </div>
  );
}

export default App;
