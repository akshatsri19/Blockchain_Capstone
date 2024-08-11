const { Contract, parseUnits, formatUnits } = require("ethers");
const TrustTokenABI = require("../../../Blockchain/artifacts/contracts/TrustTokenWithDynamicTasks.sol/TrustTokenWithDynamicTasks.json").abi;
const { wallet, trustTokenAddress } = require("../config/provider");

// Initialize contract instance
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

  async claimReward(hashedKycId, taskId) {
    try {
      const tx = await trustTokenContract.claimReward(hashedKycId, taskId);
      await tx.wait();
      return { success: true, tx };
    } catch (error) {
      console.error("Reward claim failed:", error);
      throw error;
    }
  }

  async addOrUpdateTask(taskId, rewardAmount, isActive) {
    try {
      const rewardAmountInWei = parseUnits(rewardAmount, 18);
      const tx = await trustTokenContract.addOrUpdateTask(taskId, rewardAmountInWei, isActive);
      await tx.wait();
      return { success: true, tx };
    } catch (error) {
      console.error("Adding or updating task failed:", error);
      throw error;
    }
  }

  async getTask(taskId) {
    try {
      const task = await trustTokenContract.tasks(taskId);
      return {
        rewardAmount: formatUnits(task.rewardAmount, 18),
        isActive: task.isActive
      };
    } catch (error) {
      console.error("Failed to fetch task:", error);
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