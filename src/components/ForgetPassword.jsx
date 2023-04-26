import React, { useState } from "react";

function ForgotPassword({ onCancel }) {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setisSubmitted] = useState(false);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement password reset logic here.
    setMessage("The new password has been sent to your email.");
    setUserId("");
    setisSubmitted(true)
  };

  const handleCancel = () => {
    setUserId("");
    onCancel();
  };

  return (
    <div className="forgot_password" style={{textAlign: 'center'}}>
      {!isSubmitted ? (
        <><h2>Forgot Password</h2><form onSubmit={handleSubmit}>
          <input type="text" id="userId" value={userId} onChange={handleUserIdChange} placeholder="ID" />
          <button type="submit">Submit</button>
        </form></>

      ) : (<div className="message">{message}</div>)}
      <button type="button" onClick={handleCancel} style={{margin: "10px auto"}}>Cancel</button>
    </div>
  );
}

export default ForgotPassword;
