import React from "react";
import logo from "../assets/logo.svg";
import { ImStatsDots } from "react-icons/im";
import { MdMessage } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../routing/index.jsx";
import store from '../store.js'

export default function Navbar() {
  // const { store } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'))
  console.log("NavBar User:" + Object.values(user))
  console.log("Inside navbar:" + user.role.toLowerCase())
  console.log(store.user)
  let menu;

  if (user.role === 'Student') {
    menu = <div className="menu">
      <NavLink end to={'/student'} ><AiFillHome />    Dashboard</NavLink>
      <NavLink to={'/student/statistics'} ><ImStatsDots />    Attendance</NavLink>
      <NavLink to={'/student/messages'} ><MdMessage />    Messages</NavLink>
      <NavLink to={'/student/reason'} ><HiClipboardList />    Absence Reason</NavLink>
      <NavLink to={'/student/settings'} ><IoMdSettings />    Autorize</NavLink>
      <NavLink to={'/'} style={{ color: '#ff0000' }} onClick={handleLogOut}><BiLogOut />    Log out</NavLink>
    </div>;
  } else if (user.role === 'Admin') {
    menu = <div className="menu">
      <NavLink end to={'/admin'} ><ImStatsDots />    Attendance</NavLink>
      <NavLink to={'/admin/reason'} ><HiClipboardList />    Absence Reason</NavLink>
      <NavLink to={'/'} style={{ color: '#ff0000' }} onClick={handleLogOut}><BiLogOut />    Log out</NavLink>
    </div>;
  }

  function handleLogOut() {
    localStorage.clear()
  }

  return (
    <div className="navbar">
      <img src={logo} alt="logo" style={{ width: 300 + "px" }} />
      <div className={`profile ${user.role.toLowerCase()} `}>
        <i>
          <FaUserCircle />
        </i>
        <div className="title">
          <h3 className="name">
            {user.firstName} {user.lastName}
          </h3>
          <p className="status">{user.role}</p>
        </div>
      </div>
      {menu}
    </div>
  );
}