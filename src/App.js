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
import Company from './app/pages/settings/company/Company';
import DocumentPrint from './app/pages/document/DocumentPrint';
import User from './app/pages/settings/user/User';
import Participants from './app/pages/settings/user/Participants';
import DocumentTempList from './app/pages/document/DocumentTempList';
import RegisterConfirm from './app/pages/login/register/RegisterConfirm'
import ResetPassword from './app/pages/login/resetPassword/ResetPassword';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path='/register/confirm' element={<RegisterConfirm />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route path="/notice/list" element={<NoticeList />} />
            <Route path="/product/list" element={<ProductList />} />
            <Route path="/product/new" element={<ProductNew />} />
            <Route path="/product/edit" element={<ProductEdit />} />
            <Route path="/product/status" element={<ProductStatus />} />
            <Route path="/document/list" element={<DocumentList />} />
            <Route path='/document/list/temp' element={<DocumentTempList />} />
            <Route path="/document/ready" element={<DocumentReady />} />
            <Route path="/document/confirm" element={<DocumentConfirm />} />
            <Route path="/document/print" element={<DocumentPrint />} />
            <Route path="/settings/company" element={<Company />} />
            <Route path='/settings/user' element={<User />} />
            <Route path='/settings/participant' element={<Participants />} />
            <Route path="*" element={<Splash />}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
