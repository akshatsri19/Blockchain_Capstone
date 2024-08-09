const express = require("express");
const nftController = require("../controllers/nftController");

const router = express.Router();

router.get("/notifications", nftController.getNotifications); // Admin gets pending notifications
router.post("/claim", nftController.claimNFT); // User requests to claim NFT
router.post("/mint", nftController.mintNFT);   // Admin mints NFT
router.get("/nfts/:recipientAddress", nftController.getUserNFTs); // User gets their NFTs

module.exports = router;