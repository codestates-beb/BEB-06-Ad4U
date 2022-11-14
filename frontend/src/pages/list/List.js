import React from 'react';
import { Route, Routes } from 'react-router';

import AdList from './AdList';
import ClientList from './ClientList';
import SupplierList from './SupplierList';
import Emptypage from '../../component/Emptypage';

const List = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdList />} />
        <Route path="/client" element={<ClientList />} />
        <Route path="/supplier" element={<SupplierList />} />
        <Route path="*" element={<Emptypage />} />
      </Routes>
    </div>
  )
}
export default List;