
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import './Contract.css';

import axios from 'axios';
import { getLocalData } from '../../../config/localStrage';
import { Container } from 'react-bootstrap';
import ContractPrint from './ContractPrint';
import method from '../../../hooks/web3/sendTransaction';
import { getContractOwner } from '../../../hooks/web3/queryContract';
import contract from '../../../hooks/axios/contract'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loading from '../../../component/Loading';



const AdContract = ({ userData, adList }) => {
  const { adId } = useParams();
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  const navigate = useNavigate();

  const [adInfo, setAdInfo] = useState({})

  // 현재 광고 정보 불러오고, owner 조회 및 저장
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

  //multisigAddress, clientAddr, supplierAddr 렌더시 한번만 불러옴 + setAdInfo
  useEffect(() => {
    getAdInfo();
  },[contractInfo.value]) // 사이트 새로 고침시 주소 데이터 날라감, 제일 중요한 데이터인 value값을 기준으로 바뀔때마다 가져옴
  
  // AdInfo 바뀔때마다 contractInfo set
  useEffect(() => {
    console.log(adInfo)
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
  },[adInfo]); //새로 고침해도 데이터 유지 

  const [modalShow, setModalShow] = useState(false);
  const [vsCurrencies, setVsCurrencies] = useState("krw");
  const [ethPrice,setEthPrice] = useState(0);
  const [curCost, setCurCost] = useState("");
  const [previewCheck, setPreviewCheck] = useState(false);
  const [tokenURI, setTokenURI] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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


  const handleContractUrl = async (e) => {
    console.log(contractInfo)
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
    console.log(contractInfo)
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
    console.log(contractInfo)
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


  const handleSubmit = async () => {
    console.log(tokenURI);
    setIsLoading(true);

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
    const walletAddress = adInfo.multisigAddress;
    console.log(walletAddress);
    try {
      //submit Transaction : (walletAddress, _to, _value, _data)
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
        //DB 상태 업데이트
        const result = await contract.create(accessToken,isClient,adId,tokenInfo);
        await Swal.fire({
          icon: 'success',
          title: '계약 생성 성공!',
        })
        setIsLoading(false);
        navigate(`/mypage/client`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '트랜잭션 오류..',
      })
      setIsLoading(false);
    }
  }



  return (
    <>
    {isLoading 
    ? <Loading /> :
    <Container>
    <br></br>
    <br></br>
    <br></br>
    <Form className='form'>
    <h1 className='ContractTitle'>광고 대행 계약서</h1>

         <Form.Group className="mb-3">
            <Form.Label><h5>동영상, 사진을 올릴 매체 URL<span className="alert"> *</span></h5></Form.Label>
            <Form.Control type='text' placeholder="Enter Advertisement Media URL" onChange={handleContractUrl}/>
        </Form.Group>
        <p id="mediaUrl-message" className="mediaUrlMessage">mediaUrl Field Required!!</p>

      <Form.Group controlId="formDate" className="mb-3">
        <Form.Label><h5>계약 기간<span className="alert"> *</span></h5></Form.Label>
        <br></br>
        <Form.Control type="date" className='ContractDate1' onChange={handleContractDate1}/>
        <h1 className='dateIcon'> ~ </h1>
        <Form.Control type="date" className='ContractDate2' onChange={handleContractDate2}/>
      </Form.Group>
      <p id="date-message" className="dateMessage">Date Field Required!!</p>
      
      <Form.Group>
        <Form.Label><h5>보수<span className="alert"> *</span></h5></Form.Label>
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

      <Form.Label><h5>계약자 지갑 주소<span className="alert"> *</span></h5></Form.Label>
      <InputGroup className="mb-3">
        <h6>&ensp;Advertiser&ensp;</h6>
        <Form.Control type="text" placeholder="Enter Your Address" defaultValue={adInfo.clientAddr} disabled/>
      </InputGroup>

      <InputGroup className="mb-3">
        <h6>&ensp;Creator&ensp;</h6>
        <Form.Control type="text" placeholder="Enter Your Contractor Address" defaultValue={adInfo.supplierAddr} disabled/>
      </InputGroup>
      <p id="address-message" className="addressMessage">Address Field Required!!</p>



      <Button variant="primary" onClick={() => {setModalShow(true);}}>
        미리보기
      </Button>
     
      <br></br>
      <br></br>
      <Button variant="primary" onClick={async ()=> {
        await Swal.fire({
          title: '해당 계약 내용으로 계약을\n 진행하시겠습니까?',
          html:
          '<b>해당 계약서는 한국디지털광고협회 표준 양식으로 작성되었으며,\n 계약 진행시 계약 내용에 대한 수정은 불가합니다.\n 계약금은 앞서 생성하신 스마트컨트랙트에 예치됩니다.</b> ',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Progress',
          denyButtonText: `Don't Proceed`,
        }).then((result) => {
          console.log(result)
            if (result.isConfirmed) {
              window.scrollTo(0, 0)
              handleSubmit();
            } else if (result.isDenied) {
              Swal.fire('계약 진행 취소', '', 'info')
            }
          })
      }} disabled={!previewCheck}>
        Submit
      </Button>


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
        <ContractPrint contractInfo={contractInfo} previewCheck={previewCheck} setTokenURI={setTokenURI} setPreviewCheck={setPreviewCheck}></ContractPrint>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </Form>
    </Container>
  }
  </>
    
  );
}

export default AdContract;
