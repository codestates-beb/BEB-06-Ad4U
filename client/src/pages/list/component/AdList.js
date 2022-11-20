import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ad from '../../../hooks/axios/ad';
import SearchBar from './SearchBar';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import '../ListPage.css';

const AdList = () => {
  const [list, setList] = useState([]);
  console.log("list", list);

  //필요시 추가, data에 null값이 있을시 에러발생
  const filter = [
    { item: "제목", eventKey: "title" },
  ]

  const navigate = useNavigate();

  useEffect(() => {
    ad.getList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const refreshList = (eventKey, input) => {
    // input이 없으면 필터링 없이  refresh
    ad.getList()
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

  const AdTable = ({ idx, data }) => {
    return (
      <tr>
        <td>{idx+1}</td>
        <td 
          colSpan={3} 
          onClick={() => navigate(`/detail/ad/${data.id}`)}
        >
          {data.title}
        </td>
        <td>{data.Client.company_name}</td>
      </tr>
    );
  }

  return (
    <Container className='adList_container'>
      <h1>AdList</h1>
      <SearchBar filter={filter} refreshList={refreshList}/>
      {/* <Table hover>
        <thead>
          <tr>
            <th></th>
            <th colSpan={3}>title</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 
            ? <div className='adList_container'>검색결과가 없습니다</div>
            : list.map((data, idx) => <AdTable key={idx} idx={idx} data={data} />)
          }
        </tbody>
      </Table> */}
    </Container>
  );
}

export default AdList;