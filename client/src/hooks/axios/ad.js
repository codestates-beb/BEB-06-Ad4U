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



const allContractList = async () => {
  const options = {
    url: "http://localhost:3001/ad/allContract",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const ad = { 
  mainList, 
  getList, 
  getDetail, 
  allContractList
};

export default ad;