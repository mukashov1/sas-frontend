import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import OnlineTime from "../components/onlineTime";
import "../styles/Main.css";

function Main() {
  return (
    <div className="Main">
      <Navbar />
      <Outlet />
      <OnlineTime />
    </div>
  );
}

export default Main;
