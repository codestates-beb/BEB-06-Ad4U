import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Nav from './component/Nav';
import Main from './pages/main/Main';
import ListPage from './pages/list/ListPage';
import ClientDetail from './pages/client/Detail';
import ClientMypage from './pages/client/Mypage';
import SupplierDetail from './pages/supplier/Detail';
import SupplierMypage from './pages/supplier/Mypage';
import Emptypage from './component/Emptypage';
import Footer from './component/Footer';

import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="list/*" element={<ListPage />} />
        <Route path="client/mypage" element={<ClientMypage />} />
        <Route path="client/detail/:clientId" element={<ClientDetail />} />
        <Route path="supplier/mypage" element={<SupplierMypage />} />
        <Route path="supplier/detail/:supplierId" element={<SupplierDetail />} />
        <Route path="*" element={<Emptypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
