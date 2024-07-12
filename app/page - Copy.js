"use client"

import Image from "next/image";
import Tasks from "./Tasks";
import { useState } from "react";

export default function Home() {
  let [tasks, setTasks] = useState([]);

  const submitForm = (event)=>{
    event.preventDefault();
    console.log("form ");
       let title_field = event.target.taskTitle;
       let date_field  = event.target.date;
  
       if(title_field.value == ""){
           title_field.classList.add("error");
       }
       else if(date_field.value == ""){
           title_field.classList.remove("error");
           date_field.classList.add("error");
       }else{
        title_field.classList.remove("error");
        date_field.classList.remove("error");

       

        let CheckDuplicate = tasks.some(task => task.taskTitle === title_field.value);
        
        if (CheckDuplicate) {
          alert("A task with the same title already exists.");
        } else {

          let currData = {
            taskTitle : title_field.value,
            taskDate  : date_field.value
           };

          setTasks([...tasks, currData]);
        
        }

        event.target.taskTitle.value = "";
        event.target.date.value = "";
        
       }
  }

  const deleteRow = (taskIndex) => {
    let updatedList = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedList);
  }

  

  return (
    <>
     <h1>This is h1</h1>
      <div className="container">
        <div className="todo-upper">
            <form onSubmit={ submitForm }>
                <input type="text" name="taskTitle" />            
                <input type="date" name="date" pattern="\d{4}-\d{2}-\d{2}" /> 
                <button>Add</button>
            </form>
        </div>
        <div className="todo_bottom">
          {
            (tasks.length >= 1) ? 
            tasks.map((value, index)=>(
              <Tasks key={index} taskIndex={index} taskValue = {value} deleteItem ={deleteRow}  />
            )) : "No data found"
          }
           
        </div>

      </div>
    </>
    

  );
}
