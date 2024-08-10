const express = require("express");
const { JsonRpcProvider, Contract, parseUnits, Wallet, formatUnits } = require("ethers"); // Direct import for parseUnits
const cors = require("cors");
const app = express();
const port = 5001;

const TrustTokenABI = require("../Blockchain/artifacts/contracts/TrustTokenWithRewardPool.sol/TrustTokenWithRewardPool.json").abi;
const provider = new JsonRpcProvider("http://127.0.0.1:8545");
// TODO: Update it to get connected wallet address
const wallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider); // use first account by hardhat 
const trustTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const trustTokenContract = new Contract(trustTokenAddress, TrustTokenABI, wallet);

app.use(express.json());
app.use(cors());

app.post("/api/mint", async (req, res) => {
  const { recipient, amount } = req.body;
  try {
    const tx = await trustTokenContract.mint(recipient, parseUnits(amount, 18));
    await tx.wait();
    res.json({ message: "Minting successful", tx });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Minting failed", error });
  }
});

app.post("/api/batch-mint", async (req, res) => {
  const { recipients, amounts } = req.body;
  try {
    const amountsInWei = amounts.map(amount => parseUnits(amount, 18));
    const tx = await trustTokenContract.batchMint(recipients, amountsInWei);
    await tx.wait();
    res.json({ message: "Batch minting successful", tx });
  } catch (error) {
    res.status(500).json({ message: "Batch minting failed", error });
  }
});

app.post("/api/reward", async (req, res) => {
  const { recipient, amount } = req.body;
  try {
    const tx = await trustTokenContract.reward(recipient, parseUnits(amount, 18));
    await tx.wait();
    res.json({ message: "Reward transfer successful", tx });
  } catch (error) {
    res.status(500).json({ message: "Reward transfer failed", error });
  }
});

app.get("/api/rewardpool-balance", async (req, res) => {
    try {
        const balance = await trustTokenContract.balanceOf(trustTokenAddress);
        res.json({ balance: formatUnits(balance, 18) });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reward pool balance", error });
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
