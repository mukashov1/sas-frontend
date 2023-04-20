import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword({ onCancel }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUserIdSubmit = (event) => {
    event.preventDefault();
    if (userId === "12345") {
      setShowNewPasswordFields(true);
      setErrorMessage("");
    } else {
      setShowNewPasswordFields(false);
      setErrorMessage("Invalid user ID.");
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      // TODO: Update the user's password on the server.
      onCancel();
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <div className="forgetPassword">
      <div className="container">
        <h2>Forgot Password</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {!showNewPasswordFields ? (
          <form onSubmit={handleUserIdSubmit}>
            <input
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
