const { Contract } = require("ethers");
const { wallet, provider, trustNFTAddress } = require("../config/provider");
const NFT_ABI = require("../../../Blockchain/artifacts/contracts/TrustNFT.sol/TrustNFT.json").abi;
const { admin, db } = require("../config/firebase");

// Initialize NFT contract instance
const nftContract = new Contract(trustNFTAddress, NFT_ABI, wallet);
console.log("NFT contract initialized with address:", nftContract);

class NFTMintingService {
    constructor() {
        this.initializeEventListeners(); // Initialize event listeners when the service is created
    }

    initializeEventListeners() {
        nftContract.on("NFTMinted", async (owner, tokenId, metadataHash) => {
            metadataHash = "dummy hash";
            console.log(`NFT minted: Owner: ${owner}, Token ID: ${tokenId.toString()}, Metadata Hash: "${metadataHash}"`);
            await this.handleNFTMintedEvent(owner, tokenId.toString(), metadataHash);
        });
    }

    async handleNFTMintedEvent(owner, tokenId, metadataHash) {
        try {
            console.log(`Handling NFT minted event. Storing data for user: ${owner}, Token ID: ${tokenId}, Metadata Hash: ${metadataHash}`);
            
            // Store the NFT data in Firestore
            await db.collection('nfts').doc(tokenId).set({
                owner: owner,
                tokenId: tokenId,
                metadataHash: metadataHash,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
    
            console.log(`NFT data stored in Firestore for Token ID: ${tokenId}`);
        } catch (error) {
            console.error('Failed to handle NFT minted event:', error);
        }
    }

    async mintNFT(recipient, tokenURI, metadataHash) {
        try {
            const tx = await nftContract.mintNFT(recipient, tokenURI, metadataHash);
            await tx.wait();
            console.log("NFT minted with token ID:", tx.events[0].args.tokenId.toString());
            return { success: true, txHash: tx.hash };
        } catch (error) {
            console.error("Minting NFT failed:", error);
            return { success: false, error };
        }
    }

    async fetchNFT(recipientAddress) {
        try {
            // Query Firestore for NFTs owned by the recipient
            const nftSnapshot = await db.collection('nfts').where('owner', '==', recipientAddress).get();
        
            if (nftSnapshot.empty) {
                console.log(`No NFTs found for user: ${recipientAddress}`);
                return [];
            }
        
            const nfts = [];
            nftSnapshot.forEach(doc => {
                const nftData = doc.data();
                nfts.push({
                tokenId: nftData.tokenId,
                metadataHash: nftData.metadataHash,
                owner: nftData.owner,
                });
            });
    
            console.log(`Fetched ${nfts.length} NFTs for user: ${recipientAddress}`);
            return nfts; // Return an array of NFTs owned by the user
    
        } catch (error) {
            console.error('Failed to fetch NFTs from db:', error);
            throw error;
        }
    }
}

module.exports = new NFTMintingService();