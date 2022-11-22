import axios from 'axios';

const mainList = async () => {
  const options = {
    url: "http://localhost:3001/ad/main",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const getList = async () => {
  const options = {
    url: "http://localhost:3001/ad/list",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const getDetail = async (id) => {
  const options = {
    url: `http://localhost:3001/ad/detail?id=${id}`,
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const apply = async (accessToken, isClient, adId) => {
  const options = {
    url: "http://localhost:3001/function/apply",
    method: 'POST',
    headers: {
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${accessToken}`},
    withCredentials: true,
    data : {
      isClient: isClient,
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
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${accessToken}`},
    withCredentials: true,
    data : {
      isClient: isClient,
      advertisement_id: adId
    }
  }
  const result = await axios.request(options)
  return result;
}

const ad = { mainList, getList, getDetail, apply, applyCancel };

export default ad;