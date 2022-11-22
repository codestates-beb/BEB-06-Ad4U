import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main.css';
import { Row, Col, Card } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import supplier from '../../../hooks/axios/supplier';
import client from '../../../hooks/axios/client';

const BusinessPartner = () => {
  const [clientList, setClientList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

  console.log(clientList)

  const navigate = useNavigate();

  useEffect(() => {
    client.mainList()
    .then(res => setClientList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  useEffect(() => {
    supplier.mainList()
    .then(res => setSupplierList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  return (
    <div className='supplier_container'>
      <h1>Business Partner with us</h1>
      <h3>파트너사</h3>
      <div className="supplier-content">
        {clientList.map((data, idx) => {
          console.log(data)
          return (
          <div 
          className="supplier-content_card-container"
          onClick = {() => {
            navigate(`/detail/client/${data.id}`)
            window.scrollTo(0,0)
          }}
          key={idx}
          >
            <Row>
              {/* client 사진 없음 
              <Col><Avatar src={data.profileImgUrl} size="100" round={true}/></Col> */}
              <Col><Card.Body>
                <Card.Title>{data.company_name}</Card.Title>
              </Card.Body></Col>
            </Row>
          </div>
          )
        })}
      </div>

      <div className="supplier-content">
        {supplierList.map((data, idx) => {
          return (
          <div 
          className="supplier-content_card-container"
          onClick = {() => {
            navigate(`/detail/supplier/${data.id}`)
            window.scrollTo(0,0)
          }}
          key={idx}
          >
            <Row>
              <Col><Avatar src={data.profileImgUrl} size="100" round={true}/></Col>
              <Col><Card.Body>
                <Card.Title>{data.channelName}</Card.Title>
                <Card.Text>subscribers {data.subscriberCount}</Card.Text>
              </Card.Body></Col>
            </Row>
          </div>
          )
        })}
      </div>

  
      <div className='supplier_viewall'>
        <Link to="/list/supplier"><button className='supplierviewall_btn'><span>View all</span></button></Link>
      </div>
    </div>
  );
}

export default BusinessPartner;