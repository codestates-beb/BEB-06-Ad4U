import axios from 'axios';

const mainList = async () => {
  const options = {
    url: "http://localhost:3001/supplier/main",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const getList = async () => {
  const options = {
    url: "http://localhost:3001/supplier/list",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
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
    const result = await axios.request(options)
    return result;
  } else throw new Error("supplierId is undefind!");
}

const supplier = { mainList, getList, getDetail };

export default supplier;