import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Avatar from 'react-avatar';

import client from '../../../hooks/axios/client';
import SearchBar from './SearchBar';
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
    .then(res => {setList(res.data); console.log(res.data)})
    .catch(err => console.log(err.response.data))
  }, [])
  console.log(list)

  const refreshList = (eventKey, input) => {
    // input이 없으면 필터링 없이  refresh
    client.getList()
    .then(res => res.data)
    .then(data => {
      return data.filter((el) => {
        if (el[eventKey] === null) return null;
        if (el[eventKey].includes(input)) {
          return el;
        } 
        else return null;
      });
    })
    .then(filteredData => setList(filteredData))
    .catch(err => console.log(err.response.data))
  }

  return (
    <Container className='clientList_container'>
      <h1>ClientList</h1>
      <SearchBar filter={filter} refreshList={refreshList}/>
      {list.length === 0 
      ? <div className='noresultant'>검색결과가 없습니다</div> 
      : <div className="clientList-content">
          {list && list.map((data, idx) => {
            return (
              <div 
              className="clientList-content_card-container"
              onClick={() => { 
                navigate(`/detail/client/${data.id}`)
                window.scrollTo(0,0)}}
              key={idx}
              >
                <Avatar src={data.profileImgUrl} size="100" round={true}/>
                <Card.Title className='clientList_companyname'>{data.company_name}</Card.Title>
              </div>
          )})}
        </div>
      }
    </Container>
  );
}

export default ClientList;