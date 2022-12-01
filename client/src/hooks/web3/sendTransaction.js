import Web3 from "web3";

import { byteCode } from './contractInfo';
import { loadWeb3, loadContract, getCurrentAccount } from './common';


const multiSigWalletDeploy = async (supplierAddr) => {
  await loadWeb3();
  window.contract = await loadContract(); 
  const account = await getCurrentAccount(); 
  
  let result = await window.contract
    .deploy({data: "0x"+ byteCode, arguments: [supplierAddr]})
    .send({ from: account }); 
  return result;
}

const supplierSignWallet = async (walletAddress) => {
  await loadWeb3();
  window.contract = await loadContract(walletAddress);
  const account = await getCurrentAccount(); 
  
  let result = await window.contract.methods
    .SupplierSign()
    .send({from : account});
  return result;
}

const submitTransaction = async (walletAddress, _to, _value, _data) => {
  await loadWeb3(); 
  window.contract = await loadContract(walletAddress); 
  const account = await getCurrentAccount(); 
  
  const valToWei = Web3.utils.toWei(String(_value), "ether");
  
  let result = await window.contract.methods
    .submitTransaction(_to, valToWei, _data)
    .send({from : account, value: valToWei});
  return result;
}

const confirmTransaction = async (walletAddress,_txIndex) => {
  await loadWeb3(); 
  window.contract = await loadContract(walletAddress); 
  const account = await getCurrentAccount(); 
  
  let result = await window.contract.methods
    .confirmTransaction(_txIndex)
    .send({from : account});
  return result;
}

const revokeConfirmation = async (walletAddress, _txIndex) => {
  await loadWeb3(); 
  window.contract = await loadContract(walletAddress); 
  const account = await getCurrentAccount(); 
  
  let result = await window.contract.methods
    .revokeConfirmation(_txIndex)
    .send({from : account});
  return result;
}

const executeTransaction = async (walletAddress, _txIndex) => {
  await loadWeb3(); 
  window.contract = await loadContract(walletAddress); 
  const account = await getCurrentAccount(); 
  
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