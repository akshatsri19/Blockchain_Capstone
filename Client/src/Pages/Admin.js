import React, { useState } from "react";
import '../Styles/Admin.css';

const Admin= () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const [rewardRecipient, setRewardRecipient] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");

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
  };

  return (
    <div className="container">
        <h1>Admin Page</h1>
        <div className="card-container">
            <div className="card">
                <h2>Single Mint</h2>
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
                <h2>Batch Mint</h2>
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
                <h2>Transfer Tokens</h2>
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