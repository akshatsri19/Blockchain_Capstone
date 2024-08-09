const express = require("express");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

router.post("/mint", tokenController.mint);
router.post("/batch-mint", tokenController.batchMint);
router.post("/reward", tokenController.reward);
router.get("/rewardpool-balance", tokenController.getRewardPoolBalance);

module.exports = router;