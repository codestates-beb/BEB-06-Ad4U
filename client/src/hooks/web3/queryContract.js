import {ABI} from "../web3/contractInfo";
import Web3 from 'web3';


export const getContractOwner = async (walletAddress) => {
    console.log(walletAddress)
    const web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(ABI,walletAddress)
    
    let result = await contract.methods.getOwners().call();
    console.log(result)
    return result;
  }

export const getTransactionCount = async (walletAddress) => {
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(ABI,walletAddress)
  let result = await contract.methods.getTransactionCount().call();
  console.log(result)
  return result;
}

export const getTransaction = async (walletAddress, txIndex) => {
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(ABI,walletAddress)
  let result = await contract.methods.getTransaction(txIndex).call();
  console.log(result)
  return result;
}