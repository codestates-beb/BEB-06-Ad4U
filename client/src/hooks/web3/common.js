import Web3 from "web3";
import { ABI } from './contractInfo';

// 메타마스크 연결
const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}

// contract 객체 생성
const loadContract = async () => {
  return await new window.web3.eth.Contract(ABI);
}


// 현재 계정 주소 가져오기
const getCurrentAccount = async() => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

export { loadWeb3, loadContract, getCurrentAccount };