import axios from 'axios';
import Swal from 'sweetalert2'

const mainList = async () => {
  const options = {
    url: "http://localhost:3001/supplier/main",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
  return result;
}

const getList = async () => {
  const options = {
    url: "http://localhost:3001/supplier/list",
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  }
  const result = await axios.request(options);
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
    const result = await axios.request(options);
    return result;
  } else throw new Error("supplierId is undefind!");
}

const apply = async (accessToken, isClient, adId) => {
  const options = {
    url: "http://localhost:3001/function/apply",
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }, 
    withCredentials: true,
    data : {
      isClient: JSON.parse(isClient),
      advertisement_id: adId
    }
  }
  const result = await axios.request(options)
  return result;
}

const applyCancel = async (accessToken, isClient, adId) => {
  const options = {
    url: "http://localhost:3001/function/cancel",
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json" }, 
    withCredentials: true,
    data : {
      isClient: JSON.parse(isClient),
      advertisement_id: adId
    }
  }
  const result = await axios.request(options)
  return result;
}

const callApply = async (accessToken, isClient, adId) => {
    if (isClient === "true") {
      await Swal.fire({
        icon: 'error',
        title: '크리에이터 계정으로만 지원 가능합니다!',
      })
    }
    if (accessToken && isClient) {
      const result = await apply(accessToken, isClient, adId);
      if (result) {
        await Swal.fire({
          icon: 'success',
          title: '지원 완료',
        })
        window.location.reload();
      }
    } else {
      await Swal.fire({
        icon: 'error',
        title: '로그인 후 가능합니다!',
      })
    }
}

const callApplyCancel = async (accessToken, isClient, adId) => {
  try {
      if (isClient === "true") {
        await Swal.fire({
          icon: 'error',
          title: '크리에이터 계정으로만 취소 가능합니다!',
        })
      }
      if (accessToken && isClient) {
      const result = await applyCancel(accessToken, isClient, adId);
      if (result) {
        await Swal.fire({
          icon: 'success',
          title: '지원 취소 완료',
        })
        window.location.reload();
      }
    } else {
      await Swal.fire({
        icon: 'error',
        title: '로그인 후 가능합니다!',
      })
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

const refuse = async (accessToken, isClient, advertisement_id) => {
  if (accessToken && isClient && advertisement_id) {
    const options = {
      url: `http://localhost:3001/function/refuse`,
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }, 
      withCredentials: true,
      data: { 
        isClient: JSON.parse(isClient),
        advertisement_id 
      }
    }
    const result = await axios.request(options);
    return result;
  } else throw new Error("supplierId is undefind!");
}

const supplier = { 
  mainList, 
  getList, 
  getDetail, 
  callApply, 
  callApplyCancel,
  refuse 
};

export default supplier;