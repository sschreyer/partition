import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Main application 
function App() {
  // Setup function to get the plans, and a "loadingState variable"
  // that will inform the user that the page is loading.
  const [plans, setPlans] = useState('plans');
  const [loadingState, setLoadingState] = useState('idle');

  useEffect(() => {
    fetch('/plans').then(res => res.json()).then(data => {
      setPlans({"plans": data});
      setLoadingState('success');
    }) 
  }, []);

  return (
    // TO-DO: This can be it's own function, called "render_plans" or such.
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          
          {/* If fetching data from the api was successful */}
          { loadingState === 'success' &&
            <p>Your plans are: {plans["plans"].map((p) => 
              <li>Plan: {p.title} Descr: {p.description} </li>)}
            </p>
          }


          {/* If we haven't fetched the data yet */}
          { loadingState !== 'success' &&
            <p>loading, loading...</p>
          }
        </p>
      </header>
    </div>

    // TO-DO: Also need to render a field to submit plans.
  );
}

export default App;