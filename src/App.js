import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Splash from "./app/pages/splash/Splash.js";
import Login from './app/pages/login/Login.js';
import Main from './app/pages/main/Main.js';
import Register from './app/pages/login/register/Register.js'

function App() {
  return (
      <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
