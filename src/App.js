import React, { useState, useEffect } from 'react';
import './App.css';

import Draggable from './app/components/Draggable'

// TODO: Figure out a way to not rely on a global var
var currentPlan  = {};

// Main application 
function App() {
  // Setup function to get the plans, and a "loadingState variable"
  // that will inform the user that the page is loading.
  const [plans, setPlans] = useState('plans');
  const [loadingState, setLoadingState] = useState('idle');
  

  useEffect(() => {
    fetch('/plans').then(res => res.json()).then(data => {
      setPlans(data);
      setLoadingState('success');
    }) 
  }, []);

  return (
    // TODO: This can be it's own function, called "render_plans" or such.
    <div className="App">
      <header className="App-header">
        <h1>
          Partition
        </h1>
          
          {/* If fetching data from the api was successful */}
          { loadingState === 'success' &&
            <p>Your plans are:  
              <Draggable data={plans}/>
            </p>
          }


          {/* If we haven't fetched the data yet */}
          { loadingState !== 'success' &&
            <p>loading, loading...(try refreshing the page)</p>
          }
        

        {/* App-List is a test for CSS styling */}
        <form onSubmit={handleSubmit} onChange={handleFormChange}>
          <label>Title: <input type="text" name="title"/></label>
          <br />
          <label>Description: <input type="text" name="description"/></label>
          <br />
          {/* TODO: ensure only valid types can be enetered (i.e. use buttons) */}
          <label>Type: <input type="text" name="type"/></label>
          <br />
          <button type="submit">Submit plan</button>
        </form>
      </header>
      
    </div>

    // TO-DO: Also need to render a field to submit plans.
  );
}

// make a plan and sent it via a POST request to the backend
// TO-DO: add parameters to this function and a input form to the app
// TO-DO: make plans refresh upon making a new plan
function handleSubmit() {
  fetch('/makeplan', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: currentPlan['title'],
      description: currentPlan['description'],
      type: currentPlan['type']
    })
  }).then(res => res.json());
}

// handles the form changing
function handleFormChange(event) {
  const key = event.target.name;
  const value = event.target.value;
  currentPlan[key] = value;
}

export default App;