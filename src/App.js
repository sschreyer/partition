import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [test, setTest] = useState(0);

  useEffect(() => {
    fetch('/plans').then(res => res.json()).then(data => {
      setTest({"plans": data});
    }) 
  }, []);

  // proxy doesn't work properly without this and i dont know why!
  if (test === 0) {
    return <p>hi</p>
  }

  const data =[{"name":"test1"},{"name":"test2"}];

  return (
    // TO-DO: This can be it's own function, called "render_plans" or such.
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.

          Your plans are: {test["plans"].map((p) => <li>Plan: {p.title} Descr: {p.description} </li>)}!
        </p>
      </header>
    </div>

    // TO-DO: Also need to render a field to submit plans.
  );
}

export default App;