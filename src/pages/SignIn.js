import React, { useState, useContext } from "react";
import logo from "../assets/icon.png";
import "../styles/SignIn.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../routing/index.jsx";
import ForgetPassword from "../components/ForgetPassword";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const { store } = useContext(UserContext);
  const fromPage = location.state?.from?.pathname;

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("hello");
    console.log(userId);
    const response = await store.login(userId, password);

    // console.log("response.status:   " + response.ok);
    if (response && response.status === 200) {
      if (store.user.role === 'student') {
        navigate("/student");

      } else {

        navigate("/admin");
      }
    } else {
      setError("Invalid id or password!");
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
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
