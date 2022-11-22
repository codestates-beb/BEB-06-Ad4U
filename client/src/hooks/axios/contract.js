import axios from "axios";

//협의 광고주만 가능
const conference = async (accessToken, isClient, supplierId, adId, contractAddress) => {
  if (accessToken && isClient && supplierId && adId && contractAddress) {
    const options = {
      url: "http://localhost:3001/function/conference",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`},
        "Content-Type": "application/json", 
      withCredentials: true,
      data : {
        isClient,
        advertisement_id: adId,
        supplier_id: supplierId,
        multisigAddress: contractAddress,
      }
    }
    const result = await axios.request(options)
    return result;
  } 
  if (isClient === "false") return alert("광고주 계정으로만 지원가능합니다.");
  if (!(isClient && accessToken)) return  alert("로그인후 이용가능합니다.");
  else return alert("서버와의 연결이 실패하였습니다.");
}

//진행
const proceed = async (accessToken, isClient, adId) => {
  if (accessToken && isClient && adId) {
    const options = {
      url: "http://localhost:3001/function/proceed",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`},
        "Content-Type": "application/json", 
      withCredentials: true,
      data : {
        isClient,
        advertisement_id: adId,
      }
    }
    const result = await axios.request(options)
    return result;
  } else {
    alert("로그인후 이용가능합니다.");
  }
}

//계약
const confirm = async (accessToken, isClient, adId) => {
  if (accessToken && isClient && adId) {
    const options = {
      url: "http://localhost:3001/function/contract",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`},
        "Content-Type": "application/json", 
      withCredentials: true,
      data : {
        isClient,
        advertisement_id: adId,
      }
    }
    const result = await axios.request(options)
    return result;
  } else {
    alert("로그인후 이용가능합니다.");
  }
}

//이행완료
const complete = async (accessToken, isClient, adId) => {
  if (accessToken && isClient && adId) {
    const options = {
      url: "http://localhost:3001/function/complete",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`},
        "Content-Type": "application/json", 
      withCredentials: true,
      data : {
        isClient,
        advertisement_id: adId,
      }
    }
    const result = await axios.request(options)
    return result;
  } else {
    alert("로그인후 이용가능합니다.");
  }
}

//파기
const cancel = async (accessToken, isClient, adId) => {
  if (accessToken && isClient && adId) {
    const options = {
      url: "http://localhost:3001/function/break",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`},
        "Content-Type": "application/json", 
      withCredentials: true,
      data : {
        isClient,
        advertisement_id: adId,
      }
    }
    const result = await axios.request(options)
    return result;
  } else {
    alert("로그인후 이용가능합니다.");
  }
}

const contract = { 
  conference, 
  proceed, 
  confirm, 
  complete, 
  cancel 
};

export default contract;