require("@nomicfoundation/hardhat-toolbox");
const { mnemonic } = require("./secrets.json");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: mnemonic
      }
    },
  }
};
