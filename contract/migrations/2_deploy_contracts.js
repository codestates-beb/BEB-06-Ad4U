
const Ad4USoulBoundToken = artifacts.require("Ad4USoulBoundToken");
const fs = require("fs");

module.exports = function (deployer) {
  deployer
    .deploy(Ad4USoulBoundToken) // contract
    .then(() => {
      //배포시 컨트랙 ABI와 Address를 파일 형태로 저장합니다.
      if (Ad4USoulBoundToken._json) {
        fs.writeFile(
          "Ad4USBTdeployedABI",
          JSON.stringify(Ad4USoulBoundToken._json.abi),
          (err) => {
            if (err) throw err;
            console.log("파일에 ABI 입력 성공");
          }
        );
      }

      fs.writeFile("Ad4USBTdeployedAddress", Ad4USoulBoundToken.address, (err) => {
        if (err) throw err;
        console.log("파일에 주소 입력 성공");
      });
    });
};
