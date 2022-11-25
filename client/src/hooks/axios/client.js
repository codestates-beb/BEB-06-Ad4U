import axios from 'axios';

const mainList = async () => {
  const options = {
    url: "http://localhost:3001/client/main",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const getList = async () => {
  const options = {
    url: "http://localhost:3001/client/list",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const getDetail = async (clientId) => {
  if (clientId) {
    const options = {
      url: `http://localhost:3001/client/detail?id=${clientId}`,
      method: 'GET',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("clientId is undefined!");
}

const client = { mainList, getList, getDetail };

export default client;