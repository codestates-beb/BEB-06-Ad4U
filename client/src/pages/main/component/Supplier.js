import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main.css';
import { Row, Col, Card, Button, Stack } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import supplier from '../../../hooks/axios/supplier';

const Creator = () => {

const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    supplier.mainList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  return (
    <div className='supplier_container'>
      <h1>Business Partner with us</h1>
      <h3>파트너사</h3>
      <div className="supplier-content">
        {list.map((data, idx) => {
          return (
          <div 
          className="supplier-content_card-container"
          onClick={() => navigate(`/detail/supplier/${data.id}`)}
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

export default Creator;