// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrustNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    event NFTMinted(address indexed owner, uint256 indexed tokenId);

    constructor() ERC721("TrustBlu", "TBT") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIdCounter += 1;
        uint256 newItemId = _tokenIdCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NFTMinted(recipient, newItemId);
        return newItemId;
    }

    function totalSupply() public view returns (uint256){
        return _tokenIdCounter;
    }
}