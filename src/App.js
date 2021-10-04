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

        <button onClick={() => make_plan()}>Click to make a plan!</button>
      </header>
      
    </div>

    // TO-DO: Also need to render a field to submit plans.
  );
}

// make a plan and sent it via a POST request to the backend
// TO-DO: add parameters to this function and a input form to the app
// TO-DO: make plans refresh upon making a new plan
function make_plan() {
  fetch('/makeplan', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'a_title',
      description: 'yayyy'
    })
  }
  
  ).then(res => res.json());
}

export default App;