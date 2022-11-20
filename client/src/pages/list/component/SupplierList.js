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

  const SupplierCard = ({ idx, data }) => {
    
    const handleClick = (e) => { 
      //더블클릭시 이동
      if (e.detail === 1) return navigate(`/detail/supplier/${data.id}`);
    }

    return (
      <div className="supplierList_container">
        <Container 
          className="supplierList-content_card-container"
          onClick={(e) => handleClick(e)}
        >
          <Row>
            <Col><Avatar src={data.profileImgUrl} alt="profile_img" size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>{data.channelName}</Card.Title>
              <Card.Text>
                <RiUserFollowFill/> 
                subscribe {data.subscriberCount} <br/>
                <GoPlay />
                viewer
              </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <Container className='supplierList_container'>
      <h1>SupplierList</h1>
      <SearchBar filter={filter} refreshList={refreshList}/>
      <div className="supplierList-content">
        {list.length === 0 
          ? <div className="supplierList_container">검색결과가 없습니다</div>
          : list.map((data, idx) => <SupplierCard key={idx} idx={idx} data={data} />)
        }
      </div>
    </Container>
  );
}

export default SupplierList;