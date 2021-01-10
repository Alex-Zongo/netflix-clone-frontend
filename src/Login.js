import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "./App";
import axios from "axios";
import "./Login.css";
import { backendURL } from "./request";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [, setCredentials] = useContext(CredentialsContext);
  let history = useHistory();

  const userData = {
    username,
    password,
  };

  // post to the backend
  const login = async () => {
    await axios.post(backendURL + "login", userData);
  };

  const updateCredentials = () => {
    setCredentials({
      username,
      password,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    updateCredentials();
    login()
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        if (err.response) {
          const userErr = err.response.data.usernotfound;

          const passwordErr = err.response.data.passwordwrong;

          setErrors({ ...errors, userErr, passwordErr });
          setCredentials(null);
        }
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">Login</h1>
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span style={{ color: "red" }}>{errors.userErr}</span>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span style={{ color: "red" }}>{errors.pwdErr}</span>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
