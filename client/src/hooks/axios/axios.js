import axios from "axios";

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

export { logout };