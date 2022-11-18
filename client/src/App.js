import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Nav from './component/Nav';
import Main from './pages/main/Main';
import ListPage from './pages/list/ListPage';
import ClientMypage from './pages/mypage/Client';
import SupplierMypage from './pages/mypage/Supplier';
import ClientDetail from './pages/detail/Client';
import SupplierDetail from './pages/detail/Supplier';
import AdDetail from './pages/detail/Ad';
import LoginPage from './pages/login/LoginPage';
import UploadPage from './pages/detail/Upload';
import Emptypage from './component/Emptypage';
import Footer from './component/Footer';
import TestApiPage from './pages/testAPI/testapi';

import './App.css';

const App = () => {
  const [ userData, setUserData ] = useState({});
  console.log("userData", userData);

  //세션유지
  useEffect(() => {
    const options = {
      url: "http://localhost:3001/users/refresh",
      method: 'GET',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
    }
    axios.request(options)
      .then(res => {
        const { user } = res.data;
        user.isClient = res.data.isClient;
        setUserData(user);
      })
      .catch(err => console.log(err))
  }, []);
  
  return (
    <>
      <Nav userData={userData} setUserData={setUserData} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list/*" element={<ListPage />} />
        <Route path="/mypage/client" element={<ClientMypage />} />
        <Route path="/mypage/supplier" element={<SupplierMypage />} />
        <Route path="/detail/client/:clientId" element={<ClientDetail />} />
        <Route path="/detail/supplier/:supplierId" element={<SupplierDetail />} />
        <Route path="/detail/ad/:adId" element={<AdDetail />} />
        <Route path="/login" element={<LoginPage setUserData={setUserData} />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<Emptypage />} />
        <Route path="/testapi" element={<TestApiPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
