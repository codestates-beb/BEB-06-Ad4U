import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ad from '../../../hooks/axios/ad';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import './AdList.css';

const AdList = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    ad.getList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const AdTable = ({ idx, data }) => {
    console.log(data)
    return (
      <tr onClick={() => navigate(`/detail/ad/${data.id}`)}>
        <td>{idx+1}</td>
        <td colSpan={3}>{data.title}</td>
        <td>{data.Client.company_name}</td>
      </tr>
    );
  }

  return (
    <Container className='adList_container'>
      <h1>AdList</h1>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th colSpan={3}>title</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, idx) => <AdTable key={idx} idx={idx} data={data} />)}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdList;