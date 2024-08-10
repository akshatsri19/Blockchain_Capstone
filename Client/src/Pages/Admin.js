import React, { useState, useEffect } from "react";
import '../Styles/Admin.css';

const Admin= () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const [rewardRecipient, setRewardRecipient] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [rewardPoolBalance, setRewardPoolBalance] = useState("");
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [notifications, setNotifications] = useState([]); // State for NFT notifications

  const handleSingleMint = async () => {
    const response = await fetch("http://localhost:5001/api/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipient, amount })
    });

    const data = await response.json();
    console.log(data.message);
  };

  const handleBatchMint = async () => {
    const recipientsArray = recipients.split(",").map(addr => addr.trim());
    const amountsArray = amounts.split(",").map(amount => amount.trim());

    const response = await fetch("http://localhost:5001/api/batch-mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipients: recipientsArray, amounts: amountsArray })
    });

    const data = await response.json();
    console.log(data.message);
  };

  const handleTransferReward = async () => {
    const response = await fetch("http://localhost:5001/api/reward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipient: rewardRecipient, amount: rewardAmount })
    });

    const data = await response.json();
    console.log(data.message);
    fetchRewardPoolBalance();
  };

  const fetchRewardPoolBalance = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/rewardpool-balance");
      const data = await response.json();
      setRewardPoolBalance(data.balance);
    } catch (error) {
      console.error("Failed to fetch reward pool balance", error);
    } finally {
      setLoadingBalance(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/nft/notifications");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleMintNFT = async (notificationId) => {
    try {
      const response = await fetch("http://localhost:5001/api/nft/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ notificationId })
      });

      const data = await response.json();
      console.log(data.message);
      fetchNotifications(); // Refresh notifications after minting`
    } catch (error) {
      console.error("Failed to mint NFT", error);
    }
  }

  useEffect(() => {
    fetchRewardPoolBalance();
    fetchNotifications(); // Fetch notifications on component mount
  }, []);

  return (
    <div className="container">
        <h1>Admin Page</h1>
        <div className="card-container">
            <div className="card">
                <h2>Reward Pool Balance</h2>
                {loadingBalance ? (
                    <p>Loading...</p>
                ) : (
                    <p>{rewardPoolBalance} TRUST</p>
                )}
            </div>

            <div className="card">
                <h2>Pending NFT Claims</h2>
                <ul>
                  {notifications.map(notification => (
                    <li key={notification.id}>
                      <p>Recipient: {notification.recipient}</p>
                      <button onClick={() => handleMintNFT(notification.id)}>Mint NFT</button>
                    </li>
                  ))}
                </ul>
            </div>

            <div className="card">
                <h2>Mint to Recipient</h2>
                <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleSingleMint}>Mint Tokens</button>
            </div>

            <div className="card">
                <h2>Batch Mint for Airdrops</h2>
                <textarea
                placeholder="Recipient Addresses (comma-separated)"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                />
                <textarea
                placeholder="Amounts (comma-separated)"
                value={amounts}
                onChange={(e) => setAmounts(e.target.value)}
                />
                <button onClick={handleBatchMint}>Batch Mint Tokens</button>
            </div>

            <div className="card">
                <h2>Transfer Tokens from Reward Pool</h2>
                <input
                type="text"
                placeholder="Reward Recipient Address"
                value={rewardRecipient}
                onChange={(e) => setRewardRecipient(e.target.value)}
                />
                <input
                type="text"
                placeholder="Reward Amount"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
                />
                <button onClick={handleTransferReward}>Transfer Tokens</button>
            </div>
        </div>
    </div>
  );
};

export default Admin;