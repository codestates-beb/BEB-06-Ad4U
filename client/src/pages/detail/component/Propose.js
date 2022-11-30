import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalData } from '../../../config/localStrage';
import ad from '../../../hooks/axios/ad';
import client from '../../../hooks/axios/client';
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal, Toast } from 'react-bootstrap';
import Swal from 'sweetalert2';


import '../Detail.css';

const Propose = ({ show, setShow, userData, supplierId }) => {
  const [adList, setAdList] = useState([]);
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');
  const userId = userData.id;

  useEffect(() => {
    ad.getList()
    .then(res => res.data)
    .then(data => {
      let list = [];
      data.forEach(el => {
        const id = el.Client.id
        if (id === userId) list.push(el); 
      });
      setAdList(list);
    })
    .catch(err => console.log(err.response.data))
  }, [userId])


  const ListItem = ({ idx, data }) => {
    const { id, title, cost, content } = data;

    const sendPropose = async (adId) => {
      try {
        const result = await client.propose(accessToken, isClient, supplierId, adId)
        if (result) {
          await Swal.fire({
            icon: 'success',
            title: '광고 제안 성공!',
          })    
          window.location.reload();
        }
      } catch (err) {
        await Swal.fire({
          icon: 'error',
          title: '이미 제안된 광고입니다.',
        })
        window.location.reload();
      }
    } 

    return (
      <>            
        <ListGroup.Item> 
          <Row>
            <Col xl={9}>{idx+1}. {title} {cost}</Col>
            <Col xl={3}><Button onClick={() => sendPropose(id)}>select</Button></Col>
          </Row>
        </ListGroup.Item>
      </>
    );
  }

  return (
    <>
      <Modal 
        className="ClientInfo_container"
        as={Container} 
        show={show} 
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>제안하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <ListGroup variant="flush">
            {adList.length > 0
            ? adList.map((data, idx) => <ListItem key={idx} idx={idx} data={data} />)
            : <div>업로드한 광고가 없습니다.</div>}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Propose;