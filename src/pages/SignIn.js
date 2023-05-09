import React, { useState, useContext } from "react";
import logo from "../assets/icon.png";
import "../styles/SignIn.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../routing/index.jsx";
import ForgetPassword from "../components/ForgetPassword";
import AttendanceService from "../services/AttendanceService";
import $api from '../http/api';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const { store } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await store.login(userId, password);
    const lessonsResponse = await $api.get('/lessons')

    localStorage.setItem("lessons", JSON.stringify(lessonsResponse.data));

    if (response && response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("permitted users", JSON.stringify([]));
      localStorage.setItem("subjects", JSON.stringify(subjects));
      accessibleUser.unshift({id: response.data.user.studentId, name: response.data.user.firstName, surname: response.data.user.lastName})
      localStorage.setItem("accessible user", JSON.stringify(accessibleUser));

      if (store.user.role === 'Student') {
        navigate("/student");
      } else {

        navigate("/admin");
      }
    } else {
      if (response.message === "Непредвиденная ошибка") {
        setError("Please enter the ID")
      } else
        setError(response.message);
    }
  };

  const handleForgotPassword = () => {
    setIsForgetPasswordOpen(true);
  };

  const handleForgetPasswordCancel = () => {
    setIsForgetPasswordOpen(false);
  };

  return (
    <div className="signIn">
      <div className="container">
        <img src={logo} alt="Logo" />
        {isForgetPasswordOpen ? (
          <ForgetPassword onCancel={handleForgetPasswordCancel} />
        ) : (
          <form onSubmit={handleLogin}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <input
              type="text"
              placeholder="ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              data-testid="id-input"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password-input"
            />
            <button type="submit">Log In</button>
            <div className="forgotPassword" onClick={handleForgotPassword}>
              Forgot password?
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


const users = [
  { id: 200107032, name: "Samat", surname: "Zhumamuratov", status: "admin" },
  { id: 200107111, name: "Lyazzat", surname: "Atymtayeva", status: "teacher" },
  { id: 200107112, name: "Inkar", surname: "Shoganova", status: "teacher" },
  { id: 200107113, name: "Akniyet", surname: "Talgatkyzy", status: "student" },
  { id: 200107114, name: "Dilnaz", surname: "Zhumabaikyzy", status: "student" },
  { id: 200107115, name: "Azat", surname: "Kulakhmet", status: "student" },
  { id: 200107116, name: "Damir", surname: "Aliyev", status: "student" },
  { id: 200107117, name: "Akbope", surname: "Zhengiskhan", status: "student" },
  { id: 200107118, name: "Satzhan", surname: "Kadyr", status: "student" },
  { id: 200107022, name: "Rauan", surname: "Orynbasar", status: "student" },
  { id: 200107119, name: "Bakdaulet", surname: "Mukashov", status: "student" },
  { id: 200107073, name: "Aslan", surname: "Abenov", status: "student" },
  { id: 200107080, name: "Arnibek", surname: "Nussupekov", status: "student" },
  { id: 1, name: "John", surname: "Doe", status: "student" }
];

const accessibleUser = [
  {id: 200107117, name: "Akbope", surname: "Zhengiskhan"}
] 

const subjects = [
  { name: 'History', present: 15, absent: 2, attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'] },
  { name: 'Math', present: 10, absent: 5, attendance: ['present', 'manual', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'] },
  { name: 'Programming', present: 1, absent: 3, attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'] },
  { name: 'Design Pattern', present: 4, absent: 1, attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'] },
  { name: 'DBMS1', present: 9, absent: 2, attendance: ['reason', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'] },
  { name: 'DBMS2', present: 5, absent: 6, attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'] },
]

export default SignIn;
