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

  async reward(req, res) {
    const { recipient, amount } = req.body;
    try {
      const result = await tokenService.transferReward(recipient, amount);
      res.json({ message: "Reward transfer successful", tx: result.tx });
    } catch (error) {
      res.status(500).json({ message: "Reward transfer failed", error });
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