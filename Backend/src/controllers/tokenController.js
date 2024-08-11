const tokenService = require("../services/tokenService");

const TokenController = {
  async mint(req, res) {
    const { recipient, amount } = req.body;
    try {
      const result = await tokenService.mint(recipient, amount);
      res.json({ message: "Minting successful", tx: result.tx });
    } catch (error) {
      res.status(500).json({ message: "Minting failed", error });
    }
  },

  async batchMint(req, res) {
    const { recipients, amounts } = req.body;
    try {
      const result = await tokenService.batchMint(recipients, amounts);
      res.json({ message: "Batch minting successful", tx: result.tx });
    } catch (error) {
      res.status(500).json({ message: "Batch minting failed", error });
    }
  },

  async claimReward(req, res) {
    const { hashedKycId, taskId } = req.body;
    try {
      const result = await tokenService.claimReward(hashedKycId, taskId);
      res.json({ message: "Reward claim successful", tx: result.tx });
    } catch (error) {
      res.status(500).json({ message: "Reward claim failed", error });
    }
  },

  async addOrUpdateTask(req, res) {
    const { taskId, rewardAmount, isActive } = req.body;
    try {
      const result = await tokenService.addOrUpdateTask(taskId, rewardAmount, isActive);
      res.json({ message: "Task added/updated successfully", tx: result.tx });
    } catch (error) {
      res.status(500).json({ message: "Failed to add/update task", error });
    }
  },

  async getTask(req, res) {
    const { taskId } = req.params;
    try {
      const task = await tokenService.getTask(taskId);
      res.json({ task });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch task", error });
    }
  },

  async getActiveTasks(req, res) {
    try {
      const activeTasks = [];
      for (let i = 0; i < 10; i++) { // Assuming task IDs are from 0 to 9
        const task = await tokenService.getTask(i);
        if (task.isActive) {
          activeTasks.push({ taskId: i, ...task });
        }
      }
      res.json({ activeTasks });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active tasks", error });
    }
  },

  async getRewardPoolBalance(req, res) {
    try {
      const balance = await tokenService.getRewardPoolBalance();
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reward pool balance", error });
    }
  }
};

module.exports = TokenController;