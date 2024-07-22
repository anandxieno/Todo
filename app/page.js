"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskItem from "./TaskItem";


export default function Home() {

  let [getUsers, setGetUsers] = useState(()=>{
    let SavedUsers  = localStorage.getItem('user');
    return SavedUsers ? JSON.parse(SavedUsers) : [];
  })
  let [task, setTask] = useState({
    title: "",
    taskDate: "",
    taskUser: "",
    is_complete: false,
    is_Due: false,
  });

  let [tasks, setTasks] = useState(() =>{
     const savedUser = localStorage.getItem('Task');
     return savedUser ? JSON.parse(savedUser) : [];
  });
  let [updateItem, setUpupdateItem] = useState(-1);

  const getValue = (e) => {
    let allTasks = { ...task };
    let InputName = e.target.name;
    let Inputvalue = e.target.value;
    allTasks[InputName] = Inputvalue;

    setTask(allTasks);
  };

  const FormSubmite = (e) => {
    e.preventDefault();

    let same = tasks.some((i) => i.title === task.title);
    if (!same && updateItem === -1) {
      let FullList = [...tasks, task];
      setTasks(FullList);
    }

    if (updateItem >= 0) {
      let FullList = [...tasks];
      let cuuTask = task;
      FullList[updateItem] = cuuTask;
      setTasks(FullList);
      setUpupdateItem(-1);
    }

    setTask({
      title: "",
      taskDate: "",
      taskUser: "",
      is_complete: false,
      is_Due: false,
    });
  };

  const handleEdit = (index) => {
    setTask(tasks.filter((_, item) => item === index)[0]);
    setUpupdateItem(index);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleComplete = (index) => {
    let completedItem = tasks.filter((_, i) => i === index);
    let GetAllItems = [...tasks];
    completedItem[0].is_complete = !completedItem[0].is_complete;
    GetAllItems[index] = completedItem[0];
    setTasks(GetAllItems);
  };

  const checkDueDates = (tasks) => {
    let NowDate = new Date();
    return tasks.map((task) => {
      let taskDate = new Date(task.taskDate);
      if (taskDate < NowDate) {
        task.is_Due = true;
      } else {
        task.is_Due = false;
      }
      return task;
    });
  };

  useEffect(() => {
    // const savedTasks = localStorage.getItem("tasks");
    // if (savedTasks) {
    //   setTasks(checkDueDates(JSON.parse(savedTasks)));
    // }

    const interval = setInterval(() => {
      setTasks((prevTasks) => checkDueDates(prevTasks));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() =>{
     localStorage.setItem('Task', JSON.stringify(tasks))
  }, [tasks]);

  return (
    <>
      <Header />
      <div className="todo_upper">
        <form className="flex gap-2 items-center justify-between" onSubmit={FormSubmite}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="title"
              onChange={getValue}
              value={task.title}
              className="w-[400px] h-10 focus:outline-none p-2"
            />
            <input
              type="date"
              name="taskDate"
              id=""
              onChange={getValue}
              className="w-[140px] h-10 focus:outline-none p-2"
              value={task.taskDate}
            />
            <select
              name="taskUser"
              id=""
              className=" h-10 focus:outline-none p-2"
              value={task.taskUser}
              onChange={getValue}
            >
              <option value="">select user</option>
              {
                getUsers.map((getUser, index) =>(
                  <option key={index} value={getUser.toLowerCase()}>{getUser}</option> 
                ))
              }
            </select>
          </div>

          <button type="submit" className="bg-white px-3 py-2">Save</button>
        </form>
      </div>
      <div className="todolist mt-10 bg-violet-400 max-w-[800px] p-3 grid gap-3">
        {
          tasks.length > 0 ?
            tasks.map((item, index) => (
              <TaskItem key={index} taskItem={item} itemIndex={index} editItem={handleEdit} deleteItem={handleDelete} completeTask={handleComplete} />
            ))

            : "No data found"
        }

      </div>
    </>
  );
}
