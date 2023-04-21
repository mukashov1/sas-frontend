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

export default function Navbar() {
  const { store } = useContext(UserContext);
  const role = store.role
  console.log(role)
  let menu;

  if (role === 'student') {
    menu = <div className="menu">
      <NavLink end to={'/student'} ><AiFillHome />    Dashboard</NavLink>
      <NavLink to={'/student/statistics'} ><ImStatsDots />    Statistics</NavLink>
      <NavLink to={'/student/messages'} ><MdMessage />    Messages</NavLink>
      <NavLink to={'/student/reason'} ><HiClipboardList />    Absence Reason</NavLink>
      <NavLink to={'/student/settings'} ><IoMdSettings />    Settings</NavLink>
      <NavLink to={'/'} style={{ color: '#ff0000' }}><BiLogOut />    Log out</NavLink>
    </div>;
  } else if (role === 'admin') {
    menu = <div className="menu">
      <NavLink end to={'/admin'} ><ImStatsDots />    Statisticss</NavLink>
      <NavLink to={'/admin/reason'} ><HiClipboardList />    Absence Reason</NavLink>
      <NavLink to={'/'} style={{ color: '#ff0000' }}><BiLogOut />    Log out</NavLink>
    </div>;
  }

  console.log(store.user);
  return (
    <div className="navbar">
      <img src={logo} alt="logo" style={{ width: 300 + "px" }} />
      <div className={`profile ${role} `}>
        <i>
          <FaUserCircle />
        </i>
        <div className="title">
          <h3 className="name">
            {store.user.firstName} {store.user.lastName}
          </h3>
          <p className="status">{store.user.role}</p>
        </div>
      </div>
      {menu}
    </div>
  );
}