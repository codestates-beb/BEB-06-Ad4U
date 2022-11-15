import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Nav from './component/Nav';
import Main from './pages/main/Main';
import ListPage from './pages/list/ListPage';
import ClientMypage from './pages/mypage/Client';
import SupplierMypage from './pages/mypage/Supplier';
import ClientDetail from './pages/detail/Client';
import SupplierDetail from './pages/detail/Supplier';
import AdDetail from './pages/detail/Ad';
import UploadPage from './pages/detail/Upload';
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
        <Route path="/detail/ad/:adId" element={<AdDetail />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<Emptypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
