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

const inputInfo = async (accessToken, isClient, intro, profileImgUrl) => {
  if (accessToken && isClient && intro && profileImgUrl) {
  const options = {
    url: `http://localhost:3001/client/inputInfo`,
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }, 
    withCredentials: true,
    data: { 
      isClient: JSON.parse(isClient),
      profileImgUrl,
      intro,
    }
  }
  const result = await axios.request(options);
  return result;
  } else throw new Error("insufficient localData");
}

const client = { mainList, getList, getDetail, inputInfo };

export default client;