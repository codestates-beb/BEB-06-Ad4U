import axios from 'axios';

const mainList = async () => {
  const options = {
    url: "http://localhost:3001/supplier/main",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const getList = async () => {
  const options = {
    url: "http://localhost:3001/supplier/list",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const getDetail = async (supplierId) => {
  if (supplierId) {
    const options = {
      url: `http://localhost:3001/supplier/detail?id=${supplierId}`,
      method: 'GET',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("supplierId is undefind!");
}

const apply = async (accessToken, isClient, adId) => {
  const options = {
    url: "http://localhost:3001/function/apply",
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }, 
    withCredentials: true,
    data : {
      isClient: JSON.parse(isClient),
      advertisement_id: adId
    }
  }
  const result = await axios.request(options)
  return result;
}

const applyCancel = async (accessToken, isClient, adId) => {
  const options = {
    url: "http://localhost:3001/function/cancel",
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json" }, 
    withCredentials: true,
    data : {
      isClient: JSON.parse(isClient),
      advertisement_id: adId
    }
  }
  const result = await axios.request(options)
  return result;
}

const callApply = async (accessToken, isClient, adId) => {
  try {
    if (isClient === "true") return alert("크리에이터 계정으로만 지원가능합니다.");
    if (accessToken && isClient) {
      const result = await apply(accessToken, isClient, adId);
      if (result) alert("신청이 완료되었습니다!!");
      window.location.reload();
    } else {
      alert("로그인후 이용가능합니다.");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

const callApplyCancel = async (accessToken, isClient, adId) => {
  try {
      if (isClient === "true") return alert("크리에이터 계정으로만 지원가능합니다.");
      if (accessToken && isClient) {
      const result = await applyCancel(accessToken, isClient, adId);
      if (result) alert("신청이 취소되었습니다!!");
      window.location.reload();
    } else {
      alert("로그인후 이용가능합니다.");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

const refuse = async (accessToken, isClient, advertisement_id) => {
  if (accessToken && isClient && advertisement_id) {
    const options = {
      url: `http://localhost:3001/function/refuse`,
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }, 
      withCredentials: true,
      data: { 
        isClient: JSON.parse(isClient),
        advertisement_id 
      }
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("supplierId is undefind!");
}

const supplier = { 
  mainList, 
  getList, 
  getDetail, 
  callApply, 
  callApplyCancel,
  refuse 
};

export default supplier;