import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Avatar from 'react-avatar';
import { Container, Card } from 'react-bootstrap/esm';

import supplier from '../../hooks/axios/supplier';
import './Detail.css';


const SupplierDetail = () => {
  const { supplierId } = useParams();
  const [detail, setDetail] = useState({});
  const [playlist, setPlaylist] = useState([])
  console.log("Detail", detail)

  useEffect(() => {
    supplier.getDetail(supplierId)
    .then(res=> setDetail(res.data))
    .catch(err => err.response.data)
  }, [supplierId])

  useEffect(() => {
    const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;
    const get_channelId = detail.channel_id;
    console.log(get_channelId)
    axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${get_channelId}&maxResults=50&key=${apikey}`
      )
      .then((res) => {
        console.log(res.data.items);
        setPlaylist(res.data.items)
      })
      .catch((err) => { console.log(err) });
  }, [detail]);

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
        {playlist && playlist.map((video, idx) => {
          return (
            <div className='playlist_card-container' key={idx}>
              <Card.Body>
                <img src={video.snippet.thumbnails.medium.url} alt="" />
                <Card.Text>{video.snippet.title}</Card.Text>
                <Card.Footer>{video.snippet.description}</Card.Footer>
              </Card.Body>
            </div>
          )
        })}
      </div>
    </Container> 
  );
}

export default SupplierDetail;