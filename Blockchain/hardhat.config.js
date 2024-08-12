require("@nomicfoundation/hardhat-toolbox");
const { mnemonic } = require("./secrets-test.json");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY_ADMIN = process.env.PRIVATE_KEY_ADMIN;
console.log("RPC_URL:", RPC_URL);

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: mnemonic
      }
    },
    polygonAmoy: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY_ADMIN}`],
      chainId: 80002
      }
    }
};