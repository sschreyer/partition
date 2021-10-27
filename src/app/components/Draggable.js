import React, {useState, useRef} from 'react';

// Component modified from https://github.com/asatraitis/react-hooks-dragndrop
// The author has a great tutorial on YouTube that I followed:
// https://www.youtube.com/watch?v=Q1PYQPK9TaM 

// TODO: make this design better. Should not need this. 

function Draggable({data, handlePlanClick}) {

    const [plans, setPlans] = useState(data);
    const [dragging, setDragging] = useState(false);

    // data that we're dragging
    const dragItem = useRef();
    // the element that we're dragging
    const dragNode = useRef();

    // handling dragging plans
    const handleDragStart = (e, currPlan) => {
        dragItem.current = currPlan;

        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd);

        setDragging(true);
    }


    const handleDragEnter = (e, planItem) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            setPlans(oldPlans => {
                // get deep copy of old plans to future-proof code
                let newPlans = JSON.parse(JSON.stringify(oldPlans));
                newPlans.splice(planItem.index, 0, newPlans.splice(currentItem.index,1)[0]);
                dragItem.current = planItem;
                return newPlans;
            });
        }
    }

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener("dragend", handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    return (
        <div className="plan-data">
            {plans.map((plan, index) => (
                // TO-DO: Change className App-Plan to something more appropriate 
                <li draggable="true" 
                    onDragStart={(e) => handleDragStart(e, {plan, index})} 
                    onDragEnter={dragging? (e) => handleDragEnter(e, {plan, index}) : null}
                    onClick = {(e) => handlePlanClick(e, {plan})}
                    className={"App-Plan-" + plan["type"]}
                >
                    Plan: {plan['title']}, Descr: {plan['description']}, Type: {plan['type']}
                </li>
            ))}
        </div>
    ); 
}

export default Draggable;
