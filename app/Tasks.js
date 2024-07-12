import React from "react";

function Tasks({taskValue, taskIndex, deleteItem}){

    return(
        <>
          <div className="task_item">
              <input type="checkbox" name="itemCheckbox" onChange={ (e)=> { e.target.parentElement.classList.toggle("completed") } } />
              <span className="flex-grow">{taskValue.taskTitle} </span>
              <span className="text-right w-max">Date : {taskValue.taskDate} </span>
              <div className="delete_button" onClick={ ()=>{deleteItem(taskIndex)}}>Delete</div>
          </div>
        </>
    )
}

export default Tasks;