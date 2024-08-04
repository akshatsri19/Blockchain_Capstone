const express = require("express");
const { JsonRpcProvider, Contract, parseUnits } = require("ethers"); // Direct import for parseUnits
const cors = require("cors");
const app = express();
const port = 5001;

const TrustTokenABI = require("../Blockchain/artifacts/contracts/TrustTokenWithRewardPool.sol/TrustTokenWithRewardPool.json").abi;
const provider = new JsonRpcProvider("http://127.0.0.1:8545");
// TODO: Update it to get connected wallet address
const wallet = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // use first account by hardhat 
const trustTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
