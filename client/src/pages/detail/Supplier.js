import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar';
import Swal from 'sweetalert2'

import { getLocalData } from '../../config/localStrage';
import supplier from '../../hooks/axios/supplier';
import Propose from './component/Propose';

import { Container, Card, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import './Detail.css';


const SupplierDetail = ({ userData }) => {
  const { supplierId } = useParams();
  const [detail, setDetail] = useState({});
  const [playlist, setPlaylist] = useState([])
  const [show, setShow] = useState(false);

  useEffect(() => {
    supplier.getDetail(supplierId)
    .then(res=> setDetail(res.data))
    .catch(err => err.response.data)
  }, [supplierId])

  useEffect(() => {
    const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;
    const get_channelId = detail.channel_id;
    axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${get_channelId}&maxResults=50&key=${apikey}`
      )
      .then((res) => {
        setPlaylist(res.data.items)
      })
      .catch((err) => { console.log(err) });
  }, [detail]);

  const handleShow = async () => {
    const isClient = getLocalData("isClient")
    if (isClient === "true") return setShow(true);
    else {
      await Swal.fire({
        icon: 'error',
        title: '광고주 계정으로만 지원 가능합니다!',
      })
    }
  }

  const clipCopy = async () => {
    const clip = detail.email;
    window.navigator.clipboard.writeText(clip).then(() => {
      console.log('복사완료');
    });
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      클립보드에 복사
    </Tooltip>
  );

  return (
    <Container className='supplierDetail_container'>
      <div className="supplierDetail-content_card-container">
        <Row>
          <Col sm={5} className='supplierDetail_col-center'>
            <Avatar src={detail.profileImgUrl} size="200" />
          </Col>
          <Col sm={7}>
            <Card.Body>
              <Card.Title className='supplierDetail_title' as='h1'>{detail.channelName}</Card.Title>
              <Row className="mb-2">
                <Col>
                  <Card.Subtitle sm={5} className="supplierDetail_cardText text-muted">이메일</Card.Subtitle>
                </Col>
                <Col sm={7} className='supplierDetail_col-textleft'>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 100, hide: 100 }}
                    overlay={renderTooltip}
                  >
                    <a className='supplierDetail_cardText-email text-muted' onClick={clipCopy}>{detail.email}</a>
                  </OverlayTrigger>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm={5}>
                  <Card.Subtitle className="supplierDetail_cardText text-muted">구독자</Card.Subtitle>
                </Col>
                <Col sm={7}>
                  <Card.Text className='supplierDetail_cardText text-muted'>{ detail.subscriberCount > 10000 ? (detail.subscriberCount/10000).toFixed(2) + "만명" : detail.subscriberCount + "명"}</Card.Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm={5}>
                  <Card.Subtitle className="supplierDetail_cardText text-muted">총 조회수</Card.Subtitle>
                </Col>
                <Col sm={7}>
                  <Card.Text className='supplierDetail_cardText text-muted'>{detail.viewCount} 회</Card.Text>
                </Col>
              </Row>
              <Card.Text className='supplierDetail_cardText mb-2'><a href={detail.channelUrl}>채널 바로가기</a></Card.Text>
            </Card.Body>
            <Button variant="outline-dark" onClick={handleShow}>제안하기</Button>
          </Col>
        </Row>
      </div>
      <div className='youtubeVideo'>
        {playlist && playlist.map((video, idx) => {
          return (
            <div className='playlist_card-container' key={idx}>
              <Card.Body>
                <img src={video.snippet.thumbnails.medium.url} alt=""/>
                <Card.Text>{video.snippet.title}</Card.Text>
                <Card.Footer>{video.snippet.description}</Card.Footer>
              </Card.Body>
            </div>
          )
        })}
      </div>
      <Propose show={show} setShow={setShow} userData={userData} supplierId={supplierId} />
    </Container> 
  );
}

export default SupplierDetail;