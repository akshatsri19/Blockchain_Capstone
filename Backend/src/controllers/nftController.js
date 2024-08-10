const nftMintingService = require("../services/nftMintingService");
const notificationService = require("../services/notificationService");

class NFTController {
  async claimNFT(req, res) {
    const { userId, recipient, tokenURI } = req.body;
    try {
      const notification = {
        userId,
        recipient,
        tokenURI,
        status: 'pending',
        createdAt: new Date(),
      };
      const notificationId = await notificationService.addNotification(notification);
      res.json({ message: "NFT claim requested", notificationId });
    } catch (error) {
      res.status(500).json({ message: "Failed to request NFT claim", error });
    }
  }

  async getNotifications(req, res) {
    try {
      const notifications = await notificationService.getPendingNotifications();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications", error });
    }
  }

  async mintNFT(req, res) {
    const { notificationId } = req.body;
    try {
      const notification = await notificationService.getPendingNotificationById(notificationId);
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      const { recipient, tokenURI } = notification;
      console.log("Minting NFT for recipient:", recipient);
      console.log("Token URI:", tokenURI);
      const result = await nftMintingService.mintNFT(recipient, tokenURI, "dummy hash");

      if (result.success) {
        await notificationService.updateNotificationStatus(notificationId, 'minted');
        res.json({ message: "NFT minted successfully", txHash: result.txHash });
      } else {
        res.status(500).json({ message: "Minting failed", error: result.error });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to mint NFT", error });
    }
  }

  async getUserNFTs(req, res) {
    const { recipientAddress } = req.params;
    try {
      const nftData = await nftMintingService.fetchNFT(recipientAddress);
      console.log("NFT data:", nftData);
      if (nftData && nftData.length > 0) {
        res.json(nftData);
      } else {
        res.status(200).json({ message: "No NFTs found for this user",nfts:[] });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NFTs", error });
    }
  }
}

module.exports = new NFTController();
