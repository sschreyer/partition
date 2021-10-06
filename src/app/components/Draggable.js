import React, {useState, useRef} from 'react';


function Draggable({data}) {

    const [plans, setPlans] = useState(data);
    const [dragging, setDragging] = useState(false);

    // data that we're dragging
    const dragItem = useRef();
    // the element that we're dragging
    const dragNode = useRef();

    const handleDragStart = (e, currPlan) => {
        dragItem.current = currPlan;

        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd);
        setDragging(true);
    }


    // const handleDragEnter = (e, currPlan) => {
    //     const currentItem = dragItem.current;
    //     if (e.target !== dragNode.current) {
    //         setPlans(oldPlans => {
    //             // get deep copy of old plans to future-proof code
    //             let newPlans = JSON.parse(JSON.stringify(oldPlans));
                

    //             return newPlans;
    //         });
    //     }
    // }

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListenr("dragend", handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    return (
        <div className="plan-data">
            {plans["plans"].map((plan, index) => (
                // TO-DO: Change className App-Plan to something more appropriate 
                <li draggable="true" 
                    onDragStart={(e) => handleDragStart(e, {plan, index})} 
                    // onDragEnter={dragging? (e) => handleDragEnter(e, {plan, index}) : null}
                    className="App-Plan"
                >
                    Plan: {plan['title']}, Descr: {plan['description']} 
                </li>
            ))}
        </div>
    ); 
}

export default Draggable;