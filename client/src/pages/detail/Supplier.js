import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supplier from '../../hooks/axios/supplier';
import Avatar from 'react-avatar';

import { Container, Card } from 'react-bootstrap/esm';

import './Detail.css';
import axios from 'axios';

const SupplierDetail = () => {
  // const [info, setInfo] = useState([]);
  const { supplierId } = useParams();
  const [detail, setDetail] = useState({});
  console.log("Detail", detail)

  useEffect(() => {
    supplier.getDetail(supplierId)
    .then(res=> setDetail(res.data))
    .catch(err => err.response.data)
  }, [])

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&status=&playlistId=PLlrxD0HtieHgS6P6YBu3Bc1DA9TICZ9CM&key=AIzaSyBsfPmb1PvWwsXO2m636QoCuzJmrNlsMC8"
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       setInfo(res.data.items);
  //     })
  //     .catch(() => {});
  // }, []);
  // console.log(info);

  return (
    <Container className='supplierDetail_container'>
        <div className="supplierDetail-content_card-container">
          <Avatar src={detail.profileImgUrl} size="150"/>
          <Card.Body>
            <Card.Title className='supplierDetail_title' as='h1'>{detail.channelName}</Card.Title>
            <Card.Text>{detail.channelUrl}</Card.Text>
            <Card.Text>{detail.email}</Card.Text>
            <Card.Text>subscriber {detail.subscriberCount}</Card.Text>
            <Card.Text>view {detail.viewCount}</Card.Text>
          </Card.Body>
        </div>
    </Container> 
  );
}

export default SupplierDetail;