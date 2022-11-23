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
        isClient: JSON.parse(isClient),
        advertisement_id: adId,
        supplier_id: supplierId,
        multisigAddress: contractAddress,
      }
    }
    const result = await axios.request(options)
    return result;
  } else throw new Error("insufficient data");
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
        isClient: JSON.parse(isClient),
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
const contract_create = async (accessToken, isClient, adId, tokenInfo) => {
  if (accessToken && isClient && adId && tokenInfo) {
    const options = {
      url: "http://localhost:3001/function/contract",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`},
        "Content-Type": "application/json", 
      withCredentials: true,
      data : {
        isClient: JSON.parse(isClient),
        advertisement_id: adId,
        token_uri: tokenInfo.token_uri,
        token_id: tokenInfo.token_id,
        token_address: tokenInfo.token_address
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
        isClient: JSON.parse(isClient),
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
        isClient: JSON.parse(isClient),
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
  contract_create, 
  complete, 
  cancel 
};

export default contract;