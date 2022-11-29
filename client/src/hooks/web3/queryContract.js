import { ABI } from "../web3/contractInfo";
import Web3 from 'web3';


export const getContractOwner = async (walletAddress) => {
    console.log(walletAddress)
    const web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(ABI,walletAddress)
    
    let result = await contract.methods.getOwners().call();
    // console.log(result)
    return result;
  }

export const getTransactionCount = async (walletAddress) => {
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(ABI,walletAddress)
  let result = await contract.methods.getTransactionCount().call();
  // console.log(result)
  return result;
}

//해당 wallet에서 confirm 여부
export const getTransaction = async (walletAddress, txIndex) => {
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(ABI,walletAddress)
  let result = await contract.methods.getTransaction(txIndex).call();
  // console.log(result)
  return result;
}

//wallet 상관없이 count를 가져옴
export const getIsConfirmed = async (walletAddress, txIndex, accountAddress) => {
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(ABI,walletAddress)
  let result = await contract.methods.isConfirmed(txIndex, accountAddress).call();
  // console.log(result)
  return result;
}