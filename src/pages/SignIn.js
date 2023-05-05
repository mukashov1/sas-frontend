import React, { useState, useContext } from "react";
import logo from "../assets/icon.png";
import "../styles/SignIn.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../routing/index.jsx";
import ForgetPassword from "../components/ForgetPassword";
import AttendanceService from "../services/AttendanceService";

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
    const lessons = await AttendanceService.lessons(userId);
    
    if (lessons && lessons.status === 200) {
      localStorage.setItem("lessons", JSON.stringify(lessons.data));
    } else {
      console.log("Lessons do not come!!!")
    }
    
    if (response && response.status === 200) {

      localStorage.setItem("user", JSON.stringify(response.data.user));
      
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

export default SignIn;
