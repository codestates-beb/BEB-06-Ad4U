import axios from "axios";

const refresh = async () => {
  const options = {
    url: "http://localhost:3001/users/refresh",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;
}

const oauth = async (authorizationCode) => {
  const options = {
    url: "http://localhost:3001/users/auth",
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
    data: { code: authorizationCode }
  }
  const result = await axios.request(options)
  return result;
}

const login = async (loginData) => {
  const { userId, password, isClient} = loginData;
  const options = {
    url: "http://localhost:3001/users/login",
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
    data:{ userId, password, isClient }
  }
  const result = await axios.request(options)
  return result;
}

const logout = async () => {
    const options = {
      url: "http://localhost:3001/users/logout",
      method: 'GET',
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
    }
    const result = await axios.request(options);
    return result;
}

const signup = async (signupData) => {
  const options = {
    url: "http://localhost:3001/users/signup",
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    withcredential: true,
    data: signupData
  }
  const result = await axios.request(options);
  return result;
}

const auth = { refresh, oauth, login, logout, signup };

export default auth;