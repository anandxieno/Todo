import React from "react";

function TaskItem({taskItem, itemIndex, editItem, deleteItem, completeTask}){
    return(

        <div className={"todoItem flex items-center justify-between shadow-lg py-2 px-2 gap-4 " + (taskItem.is_Due ? 'task-due' : '' )}>
                <div className={ (taskItem.is_complete ? 'line-through' : '' ) + " flex items-center justify-between w-full"}>
                    <div  className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="" onChange={ ()=> {completeTask(itemIndex)}} className="w-4 h-4" />
                        <span className="text-white">{taskItem.title}</span>
                    </div>
                   
                   <div className="flex gap-2">
                     <span className="text-white">{taskItem.taskDate}</span> 
                     <span className="text-white">{taskItem.is_complete}</span> 
                     <span className="text-white">{taskItem.taskUser}</span>
                   </div>
                   
                </div>
                <div className="actions flex gap-3 items-center">
                    <div className="bg-violet-700 text-white px-2 py-1 text-sm cursor-pointer" onClick={ ()=> {editItem(itemIndex)} }>Edit</div>
                    <div className="bg-violet-700 text-white px-2 py-1 text-sm cursor-pointer" onClick={ ()=> {deleteItem(itemIndex)}}>Delete</div>
                </div>
            </div>
    )
}

export default TaskItem;