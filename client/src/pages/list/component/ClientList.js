import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../hooks/axios/client';
import SearchBar from './SearchBar';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import '../ListPage.css';

const ClientList = () => {
  const [list, setList] = useState([]);
  console.log("list", list);

  //필요시 추가, data에 null값이 있을시 에러발생
  const filter = [
    { item: "업체명", eventKey: "company_name" },
  ]

  const navigate = useNavigate();

  useEffect(() => {
    client.getList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const refreshList = (eventKey, input) => {
    // input이 없으면 필터링 없이  refresh
    client.getList()
    .then(res => res.data)
    .then(data => {
      return data.filter((el) => {
        if (el[eventKey].includes(input)) {
          return el;
        } 
        else return null;
      });
    })
    .then(filteredData => setList(filteredData))
    .catch(err => console.log(err.response.data))
  }

  const ClientTable = ({ idx, data }) => {
    return (
      <tr>
        <td>{idx+1}</td>
        <td 
          colSpan={3}
          onClick={() => navigate(`/detail/ad/${data.id}`)}
        >
          {data.company_name}
        </td>
        <td>{data.Advertisements.length}</td>
      </tr>
    );
  }

  return (
    <Container className='clientList_container'>
      <h1>ClientList</h1>
      <SearchBar filter={filter} refreshList={refreshList}/>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th colSpan={3}>업체명</th>
            <th>모집중인 광고</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 
            ? <div className='clientList_container'>검색결과가 없습니다</div>
            : list.map((data, idx) => <ClientTable key={idx} idx={idx} data={data} />)
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default ClientList;