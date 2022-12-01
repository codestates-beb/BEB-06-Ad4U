import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import client from '../../../hooks/axios/client';
import SearchBar from './SearchBar';

import { Container } from 'react-bootstrap';

import '../ListPage.css';

const ClientList = () => {
  const [list, setList] = useState([]);

  const filter = [
    { item: "업체명", eventKey: "company_name" },
  ]

  const navigate = useNavigate();
  
  useEffect(() => {
    client.getList()
    .then(res => {setList(res.data); console.log(res.data)})
    .catch(err => console.log(err.response.data))
  }, [])

  const refreshList = (eventKey, input) => {
    client.getList()
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
    <Container className='clientList_container'>
      <SearchBar filter={filter} refreshList={refreshList}/>
      {list.length === 0 
        ? <div className='noresultant'>검색결과가 없습니다</div> 
        : <div className='partnerList_card_container'>
          {list && list.map((data, idx) => {
            return (
              <div className='partnerList_card'
              onClick = {() => {
                navigate(`/detail/client/${data.id}`)
                window.scrollTo(0,0)
              }}
              key={idx}
              >
                <div className='partnerList_card_content'>
                  <div className='partnerList_card_front'>
                    <img src={data.profileImgUrl} alt='profileImg'/>
                  </div>
                  <div className='partnerList_card_back'>
                    <h3>{data.company_name}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      }
    </Container>
  );
}

export default ClientList;