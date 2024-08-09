const { Contract, parseUnits, formatUnits } = require("ethers");
const TrustTokenABI = require("../../../Blockchain/artifacts/contracts/TrustTokenWithRewardPool.sol/TrustTokenWithRewardPool.json").abi;
const { wallet } = require("../config/provider");

// Initialize contract instance
const trustTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const trustTokenContract = new Contract(trustTokenAddress, TrustTokenABI, wallet);

class TokenService {
  async mint(recipient, amount) {
    try {
        const tx = await trustTokenContract.mint(recipient, parseUnits(amount, 18));
        await tx.wait();
        return { success: true, tx };
    } catch (error) {
        console.error("Minting failed:", error);
        throw error;
    }
  }

  async batchMint(recipients, amounts) {
    try {
        const amountsInWei = amounts.map(amount => parseUnits(amount, 18));
        const tx = await trustTokenContract.batchMint(recipients, amountsInWei);
        await tx.wait();
        return { success: true, tx };
    } catch (error) {
        console.error("Batch minting failed:", error);
        throw error;
    }
  }

  async transferReward(recipient, amount) {
    try {
        const tx = await trustTokenContract.reward(recipient, parseUnits(amount, 18));
        await tx.wait();
        return { success: true, tx };
    } catch (error) {
        console.error("Reward transfer failed:", error);
        throw error;
    }
  }

  async getRewardPoolBalance() {
    try {
        const balance = await trustTokenContract.balanceOf(trustTokenAddress);
        return formatUnits(balance, 18);
    } catch (error) {
        console.error("Failed to fetch reward pool balance:", error);
        throw error;
    }
  }
}

module.exports = new TokenService();
