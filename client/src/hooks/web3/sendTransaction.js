import Web3 from "web3";
import { byteCode } from './contractInfo';
import { loadWeb3, loadContract, getCurrentAccount } from './common';

// 1. Multi-Sig Wallet Deploy
const multiSigWalletDeploy = async (supplierAddr) => {
  console.log(supplierAddr);
  await loadWeb3(); // 메타마스크 연결
  window.contract = await loadContract(); // 컨트랙 객체 생성
  const account = await getCurrentAccount(); // 계정 정보 가져오기
  
  let result = await window.contract
    .deploy({data: "0x"+ byteCode, arguments: [supplierAddr]})
    .send({ from: account }); // mintNFT 트랜잭션 보내기
  return result;
}

// 2. Supplier Sign Wallet
const supplierSignWallet = async (walletAddress) => {
  console.log(walletAddress)
  await loadWeb3(); // 메타마스크 연결
  window.contract = await loadContract(walletAddress); // 컨트랙 객체 생성
  const account = await getCurrentAccount(); // 계정 정보 가져오기
  
  let result = await window.contract.methods
    .SupplierSign()
    .send({from : account});
  return result;
}

// 3. Submit Transaction
const submitTransaction = async (walletAddress, _to, _value, _data) => {
  await loadWeb3(); // 메타마스크 연결
  window.contract = await loadContract(walletAddress); // 컨트랙 객체 생성
  const account = await getCurrentAccount(); // 계정 정보 가져오기
  
  const valToWei = Web3.utils.toWei(_value, "ether");
  
  let result = await window.contract.methods
    .submitTransaction(_to, valToWei, _data)
    .send({from : account, value: valToWei});
  return result;
}

// 4. Confirm Transaction
const confirmTransaction = async (walletAddress,_txIndex) => {
  await loadWeb3(); // 메타마스크 연결
  window.contract = await loadContract(walletAddress); // 컨트랙 객체 생성
  const account = await getCurrentAccount(); // 계정 정보 가져오기
  
  let result = await window.contract.methods
    .confirmTransaction(_txIndex)
    .send({from : account});
  return result;
}

// 5. Revoke Transaction
const revokeConfirmation = async (walletAddress, _txIndex) => {
  await loadWeb3(); // 메타마스크 연결
  window.contract = await loadContract(walletAddress); // 컨트랙 객체 생성
  const account = await getCurrentAccount(); // 계정 정보 가져오기
  
  let result = await window.contract.methods
    .revokeConfirmation(_txIndex)
    .send({from : account});
  return result;
}

// 6. Excute Transaction
const executeTransaction = async (walletAddress, _txIndex) => {
  await loadWeb3(); // 메타마스크 연결
  window.contract = await loadContract(walletAddress); // 컨트랙 객체 생성
  const account = await getCurrentAccount(); // 계정 정보 가져오기
  
  let result = await window.contract.methods
    .executeTransaction(_txIndex)
    .send({from : account});
  return result;
}

const method = { 
  multiSigWalletDeploy,
  supplierSignWallet,
  submitTransaction,
  confirmTransaction,
  revokeConfirmation,
  executeTransaction,
}

export default method;