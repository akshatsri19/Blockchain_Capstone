require("@nomicfoundation/hardhat-toolbox");
const { mnemonic } = require("./secrets-test.json");

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
