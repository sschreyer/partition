import React, { useState, useEffect } from 'react';
import './App.css';

import Draggable from './app/components/Draggable'

// TODO: Figure out a way to not rely on global vars
var currentPlan  = {};
var planToDelete = "";
var prevSelectedPlan;

// Main application 
function App() {
  // Setup function to get the plans, and a "loadingState variable"
  // that will inform the user that the page is loading.
  const [plans, setPlans] = useState('plans');
  const [loadingState, setLoadingState] = useState('idle');
  
  // TODO: Create a function to fetch data from the api on command?
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
              {/* TODO: make each Draggable item individual? Need some changes... */}
              {/* TODO: make each thing a div???  */}
              <Draggable data={plans} handlePlanClick={
                (e, plan) => {
                  if (prevSelectedPlan) {
                    prevSelectedPlan.style["background-color"] = "white";
                  } 

                  // If a user has clicked on the same plan again, 
                  // keep it white.
                  if (prevSelectedPlan !== e.target) {
                    e.target.style["background-color"] = "lime";
                    planToDelete = plan.plan.title;
                    prevSelectedPlan = e.target;
                  } else {
                    prevSelectedPlan = null;
                    planToDelete = null;
                  }
                }
              }/>
            </p>
          }


          {/* If we haven't fetched the data yet */}
          { loadingState !== 'success' &&
            <p>loading, loading...(try refreshing the page)</p>
          }
        

        {/* App-List is a test for CSS styling */}
        <form id="plan_form" className="plan_form" onSubmit={handleSubmit} onChange={handleFormChange}>
          <label>Title: <input type="text" name="title"/></label>
          <br />
          <label>Description: <input type="text" name="description"/></label>
          <br />
          {/* TODO: Add a default option? */}
          <label>Type: 
            <br />
            WORK: <input onClick={handleTypeButtonClick} checked="checked" type="radio" name="type" value="WORK"/>
            HOME: <input onClick={handleTypeButtonClick} type="radio" name="type" value="HOME"/>
          </label>
          <br />
          <button form="plan_form" type="submit">Submit plan</button>
        </form>

        <button onClick={handleDeleteSubmit} type="submit" checked="true">Delete currently selected plan</button>
      </header>
      
    </div>
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
      type: currentPlan['type'] == null ? "WORK" : currentPlan['type'],
    })
  }).then(res => res.json());
}

// handles the form changing
function handleFormChange(event) {
  const key = event.target.name;
  const value = event.target.value;
  currentPlan[key] = value;
}

function handleTypeButtonClick(event) {
  const key = event.target.name;
  const value = event.target.value;
  currentPlan[key] = value;
}

function handleDeleteSubmit(event) {
  fetch('/deleteplan', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: planToDelete
    })
  }).then(res => res.json());
}

export default App;