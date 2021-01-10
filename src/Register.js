import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { CredentialsContext } from "./App";
import { backendURL } from "./request";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({
    nameErr: "",
    pwdErr: "",
  });
  const [, setCredentials] = useContext(CredentialsContext);
  const history = useHistory();

  const register = async () => {
    const newUser = {
      username: username,
      password: password,
    };

    await axios.post(backendURL + "register", newUser);
  };
  const updateCredentials = () => {
    setCredentials({ username, password });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    updateCredentials();
    register()
      .then(() => history.push("/"))
      .catch((err) => {
        if (err) {
          const usernameErr = err.response.data.username;
          const passwordErr = err.response.data.password;

          setError({ ...errors, nameErr: usernameErr, pwdErr: passwordErr });
          setCredentials(null);
        }
      });
  };

  return (
    <div className="register-container">
      {/*!!error && error*/}
      <form onSubmit={handleRegister} className="register-form">
        <h1 className="register-title">Register</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <span style={{ color: "red" }}>{errors.nameErr}</span>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <span style={{ color: "red" }}>{errors.pwdErr}</span>

        <button type="submit" onClick={register}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
