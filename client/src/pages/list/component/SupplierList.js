import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supplier from '../../../hooks/axios/supplier';

import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { GoPlay } from "react-icons/go";
import { RiUserFollowFill } from "react-icons/ri";

import './SupplierList.css'

const SupplierList = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  console.log(list)

  useEffect(() => {
    supplier.mainList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const SupplierCard = ({ idx, data }) => {
    console.log(data)
    return (
      <div 
        className="supplierList-content_card-container"
        onClick={() => navigate(`/detail/supplier/${data.id}`)}
      >
        <Row>
          <Col><Avatar src={data.profileImgUrl} alt="profile_img" size="100" round={true}/></Col>
          <Col><Card.Body>
            <Card.Title>{data.channelName}</Card.Title>
            <Card.Text>
              <RiUserFollowFill/> 
              subscribe {data.subscriberCount} <br/>
              <GoPlay />
              viewer {data.viewCount}
            </Card.Text>
            </Card.Body>
          </Col>
        </Row>
    </div>
    );
  }

  return (
    <Container className='supplierList_container'>
      <h1>SupplierList</h1>
      <div className="supplierList-content">
        {list.map((data, idx) => <SupplierCard key={idx} idx={idx} data={data} />)}
      </div>
    </Container>
  );
}

export default SupplierList;