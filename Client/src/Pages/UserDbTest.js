// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import testImage from '../Assets/g1.jpg';
// import '../Styles/UserDbTest.css';
// // for now hardcoding the userId and recipientAddress
// // /users/xb9LwCGT4tXLel6LSHSIR0Y648r1
// const UserDbTest = () => {
//     // ({ userId, recipientAddress }) -> for now hardcode values
//   const [message, setMessage] = useState('');
//   const [nfts, setNfts] = useState([]);
//   const [nftLoading, setNftLoading] = useState(false);
//   const [claimLoading, setClaimLoading] = useState(false);
//   const [showClaimedButton, setShowClaimedButton] = useState([1, 10, 25, 50]); // State to manage claimable milestones
//   const [claimInProgress, setClaimInProgress] = useState(false); // Track if a claim is in progress

//   const USER_ADDRESS = process.env.REACT_APP_USER_ADDRESS;
//    // Hardcoded donation count for testing purposes
//    const donationCount = 1;

//   const handleClaimNFT = async () => {
//     setClaimLoading(true);
//     try {
//       const tokenURI = "https://example.com/nft-metadata"; // Generate this dynamically based on user criteria
//       const response = await axios.post('http://localhost:5001/api/nft/claim', {
//         userId: "xb9LwCGT4tXLel6LSHSIR0Y648r1",
//         recipient: `${USER_ADDRESS}`,
//         tokenURI,
//       });

//       if (response.data.success) {
//         setMessage(response.data.message);
//         setClaimInProgress(true);
//         // Remove the claimed milestone from the showClaimedButton array
//         setShowClaimedButton(prev => prev.filter(milestone => milestone !== donationCount));

//         // After claiming, fetch the updated NFT data
//         fetchNFTData();
//       } else {
//         setMessage('NFT claim request failed, please try again later!');
//       }
//     } catch (error) {
//       setMessage('Error claiming NFT');
//       console.error('Error claiming NFT:', error);
//     } finally {
//       setClaimLoading(false);
//     }
//   };

//   const fetchNFTData = async () => {
//     setNftLoading(true);
//     try {
//         const response = await axios.get(`http://localhost:5001/api/nft/nfts/${USER_ADDRESS}`);
//         const nftData = response.data;

//         if (nftData.length === 0) {
//             setMessage('No NFTs found');
//         } else {
//           setNfts(nftData); // store all nfts in state
//         }
//     } catch (error) {
//       console.error('Failed to fetch NFT data:', error);
//       setMessage('Failed to fetch NFT data');
//     } finally {
//       setNftLoading(false);
//     }
//   };

//   const fetchClaimStatus = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5001/api/nft/notifications`);
//       console.log('Claim status response:', response.data);
//       const notification = response.data.find(notification => notification.userId === "xb9LwCGT4tXLel6LSHSIR0Y648r1");
//       if (notification && notification.status === 'pending') {
//         setClaimInProgress(true);
//         setMessage('Your NFT claim request is in progress.');
//       }
//     } catch (error) {
//       console.error('Failed to fetch claim status:', error);
//     }
//   };

//   useEffect(() => {
//     fetchNFTData();
//   }, []);

//   const shouldShowClaimButton = () => {
//     return !claimInProgress && showClaimedButton.includes(donationCount);
//   };

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       {nftLoading ? (
//         <p>Loading your NFTs...</p>
//       ) : nfts.length > 0 ? (
//         <div>
//             <h2>Your NFTs</h2>
//             <div className="nft-card-container">
//             {nfts.map((nft, index) => (
//                 <div key={index} className="nft-card">
//                 <img src={testImage} alt="testImage" width="200" />
//                 {/* <p>Name: {nft.metadata.name}</p> */}
//                 {/* <p>Description: {nft.metadata.description}</p> */}
//                     <div className="nft-details">
//                         <p>Token ID: {nft.tokenId}</p>
//                     </div>
//                 </div>
//             ))}
//             </div>
//         </div>
//       ) : (
//         <p>{message}</p>
//       )}

//       {shouldShowClaimButton() && (
//         <button onClick={handleClaimNFT} disabled={claimLoading}>
//           Claim NFT
//         </button>
//       )}
//     </div>
//   );
// };

// export default UserDbTest;
