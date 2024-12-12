import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    try {
        const response = await fetch("http://localhost:8000/api/v1/login/", {
            method: "POST",
            mode: "cors", // Ensure the CORS mode is set if you're making cross-origin requests
            headers: {
                "Content-Type": "application/json", // Set the Content-Type to JSON
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        // Check if the response is successful (200 OK)
        if (response.ok) {
            const data = await response.json();  // Parse the response body as JSON

            // Store the tokens in localStorage
            sessionStorage.setItem("atoken", data.access);
            sessionStorage.setItem("rtoken", data.refresh);

            message.success("Login successful!");
            navigate("/dashboard");  // Navigate to the dashboard after successful login
        } else {
            // If the response status is not 200, show an error message
            const errorData = await response.json();  // Parse error message from server
            message.error(errorData.detail || "Login failed!");  // Show error message from the server or a default message
        }
    } catch (error) {
        // Handle any network or unexpected errors
        console.error("Error during login:", error);
        message.error("An error occurred during login.");
    }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="login-input"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
