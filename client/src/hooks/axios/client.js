import axios from 'axios';

const mainList = async () => {
  const options = {
    url: "http://localhost:3001/client/main",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const getList = async () => {
  const options = {
    url: "http://localhost:3001/client/list",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const getDetail = async (id) => {
  const options = {
    url: `http://localhost:3001/client/detail?id=${id}`,
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const client = { mainList, getList, getDetail };

export default client;