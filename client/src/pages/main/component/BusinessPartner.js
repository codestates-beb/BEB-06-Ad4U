import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main.css';
import { Row, Col, Card, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import supplier from '../../../hooks/axios/supplier';
import client from '../../../hooks/axios/client';

const BusinessPartner = () => {
  const [clientList, setClientList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

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
    <Container className='partner_container'>
      <h1>Business Partner with us</h1>
      <h3>파트너사</h3>
      <div className="partner-content">
        {clientList.map((data, idx) => {
          return (
          <div 
          className="partner-content_card-container"
          onClick = {() => {
            navigate(`/detail/client/${data.id}`)
            window.scrollTo(0,0)
          }}
          key={idx}
          >
            <Avatar src={data.profileImgUrl} size="100" />
            <Card.Title className='bp_cardTitle'>{data.company_name}</Card.Title>
          </div>
          )
        })}
      </div>

      <div className="partner-content">
        {supplierList.map((data, idx) => {
          return (
          <div 
          className="partner-content_card-container"
          onClick = {() => {
            navigate(`/detail/supplier/${data.id}`)
            window.scrollTo(0,0)
          }}
          key={idx}
          >
            <Avatar src={data.profileImgUrl} size="100" round={true}/>
            <Card.Title className='bp_cardTitle'>{data.channelName}</Card.Title>
            <Card.Text>subscribers {data.subscriberCount}</Card.Text>
          </div>
          )
        })}
      </div>
      <div className='partner_viewall'>
        <Link to="/list/supplier"><button className='partnerviewall_btn'><span>View all</span></button></Link>
      </div>
    </Container>
  );
}

export default BusinessPartner;