import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import { getLocalData } from '../../../config/localStrage';
import ContractPrint from './ContractPrint';
import method from '../../../hooks/web3/sendTransaction';
import { getContractOwner } from '../../../hooks/web3/queryContract';
import contract from '../../../hooks/axios/contract'
import { exchange } from '../../../hooks/axios/coinGecko'

import { Button, Dropdown, Form, InputGroup, Modal, Container, Row, Col } from 'react-bootstrap';

import './Contract.css';

const AdContract = ({  adList, setIsLoading }) => {
  const { adId } = useParams();
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  const navigate = useNavigate();

  const [adInfo, setAdInfo] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [vsCurrencies, setVsCurrencies] = useState("krw");
  const [ethPrice,setEthPrice] = useState(0);
  const [curCost, setCurCost] = useState("");
  const [previewCheck, setPreviewCheck] = useState(false);
  const [tokenURI, setTokenURI] = useState("");
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

  useEffect(() => {
    getAdInfo();
  },[contractInfo.value])
  
  useEffect(() => {
    setContractInfo({
      mediaUrl : contractInfo.mediaUrl,
      date1 : contractInfo.date1,
      date2 : contractInfo.date2,
      value : contractInfo.value,
      content : contractInfo.content,
      clientAddr : adInfo.clientAddr,
      supplierAddr : adInfo.supplierAddr,
      isClient : true
    })
  },[adInfo]); 

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
  
    async function getAdInfo() {
      for(let i=0;i<adList.length;i++) {
        if(adList[i].id === parseInt(adId)) {
          const owner_arr = await getContractOwner(adList[i].multisigAddress);
          setAdInfo({
            multisigAddress: adList[i].multisigAddress,
            supplierAddr: owner_arr[1],
            clientAddr: owner_arr[0]
          });
          break;
        }
      }
    }

  const handleContractUrl = async (e) => {
    contractInfo.mediaUrl = e.target.value;
    setContractInfo(contractInfo);
  }

  const handleContractContent = async (e) => {
    contractInfo.content = e.target.value;
    setContractInfo(contractInfo);
  }

  const handleContractDate1 = async (e) => {
    contractInfo.date1 = e.target.value;
    setContractInfo(contractInfo);
  }

  const handleContractDate2 = async (e) => {
    contractInfo.date2 = e.target.value;
    setContractInfo(contractInfo);
  }

  const handleContractCost = async (e) => {
    setCurCost(e.target.value);
    var toEth = await exchange(e.target.value, vsCurrencies);
    setEthPrice(toEth);
    contractInfo.value = toEth;
    setContractInfo(contractInfo)
  }

  const vsChange = async (curCost) => {
    var toEth = await exchange(curCost,vsCurrencies);
    setEthPrice(toEth);
    contractInfo.cost = toEth;
    setContractInfo(contractInfo);
  }

  const handleSubmit = async () => {
    setIsLoading(true);

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

    const walletAddress = adInfo.multisigAddress;

    try {
      const tx = await method.submitTransaction(walletAddress,contractInfo.supplierAddr,contractInfo.value,tokenURI);
      var tokenInfo = {
        token_uri: "",
        token_id: 0,
        token_address: ""
      }
      tokenInfo.token_uri = tx.events.SubmitTransaction.returnValues.data;
      tokenInfo.token_address = tx.events[0].address;
      tokenInfo.token_id = parseInt(tx.events.Response.returnValues[1],16);
      console.log(tokenInfo);

      if (tx) {
        const result = await contract.create(accessToken,isClient,adId,tokenInfo);
        if(result) {
          await Swal.fire({
            icon: 'success',
            title: '?????? ?????? ??????!',
          })
          setIsLoading(false);
          navigate(`/mypage/client`);
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '???????????? ??????..',
      })
      setIsLoading(false);
    }
  }

  return (
    <>
      <Container>
        <br />
        <br />
        <br />
        <Form className='form'>
          <h1 className='ContractTitle'>?????? ?????? ?????????</h1>
          <Form.Group className="mb-3">
            <Form.Label><h5>?????????, ????????? ?????? ?????? URL<span className="require"> *</span></h5></Form.Label>
            <Form.Control type='text' placeholder="Enter Advertisement Media URL" onChange={handleContractUrl}/>
          </Form.Group>
          <p id="mediaUrl-message" className="mediaUrlMessage">mediaUrl Field Required!!</p>
          <Form.Group controlId="formDate" className="mb-3">
            <Form.Label><h5>?????? ??????<span className="require"> *</span></h5></Form.Label>
            <br />
            <Row>
              <Col xl={5}><Form.Control type="date" className='ContractDate1' onChange={handleContractDate1}/></Col>
              <Col xl={2}><h1 className='dateIcon'> ~ </h1></Col>
              <Col xl={5}><Form.Control type="date" className='ContractDate2' onChange={handleContractDate2}/></Col>
            </Row>
          </Form.Group>
          <p id="date-message" className="dateMessage">Date Field Required!!</p>
          <Form.Group>
            <Form.Label><h5>??????<span className="require"> *</span></h5></Form.Label>
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
              <img src='https://beb-project3-s3-bucket.s3.ap-northeast-2.amazonaws.com/exchange.png' alt="" className='exchange'></img>
              <Form.Control type='text' placeholder={ethPrice} disabled></Form.Control>
              <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <p id="value-message" className="valueMessage">Value Field Required!!</p>
          <Form.Group className="mb-3">
            <Form.Label><h5>?????? ??????</h5></Form.Label>
            <Form.Control as="textarea" placeholder="Enter Your Advertisement Contract Info" rows={3} onChange={handleContractContent}/>
          </Form.Group>
          <Form.Label><h5>????????? ?????? ??????<span className="require"> *</span></h5></Form.Label>
          <InputGroup className="mb-3">
            <h6 className='wallet_text'>&ensp;Advertiser&ensp;</h6>
            <Form.Control type="text" placeholder="Enter Your Address" defaultValue={adInfo.clientAddr} disabled />
          </InputGroup>
          <InputGroup className="mb-3">
            <h6 className='wallet_text'>&ensp;Creator&ensp;</h6>
            <Form.Control type="text" placeholder="Enter Your Contractor Address" defaultValue={adInfo.supplierAddr} disabled />
          </InputGroup>
          <p id="address-message" className="addressMessage">Address Field Required!!</p>
          <Row>
            <Col>
              <Button variant="secondary" onClick={() => {setModalShow(true);}}>????????????</Button>{' '}
              <Button variant="secondary" disabled={!previewCheck} onClick={async ()=> {
                await Swal.fire({
                  title: '?????? ?????? ???????????? ?????????\n ?????????????????????????',
                  html:
                  '<b>?????? ???????????? ??????????????????????????? ?????? ???????????? ??????????????????,\n ?????? ????????? ?????? ????????? ?????? ????????? ???????????????.\n ???????????? ?????? ???????????? ???????????????????????? ???????????????.</b> ',
                  showCancelButton: true,
                  confirmButtonText: 'Progress',
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.scrollTo(0, 0);
                    handleSubmit();
                  }
                })
              }}>Submit</Button>
            </Col>
          </Row>
          <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>
                ?????? ?????? ?????????
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBody'>
              <ContractPrint contractInfo={contractInfo} previewCheck={previewCheck} setTokenURI={setTokenURI} setPreviewCheck={setPreviewCheck}></ContractPrint>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Container>
    </>
  );
}

export default AdContract;
