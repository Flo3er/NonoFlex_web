import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Splash from "./app/pages/splash/Splash.js";
import Login from './app/pages/login/Login.js';
import Main from './app/pages/main/Main.js';
import Register from './app/pages/login/register/Register.js'
import NoticeList from './app/pages/main/NoticeList.js';
import ProductList from './app/pages/product/ProductList.js';
import ProductNew from './app/pages/product/ProductNew.js';
import ProductStatus from './app/pages/product/ProductStatus.js';
import DocumentList from './app/pages/document/DocumentList.js';
import DocumentReady from './app/pages/document/DocumentReady.js';
import DocumentConfirm from './app/pages/document/DocumentConfirm.js';


function App() {
  return (
      <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route esxact path="/register" component={Register} />
        <Route exact path="/notice/list" component={NoticeList} />
        <Route exact path="/product/list" component={ProductList} />
        <Route exact path="/product/new" component={ProductNew} />
        <Route exact path="/product/status" component={ProductStatus} />
        <Route exact path="/document/list" component={DocumentList} />
        <Route exact path="/document/ready" component={DocumentReady} />
        <Route exact path="/document/confirm" component={DocumentConfirm} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
