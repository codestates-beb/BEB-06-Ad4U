import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Nav from './component/Nav';
import Main from './pages/main/Main';
import ListPage from './pages/list/ListPage';
import ClientDetail from './pages/detail/client';
import SupplierDetail from './pages/detail/supplier';
import ClientMypage from './pages/mypage/client';
import SupplierMypage from './pages/mypage/supplier';
import Emptypage from './component/Emptypage';
import Footer from './component/Footer';

import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list/*" element={<ListPage />} />
        <Route path="/mypage/client" element={<ClientMypage />} />
        <Route path="/mypage/supplier" element={<SupplierMypage />} />
        <Route path="/detail/client/:clientId" element={<ClientDetail />} />
        <Route path="/detail/supplier/:supplierId" element={<SupplierDetail />} />
        <Route path="*" element={<Emptypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
