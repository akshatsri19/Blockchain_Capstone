async function main() {
    // get the contract to deploy
    const contractFactory = await ethers.getContractFactory('TrustTokenWithRewardPool');
    console.log("Deploying TrustTokenWithRewardPool...");

    // deploy the contract
    const trustTokenWithRewardPool = await contractFactory.deploy();
    // target holds the address for ethers version 6 or higher
    console.log("TrustTokenWithRewardPool deployed to: ", trustTokenWithRewardPool.target); 
}

// using async/ await pattern to properly handle any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });