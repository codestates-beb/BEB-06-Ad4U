import axios from 'axios';

const mainList = async () => {
  const options = {
    url: "http://localhost:3001/ad/main",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const getList = async () => {
  const options = {
    url: "http://localhost:3001/ad/list",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const getDetail = async (adId) => {
  if (adId) {
    const options = {
      url: `http://localhost:3001/ad/detail?id=${adId}`,
      method: 'GET',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
    }
    const result = await axios.request(options);
    return result;
  } else {
    throw new Error('adId is undefind!');
  }
}

const _delete = async (accessToken, isClient, advertisement_id) => {
  if (accessToken && isClient && advertisement_id) {
    const options = {
      url: "http://localhost:3001/ad/delete",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      withCredentials: true,
      data: {
        isClient: JSON.parse(isClient),
        advertisement_id,
      }
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("insufficient data");
}

const allContractList = async () => {
  const options = {
    url: "http://localhost:3001/ad/allContract",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const ad = { 
  mainList, 
  getList, 
  getDetail, 
  _delete,
  allContractList
};

export default ad;