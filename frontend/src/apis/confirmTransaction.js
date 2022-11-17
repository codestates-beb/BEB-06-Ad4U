const Web3 = require("web3");

const Ad4UMultiSigWalletInfo = require('./Ad4UmultiSigWalletInfo')


// 메타마스크 연결
async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}

// contract 객체 생성
async function loadContract(walletAddress) {
    let abi = Ad4UMultiSigWalletInfo.ABI;
    return await new window.web3.eth.Contract(abi,walletAddress);
}

// 현재 계정 주소 가져오기
async function getCurrentAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
}

export async function confirmTransaction(walletAddress,_txIndex) {
  await loadWeb3(); // 메타마스크 연결
  window.contract = await loadContract(walletAddress); // 컨트랙 객체 생성
  const account = await getCurrentAccount(); // 계정 정보 가져오기
  
  let result = await window.contract.methods
                    .confirmTransaction(_txIndex)
                    .send({from : account});
  return result
}
