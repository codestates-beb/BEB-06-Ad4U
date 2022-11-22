import axios from 'axios';

const apply = async (e) => {
  const options = {
    url: "http://localhost:3001/function/apply",
    method: 'POST',
    headers: { },
    withCredentials: true,
  }
  const result = await axios.request(options)
  return result;

}

const functions = { apply };
export default functions;