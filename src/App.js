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

  console.log(test);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          
          Your plans are: {test["plans"][0].title}!
        </p>
      </header>
    </div>
  );
}

export default App;
