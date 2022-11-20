import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Creator.css';
import { Row, Col, Card, Button, Stack } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import supplier from '../../hooks/axios/supplier';

const Creator = () => {

const [list, setList] = useState([]);

  // console.log(list)
  const navigate = useNavigate();

  useEffect(() => {
    supplier.mainList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const CreatorCard = ({ idx, data }) => {

    // console.log(data)
    return (
      <div 
        className="creator-content_card-container"
        onClick={() => navigate(`/detail/supplier/${data.id}`)}
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
  }

  return (
    <div className='creator_container'>
      <h1>CREATORS</h1>
      <div className="creator-content">
        {list.map((data, idx) => <CreatorCard key={idx} idx={idx} data={data}/>)}
      </div>
      <div className='viewall'>
        <Link to="/list/supplier"><button className='viewall_btn'><span>View all</span></button></Link>
      </div>
    </div>
  );
}

export default Creator;