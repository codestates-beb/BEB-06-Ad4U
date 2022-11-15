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

    function _beforeTokenTransfer(address from, address to, uint256, uint256) pure internal override {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred. It can only be burned by the token owner.");
    }



}