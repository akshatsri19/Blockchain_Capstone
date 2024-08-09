import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import testImage from '../Assets/g1.jpg';
import '../Styles/UserDbTest.css';
// for now hardcoding the userId and recipientAddress
// /users/xb9LwCGT4tXLel6LSHSIR0Y648r1
const UserDbTest = () => {
    // ({ userId, recipientAddress }) -> for now hardcode values
  const [message, setMessage] = useState('');
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClaimedButton, setShowClaimedButton] = useState([1, 10, 25, 50]); // State to manage claimable milestones

  const recipientAddress = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc";
   // Hardcoded donation count for testing purposes
   const donationCount = 1;

  const handleClaimNFT = async () => {
    try {
      const tokenURI = "https://example.com/nft-metadata"; // Generate this dynamically based on user criteria
      const response = await axios.post('http://localhost:5001/api/nft/claim', {
        userId: "xb9LwCGT4tXLel6LSHSIR0Y648r1",
        recipient: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
        tokenURI,
      });

      if (response.data.success) {
        setMessage('NFT claimed successfully!');
        
        // Remove the claimed milestone from the showClaimedButton array
        setShowClaimedButton(prev => prev.filter(milestone => milestone !== donationCount));

        // After claiming, fetch the updated NFT data
        fetchNFTData();
      } else {
        setMessage('Failed to claim NFT');
      }

    } catch (error) {
      setMessage('Failed to claim NFT');
      console.error('Error claiming NFT:', error);
    }
  };

  const fetchNFTData = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:5001/api/nft/nfts/${recipientAddress}`);
        const nftData = response.data;

        if (nftData.length == 0) {
            setMessage('No NFTs found');
        } else {
          setNfts(nftData); // store all nfts in state
        }
    } catch (error) {
      console.error('Failed to fetch NFT data:', error);
      setMessage('Failed to fetch NFT data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTData();
  }, []);

  const shouldShowClaimButton = () => {
    return showClaimedButton.includes(donationCount);
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {loading ? (
        <p>Loading your NFTs...</p>
      ) : nfts.length > 0 ? (
        <div>
            <h2>Your NFTs</h2>
            <div className="nft-card-container">
            {nfts.map((nft, index) => (
                <div key={index} className="nft-card">
                <img src={testImage} alt="testImage" width="200" />
                {/* <p>Name: {nft.metadata.name}</p> */}
                {/* <p>Description: {nft.metadata.description}</p> */}
                    <div className="nft-details">
                        <p>Token ID: {nft.tokenId}</p>
                        <p>Metadata Hash: {nft.metadataHash}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
      ) : (
        <>
          {shouldShowClaimButton() && (
            <button onClick={handleClaimNFT}>Claim NFT</button>
          )}
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default UserDbTest;
