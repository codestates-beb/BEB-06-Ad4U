// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Ad4USoulBoundToken is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Ad4USoulBoundToken", "Ad4USBT") {}

    // ERC721Storage 컨트랙트를 사용해 tokenURI 관리
    function mintSBT(address recipient, string memory tokenURI) 
        external // 외부에서만 실행
        returns (uint256)
    {
        _tokenIds.increment(); // 토큰 id 증가

        uint256 newItemId = _tokenIds.current(); // 현재 토큰 id를 사용
        _mint(recipient,newItemId); // 토큰 발행 
        _setTokenURI(newItemId,tokenURI); // tokenURI 생성

        return newItemId;
    }

    // 위에 까지는 NFT, 이 _beforeTokenTransfer에서 Require 때문에 SBT의 속성을 가짐
    // 해당 함수는 ERC721 표준에서 _transfer전 로직을 생성할 수 있는 함수로, _transfer전 무조건 실행
    // 따라서 override함으로써 from이나 to가 유효한 계정일 경우, transfer를 막음 => 즉, transfer기능 자체를 막음
    function _beforeTokenTransfer(address from, address to, uint256, uint256) pure internal override {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred. It can only be burned by the token owner.");
    }



}