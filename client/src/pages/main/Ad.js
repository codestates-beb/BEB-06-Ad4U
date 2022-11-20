import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ad.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import img from '../../dummyfiles/img3.png'
import { Link } from 'react-router-dom';
import ad from '../../hooks/axios/ad'

const Ad = () => {
  const [list, setList] = useState([]);
  console.log(list)

  const navigate = useNavigate();

  useEffect(() => {
    ad.mainList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const AdCard = ({ idx, data }) => {
    console.log(data)
    return (
      <div 
        className="ad-content_card-container"
        onClick={() => navigate(`/detail/ad/${data.id}`)}
      >
        <Card.Img variant="top" src={data.AdimgUrl}/>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Text>
            {data.createdAt}
          </Card.Text>
        </Card.Body>
      </div>
    )
  }

  return (
    <div className='ad_container'>
      <h1>ADBERTISMENT</h1>
      <div className="ad-content">
        {list.map((data, idx) => <AdCard key={idx} idx={idx} data={data}/>)}
      </div>
      <div className='ad_viewall'>
        <Link to="/list"><button className='adviewall_btn'><span>View all</span></button></Link>
       </div>
    </div>
  );
}

export default Ad;