
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import './Contract.css';

import axios from 'axios';
import { Container } from 'react-bootstrap';
import ContractPrint from './ContractPrint';
import method from '../../../hooks/web3/sendTransaction';


const AdContract = () => {

  const [modalShow, setModalShow] = useState(false);

  const [contractInfo, setContractInfo] = useState({
    mediaUrl : "",
    date1 : "",
    date2 : "",
    value : "",
    content : "",
    clientAddr : "",
    supplierAddr : "",
    isClient : true
  });

  const [vsCurrencies, setVsCurrencies] = useState("krw");
  const [ethPrice,setEthPrice] = useState(0);
  const [curCost, setCurCost] = useState("");
  const [previewCheck, setPreviewCheck] = useState(false);
  const [tokenURI, setTokenURI] = useState("");

  useEffect(() => {
    vsChange(curCost)
  },[vsCurrencies])

  useEffect(() => {
  },[contractInfo,ethPrice])

  useEffect(() => {
    let availableWidthPx = document.getElementById("divToPrint");
    if (availableWidthPx) {
      console.log(availableWidthPx);
    }

  }, [])


  const handleContractAddr1 = async (e) => {
    contractInfo.clientAddr = e.target.value;
    setContractInfo(contractInfo)
  }

  const handleContractAddr2 = async (e) => {
    contractInfo.supplierAddr = e.target.value;
    setContractInfo(contractInfo)
  }

  const handleContractUrl = async (e) => {
    contractInfo.mediaUrl = e.target.value;
    setContractInfo(contractInfo)
  }

  const handleContractContent = async (e) => {
    contractInfo.content = e.target.value;
    setContractInfo(contractInfo)
  }

  const handleContractDate1 = async (e) => {
    contractInfo.date1 = e.target.value;
    setContractInfo(contractInfo)
  }

  const handleContractDate2 = async (e) => {
    contractInfo.date2 = e.target.value;
    setContractInfo(contractInfo)
  }

  const handleContractCost = async (e) => {
    setCurCost(e.target.value);
    const cost =  e.target.value;
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${vsCurrencies}`;
    const options = {
      url: coinGeckoUrl,
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    }
    var toEth = 0;
    await axios.request(options)
        .then(res => {
          if(vsCurrencies == "krw") {
            toEth = (1/res.data.ethereum.krw)*cost;
            console.log(toEth)
            setEthPrice(toEth)
          } else if (vsCurrencies == "usd") {
            toEth = (1/res.data.ethereum.usd)*cost;
            setEthPrice(toEth)
          } else if (vsCurrencies == "eur") {
            toEth = (1/res.data.ethereum.eur)*cost;
            setEthPrice(toEth)
          }
        })
        .catch(err => console.log(err))

    contractInfo.value = toEth;
    setContractInfo(contractInfo)
  }

  const vsChange = async (curCost) => {
    const cost =  curCost;
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${vsCurrencies}`;
    const options = {
      url: coinGeckoUrl,
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    }
    var toEth = 0;
    await axios.request(options)
        .then(res => {
          if(vsCurrencies == "krw") {
            toEth = (1/res.data.ethereum.krw)*cost;
            console.log(toEth)
            setEthPrice(toEth)
          } else if (vsCurrencies == "usd") {
            toEth = (1/res.data.ethereum.usd)*cost;
            setEthPrice(toEth)
          } else if (vsCurrencies == "eur") {
            toEth = (1/res.data.ethereum.eur)*cost;
            setEthPrice(toEth)
          }
        })
        .catch(err => console.log(err))

    contractInfo.cost = toEth;
    setContractInfo(contractInfo)
  }


  const handleSubmit = async (e) => {
    console.log(tokenURI);
    e.preventDefault();

    //AdInfo 유효성 검사
    var checkVaild = 0;
    
    if(contractInfo.mediaUrl.length === 0) {
        document.getElementById("mediaUrl-message").style.display = "block";
        checkVaild++;
    }
    if(contractInfo.date1.length === 0 || contractInfo.date2.length === 0) {
        document.getElementById("date-message").style.display = "block";
        checkVaild++;
    }
    if(contractInfo.value.length === 0) {
        document.getElementById("value-message").style.display = "block";
        checkVaild++;
    }
    if(contractInfo.clientAddr.length === 0 || contractInfo.supplierAddr.length === 0) {
        document.getElementById("address-message").style.display = "block";
        checkVaild++;
    }

    if(checkVaild > 0) {
        return;
    }

    //walletAddress 가져오기 : props

    const walletAddress = "0x473ec14B04a56F02066FF34D4C3799295F4aA0C9"

    //submit Transaction : (walletAddress, _to, _value, _data)
    const result = await method.submitTransaction(walletAddress,contractInfo.supplierAddr,contractInfo.value,tokenURI);
    console.log(result)

    //DB 상태 업데이트


  }



  return (
    
    <Container>
    <br></br>
    <br></br>
    <br></br>
    <Form className='form'>
    <h1 className='ContractTitle'>광고 대행 계약서</h1>

         <Form.Group className="mb-3">
            <Form.Label><h5>동영상, 사진을 올릴 매체 URL<span className="red"> *</span></h5></Form.Label>
            <Form.Control type='text' placeholder="Enter Advertisement Media URL" onChange={handleContractUrl}/>
        </Form.Group>
        <p id="mediaUrl-message" className="mediaUrlMessage">mediaUrl Field Required!!</p>

      <Form.Group controlId="formDate" className="mb-3">
        <Form.Label><h5>계약 기간<span className="red"> *</span></h5></Form.Label>
        <br></br>
        <Form.Control type="date" className='ContractDate1' onChange={handleContractDate1}/>
        <h1 className='dateIcon'> ~ </h1>
        <Form.Control type="date" className='ContractDate2' onChange={handleContractDate2}/>
      </Form.Group>
      <p id="date-message" className="dateMessage">Date Field Required!!</p>
      
      <Form.Group>
        <Form.Label><h5>보수<span className="red"> *</span></h5></Form.Label>
        <InputGroup className="mb-3">
            <Form.Control type='text' placeholder="Enter Advertisement Cost" onChange={handleContractCost}/>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {vsCurrencies.toUpperCase()}
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={() => setVsCurrencies("krw")}>KRW</Dropdown.Item>
                <Dropdown.Item onClick={() => setVsCurrencies("usd")}>USD</Dropdown.Item>
                <Dropdown.Item onClick={() => setVsCurrencies("eur")}>EUR</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
           <img src='https://beb-project3-s3-bucket.s3.ap-northeast-2.amazonaws.com/exchange.png' className='exchange'></img>
          <Form.Control type='text' placeholder={ethPrice} disabled></Form.Control>
          <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <p id="value-message" className="valueMessage">Value Field Required!!</p>

      <Form.Group className="mb-3">
        <Form.Label><h5>기타 사항</h5></Form.Label>
        <Form.Control as="textarea" placeholder="Enter Your Advertisement Contract Info" rows={3} onChange={handleContractContent}/>
      </Form.Group>

      <Form.Label><h5>계약자 지갑 주소<span className="red"> *</span></h5></Form.Label>
      <InputGroup className="mb-3">
        <h7>&ensp;Advertiser&ensp;</h7>
        <Form.Control type="text" placeholder="Enter Your Address" onChange={handleContractAddr1}/>
        <h7>&ensp;Creator&ensp;</h7>
        <Form.Control type="text" placeholder="Enter Your Contractor Address" onChange={handleContractAddr2}/>
      </InputGroup>
      <p id="address-message" className="addressMessage">Address Field Required!!</p>



      <Button variant="primary" onClick={() => {setModalShow(true); setPreviewCheck(true);}}>
        미리보기
      </Button>
     
        {/* <button className='upload_btn' onClick={() => setModalShow(true)}><span>미리보기</span></button> */}
     
      <br></br>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleSubmit} disabled={!previewCheck}>
        Submit
      </Button>

        {/* <button className='upload_btn' onClick={() => setModalShow(true)}><span>Submit</span></button> */}
   


      <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        
        <Modal.Title>
          광고 대행 계약서
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modalBody'>
        <ContractPrint contractInfo={contractInfo} previewCheck={previewCheck} setTokenURI={setTokenURI}></ContractPrint>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </Form>
    </Container>
    
  );
}

export default AdContract;