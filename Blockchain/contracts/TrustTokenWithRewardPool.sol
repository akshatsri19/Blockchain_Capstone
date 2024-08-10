// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrustTokenWithRewardPool is ERC20, ERC20Permit, Ownable {
    constructor() ERC20("TrustToken", "TRUST") ERC20Permit("TrustToken") Ownable(msg.sender) {
        _mint(address(this), 100000 * 10 ** 18); // Mint to contract as reward pool
    }

    // Mint reward directly to recipient or transfer form reward pool
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Airdrops - transfer from reward pool - don't mint new tokens
    function batchMintForAirdrops(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Recipients and amounts length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            reward(recipients[i], amounts[i]);
        }
    }

    // Transfer from reward pool
    function reward(address recipient, uint256 amount) public onlyOwner {
        require(balanceOf(address(this)) >= amount, "Not enough tokens in rewards pool");
        _transfer(address(this), recipient, amount);
    }
}