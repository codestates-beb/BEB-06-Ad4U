import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../hooks/axios/client';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './ClientList.css';

const ClientList = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    client.getList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const ClientTable = ({ idx, data }) => {
    console.log(data)
    return (
      <tr onClick={() => navigate(`/detail/client/${data.id}`)}>
        <td>{idx+1}</td>
        <td colSpan={3}>{data.company_name}</td>
        <td>{data.Advertisements.length}</td>
      </tr>
    );
  }

  return (
    <Container className='clientList_container'>
      <h1>ClientList</h1>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th colSpan={3}>업체명</th>
            <th>모집중인 광고</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, idx) => <ClientTable key={idx} idx={idx} data={data} />)}
        </tbody>
      </Table>
    </Container>
  );
}

export default ClientList;