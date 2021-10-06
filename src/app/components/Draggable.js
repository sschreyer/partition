import React from 'react';


function Draggable({plans}) {

    return (
        <p>Your plans are: {plans["plans"].map((p) => 
            <li draggable="true" className="App-Plan">Plan: {p['title']}, Descr: {p['description']} </li>)}
        </p>
    ); 
}

export default Draggable;