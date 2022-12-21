import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Splash from "./app/pages/splash/Splash.js";
import Login from './app/pages/login/Login.js';
import Main from './app/pages/main/Main.js';
import Register from './app/pages/login/register/Register.js'
import NoticeList from './app/pages/main/NoticeList.js';
import ProductList from './app/pages/product/ProductList.js';
import ProductNew from './app/pages/product/ProductNew.js';
import ProductEdit from './app/pages/product/ProductEdit';
import ProductStatus from './app/pages/product/ProductStatus.js';
import DocumentList from './app/pages/document/DocumentList.js';
import DocumentReady from './app/pages/document/DocumentReady.js';
import DocumentConfirm from './app/pages/document/DocumentConfirm.js';
import NotFound from './app/pages/notfound/NotFound.js';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notice/list" element={<NoticeList />} />
            <Route path="/product/list" element={<ProductList />} />
            <Route path="/product/new" element={<ProductNew />} />
            <Route path="/product/edit" element={<ProductEdit />} />
            <Route path="/product/status" element={<ProductStatus />} />
            <Route path="/document/list" element={<DocumentList />} />
            <Route path="/document/ready" element={<DocumentReady />} />
            <Route path="/document/confirm" element={<DocumentConfirm />} />
            <Route path="*" element={<Splash />}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
