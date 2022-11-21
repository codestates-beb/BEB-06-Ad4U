import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../hooks/axios/client';

import { Container, Row, Col } from 'react-bootstrap/esm';

import './Detail.css';

const ClientDetail = () => {
  const { clientId } = useParams();
  const [detail, setDetail] = useState({ Advertisements:[] });
  console.log("Detail", detail)

  useEffect(() => {
    client.getDetail(clientId)
    .then(res=> setDetail(res.data))
    .catch(err => err.response.data)
  }, [])

  return (
    <>
      <Container className='ClientDetail_container'>
        <div> client Detail</div>
        <div> 회사명 {detail.company_name} </div>
        <div> 회사명 {detail.email} </div>
        <div> 진행중인 광고</div>
        {detail.Advertisements.map((el, idx) => {
          console.log(el)
          return (
            <div key={idx}>
              <span>index {idx+1}</span>
              <span>   </span>
              <span>제목 {el.title}</span>
            </div>
          );
        })}
      </Container> 
    </>
  );
}

export default ClientDetail;