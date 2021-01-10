import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";
import { Link } from "react-router-dom";
import { CredentialsContext } from "./App";

function Nav() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const history = useHistory();
  const logout = () => {
    setCredentials(null);
    history.push("/");
  };

  const [show, handleShow] = useState(false);
  function foo() {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  }
  useEffect(() => {
    window.addEventListener("scroll", foo, true);
    return () => {
      window.removeEventListener("scroll", foo, true);
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to="/">
        <img
          className="nav_logo"
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
          alt="Netflix Logo"
        />
      </Link>
      {!credentials && (
        <div className="user-btn">
          <Link to="/register">
            <button className="nav-btn register-btn">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="nav-btn login-btn">Login</button>
          </Link>
        </div>
      )}

      {credentials && (
        <div className="user-btn">
          <button onClick={logout} className="nav-btn logout-btn">
            Logout
          </button>
        </div>
      )}
      {credentials && (
        <span className="username">
          <img
            className="nav_avatar"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
            alt="Avatar"
          />
          {credentials.username}
        </span>
      )}
    </div>
  );
}

export default Nav;
