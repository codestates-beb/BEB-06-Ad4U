import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import auth from './hooks/axios/auth';
import { setLocalData, removeLocalData, clearLocalData } from './config/localStrage';
import Swal from 'sweetalert2';

import Nav from './component/Nav';
import Main from './pages/main/Main';
import ListPage from './pages/list/ListPage';
import Mypage from './pages/mypage/Mypage';
import ClientDetail from './pages/detail/Client';
import SupplierDetail from './pages/detail/Supplier';
import AdDetail from './pages/detail/Ad';
import LoginPage from './pages/login/LoginPage';
import Emptypage from './component/Emptypage';
import Footer from './component/Footer';

import './App.css';

const App = () => {
  const [ userData, setUserData ] = useState({});
  console.log("userData", userData);

  //세션유지
  useEffect(() => {
    auth.refresh()
      .then(res => res.data)
      .then(data => {
        if (data.message === 'refresh token not provided') {
          removeLocalData("accessToken");
          removeLocalData("isClient");
        }
        const { user, jwt_accessToken, isClient } = data;
        if (user && jwt_accessToken && typeof(isClient) === 'boolean') { 
          setLocalData("accessToken", jwt_accessToken);
          setLocalData("isClient", isClient);
          setUserData(user);
        }
      })
      .catch(err => {
        clearLocalData();
        console.log(err.response.data);
        Swal.fire({
          icon: 'warning',
          title: "쿠키가 만료되었습니다",
          html: '<b>다시 로그인 해주세요.</b>',
        })
      })
  }, []);
  
  return (
    <>
      <Nav userData={userData} setUserData={setUserData} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list/*" element={<ListPage />} />
        <Route path="/mypage/*" element={<Mypage />} />
        <Route path="/detail/client/:clientId" element={<ClientDetail />} />
        <Route path="/detail/supplier/:supplierId" element={<SupplierDetail userData={userData}/>} />
        <Route path="/detail/ad/:adId" element={<AdDetail userData={userData}/>} />
        <Route path="/login" element={<LoginPage setUserData={setUserData} />} />
        <Route path="*" element={<Emptypage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
