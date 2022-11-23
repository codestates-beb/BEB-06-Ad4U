import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientMypage from './Client';
import SupplierMypage from './Supplier';
import Emptypage from '../../component/Emptypage';

const Mypage = ({ userData }) => {
  return (
    <>
      <Routes>
        <Route path="/client/*" element={<ClientMypage userData={userData}/>} />
        <Route path="/supplier" element={<SupplierMypage userData={userData}/>} /> 
        <Route path="*" element={<Emptypage />} /> 
      </Routes>
    </>
  );
}

export default Mypage;