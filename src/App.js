import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import MyList from "./MyList";
import Nav from "./Nav";

export const CredentialsContext = React.createContext();

function App() {
  const [credentials, setCredentials] = useState(null);
  return (
    <div className="app">
      <CredentialsContext.Provider value={[credentials, setCredentials]}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/mylist">
              <MyList />
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
