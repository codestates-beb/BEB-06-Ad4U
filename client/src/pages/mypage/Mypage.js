import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ClientMypage from './Client';
import SupplierMypage from './Supplier';
import Emptypage from '../../component/Emptypage';

const Mypage = () => {
  return (
    <>
      <Routes>
        <Route path="/client/*" element={<ClientMypage />} />
        <Route path="/supplier" element={<SupplierMypage />} /> 
        <Route path="*" element={<Emptypage />} /> 
      </Routes>
    </>
  );
}

export default Mypage;