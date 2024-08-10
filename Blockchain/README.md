# Capstone

## Deploy contract locally for testing

`cd Blockchain`

`npx hardhat node`

Open a new terminal

`cd Blockhain`

`npx hardhat compile`

`npx hardhat run scripts/deploy.js --network localhost`

### Connect MetaMask to the Hardhat Node

Add the Hardhat Network to MetaMask:

- Open MetaMask.
- Click on the network dropdown and select "Add Network".
- Fill in the network details:
    ~~~
    Network Name: Hardhat

    New RPC URL: http://127.0.0.1:8545/

    Chain ID: 31337 or 1337 should work

    Currency Symbol: ETH (optional)

    Block Explorer URL: (leave this blank)
    ~~~

- Click "Save".

#### Import Accounts into MetaMask:

Since MetaMask can derive accounts from a mnemonic, you can import the accounts automatically:

- Open MetaMask.
- Click on the account icon at the top right and select Import Account.
- Select the "Import using Secret Recovery Phrase" option.
- Enter your mnemonic (e.g., test test test test test test test test test test test test).
- MetaMask will automatically import the accounts derived from this mnemonic.

or you can import the first 3-5 accounts for testing in metamask manually.

### Smart contract address deployed on local blockchain
TrustToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3 

TrustTokenWithRewardPool deployed to:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

