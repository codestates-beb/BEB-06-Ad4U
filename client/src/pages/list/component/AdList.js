import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row } from 'react-bootstrap';

import ad from '../../../hooks/axios/ad';
import SearchBar from './SearchBar';
import '../ListPage.css';
import nullImg from '../../../dummyfiles/img1.png';

const AdList = () => {
  const [list, setList] = useState([]);
  console.log("list", list);

  //필요시 추가, data에 null값이 있을시 에러발생
  const filter = [
    { item: "제목", eventKey: "title" },
    { item: "회사명", eventKey: "company_name" },
  ]

  const navigate = useNavigate();

  useEffect(() => {
    ad.getList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  const refreshList = (eventKey, input) => {
    // input이 없으면 필터링 없이  refresh
    ad.getList()
    .then(res => res.data)
    .then(data => {
      return data.filter((el) => {
        if (el[eventKey] === null) return null;
        if (el[eventKey].includes(input)) {
          return el;
        } 
        else return null;
      });
    })
    .then(filteredData => setList(filteredData))
    .catch(err => console.log(err.response.data))
  }

  return (
    <Container className='adList_container'>
      <h1>AdList</h1>
      <SearchBar className='searchbar' filter={filter} refreshList={refreshList}/>
      {list.length === 0 
      ? <div className='noresultant'>검색결과가 없습니다</div> 
      : <div className="adList-content">
          {list.map((data, idx) => { return (
            <div 
            className="adList-content_card-container"
            onClick={() => {
              navigate(`/detail/ad/${data.id}`)
              window.scrollTo(0,0)}}
            key={idx}
            >
              <Row className='adList_img'>
                {data.AdimgUrl 
                ? <Card.Img variant="top" src={data.AdimgUrl}/> 
                : <Card.Img variant='top' src={nullImg}/> }
              </Row>
              <Row>
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                </Card.Body>
              </Row>
            </div>
          )})}
        </div>
      }
    </Container>
  );
}

export default AdList;