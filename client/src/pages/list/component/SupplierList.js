import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supplier from '../../../hooks/axios/supplier';
import SearchBar from './SearchBar';

import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { GoPlay } from "react-icons/go";
import { RiUserFollowFill } from "react-icons/ri";

import '../ListPage.css';

const SupplierList = () => {
  const [list, setList] = useState([]);
  console.log("list", list);

  //필요시 추가, data에 null값이 있을시 에러발생
  const filter = [
    { item: "채널명", eventKey: "channelName" },
    { item: "이메일", eventKey: "email" },
  ]

  const navigate = useNavigate();

  useEffect(() => {
    supplier.mainList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const refreshList = (eventKey, input) => {
    // input이 없으면 필터링 없이  refresh
    supplier.getList()
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
    <Container className='supplierList_container'>
      <SearchBar filter={filter} refreshList={refreshList}/>
      {list.length === 0 
      ? <div className="noresultant">검색결과가 없습니다</div>
      : <div className="supplierList-content">
        {list.map((data, idx) => {
          return (
            <div className='supplierList_card'
            onClick = {() => {
              navigate(`/detail/supplier/${data.id}`)
              window.scrollTo(0,0)
            }}
            key={idx}>
              <div className='supplierList_card_img'>
                <img src={data.profileImgUrl} alt='card img'/>
              </div>
              <Col className='supplierList_card_text'>
                <Row><div className='supplierList_card_t1'>{data.channelName}</div></Row>
                <Row><div className='supplierList_card_t2'>구독자 {data.subscriberCount}</div></Row>
                <Row><div className='supplierList_card_t2'>조회수 {data.viewCount}</div></Row>
              </Col>
            </div>
          )})}
        </div>
      }
    </Container>
  );
}

export default SupplierList;