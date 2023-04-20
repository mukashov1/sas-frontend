import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, createContext, useEffect } from "react";

import { observer } from "mobx-react-lite";
import Store from "../store.js";

import Main from "../pages/Main";
import Login from "../pages/SignIn";
import Absence from "../components/student/absence";
import Statistics from "../components/student/statistics";
import Specialreason from "../components/student/specialreason";
import Messages from "../components/student/messages";
import Settings from "../components/student/settings";

import AdminStatistics from '../components/admin/adminStatistics.jsx'
import AdminReason from '../components/admin/SpecialReason.jsx'

export const UserContext = createContext();

const store = new Store();

export const MyRoutes = observer(() => {
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(store.user));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      async function mygn(params) {
        await store.checkAuth();
      }
      mygn();
    }
  }, []);
  return (
    <UserContext.Provider value={{ store }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<Main />}>
            <Route index element={<Absence />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="reason" element={<Specialreason />} />
            <Route path="settings" element={<Settings />} />
            <Route path="messages" element={<Messages />} />
          </Route>
          <Route path="/admin" element={<Main />}>
            <Route index element={< AdminStatistics/>} />
            <Route path="reason" element={<AdminReason />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
});
