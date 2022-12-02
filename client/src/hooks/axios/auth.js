import axios from "axios";

const refresh = async () => {
  const options = {
    url: "http://localhost:3001/users/refresh",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const oauthLink = async (isClient) => {
  const options = {
    url: "http://localhost:3001/users/auth",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
    data: isClient,
  }
  const result = await axios.request(options);
  return result.data;
}

const oauth = async (authorizationCode, isClient) => {
  if (authorizationCode && isClient) {
    const options = {
      url: "http://localhost:3001/users/auth",
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
      data: { code: authorizationCode, isClinet: JSON.parse(isClient) }
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("authorizationCode not provided");
}

const login = async (loginData) => {
  const { userId, password, isClient} = loginData;
    if (userId && password && typeof(isClient) === 'boolean') {
    const options = {
      url: "http://localhost:3001/users/login",
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
      data: { userId, password, isClient }
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("insufficient loginData");
}

const logout = async () => {
    const options = {
      url: "http://localhost:3001/users/logout",
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
    }
    const result = await axios.request(options);
    return result;
}

const signup = async (signupData) => {
  if (signupData) {
    const options = {
      url: "http://localhost:3001/users/signup",
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      withcredential: true,
      data: signupData
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("insufficient signupData");
}

const getMypage = async (isClient, accessToken) => {
  if (isClient && accessToken) {
    const options = {
      url: `http://localhost:3001/users/mypage?isClient=${isClient}`,
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      withCredentials: true,
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("insufficient localData");
}

const auth = { refresh, oauthLink, oauth, login, logout, signup, getMypage };

export default auth;