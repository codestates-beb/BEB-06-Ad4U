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
  }, [supplierId])


  // const [playlist, setPlaylist] = useState({id: "", snippet: {chnnelId:"", thumbnails: {}}});
  const [playlist, setPlaylist] = useState([])
    
//https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channel.id}&maxResults=50&key=process.env.REACT_APP_YOUTUBE_API_KEY"
  useEffect(() => {
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCVIYOhk0nZYOADDm7yF3DIA&maxResults=50&key=AIzaSyBsfPmb1PvWwsXO2m636QoCuzJmrNlsMC8"
      )
      .then((res) => {
        console.log(res);
        setPlaylist(res.data.items);
      })
      // .then((res) => {
      //   const {title, channelId, channelTitle, thumbnails} = res.items[0].snippet;
      // })
      .catch(() => {});
  }, []);
  console.log(playlist)  ;

  // const BASE_URL = 'https://www.googleapis.com/youtube/v3' ;
  // const options = {
  //   params: {
  //     maxResultes: 30,
  //   },
  //   headers: {
  //     'API-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
  //   }
  // }
  // useEffect(() => {

  // })

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
        
        <div className='youtubeVideo'>
          {playlist.map((video) => (
            <h1 >{video.title}</h1>
            
          ))}
        </div>
    </Container> 
  );
}

export default SupplierDetail;