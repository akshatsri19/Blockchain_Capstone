const { JsonRpcProvider, Wallet } = require("ethers");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
// Setup provider and wallet
const provider = new JsonRpcProvider(RPC_URL); // Local network
const PRIVATE_KEY_ADMIN = process.env.PRIVATE_KEY_ADMIN;
const wallet = new Wallet(`0x${PRIVATE_KEY_ADMIN}`, provider); // Private key of the deployer

// deployed contract addresses
const trustTokenAddress = process.env.TOKEN_CONTRACT_ADDRESS;
const trustNFTAddress = process.env.NFT_CONTRACT_ADDRESS;

module.exports = { provider, wallet, trustTokenAddress, trustNFTAddress };