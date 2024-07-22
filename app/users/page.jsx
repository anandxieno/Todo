'use client'

import React, { useEffect, useState } from "react";
import Header from "../components/Header";


function Users(){
    

    let[users, setUsers] = useState( ()=>{
      let saveUser = localStorage.getItem('user');
      return  saveUser ? JSON.parse(saveUser) : [];
    });
    const addUser = () =>{
      let input_value = document.getElementById('userName').value;
      let userExists = users.some(user => user === input_value);
      if(userExists){
        alert("User alredy Exists");
      }else{
        input_value = [...users, input_value];
        setUsers(input_value);
      }
      document.getElementById('userName').value = "";
    }
   
    useEffect(() =>{
      localStorage.setItem('user', JSON.stringify(users));
    }, [users])

    return(
        <>
        <Header />
          <div className="user-form todo_upper flex justify-between items-center">
             <input type="text" name="userName" id="userName" className="w-[600px] h-8 focus:outline-none p-1" />
             <button className="bg-white px-3 py-1" onClick={addUser}>Add</button>
          </div>
          <div className="user-list">
            {
              users.map((user, index) =>(
                 <div key={index} className="user">{user}</div>
              ))
            }
          </div>
        </>
        
    )
}

export default Users;