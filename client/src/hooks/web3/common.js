import Web3 from "web3";
import { ABI } from './contractInfo';
import Swal from 'sweetalert2'

// 메타마스크 연결
const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_accounts' });
  } else {
    await Swal.fire({
      icon: 'warning',
      title: '메타마스크가 설치되어있지 않습니다!',
    })
    await Swal.fire({
      title: '메타마스크를 설치하시겠습니까?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.open("https://metamask.io/");
      } 
    })
  }
}

// contract 객체 생성
const loadContract = async (walletAddress) => {
  return await new window.web3.eth.Contract(ABI,walletAddress);
}


// 현재 계정 주소 가져오기
const getCurrentAccount = async() => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

export { loadWeb3, loadContract, getCurrentAccount };