const express = require("express");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

router.post("/mint", tokenController.mint);
router.post("/batch-mint", tokenController.batchMint);
router.get("/rewardpool-balance", tokenController.getRewardPoolBalance);
router.post("/task", tokenController.addOrUpdateTask);
router.get("/task/:taskId", tokenController.getTask);
router.get("/tasks/active", tokenController.getActiveTasks);
router.post("/claim-reward", tokenController.claimReward);

module.exports = router;