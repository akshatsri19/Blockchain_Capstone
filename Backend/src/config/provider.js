const { JsonRpcProvider, Wallet } = require("ethers");

// Setup provider and wallet
const provider = new JsonRpcProvider("http://127.0.0.1:8545"); // Local network
const wallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider); // Private key of the deployer

module.exports = { provider, wallet };
