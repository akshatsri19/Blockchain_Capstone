async function main() {
    // deploy Utility Token contract
    const tokenContractFactory = await ethers.getContractFactory('TrustTokenWithRewardPool');
    console.log("Deploying TrustTokenWithRewardPool...");
    const trustTokenWithRewardPool = await tokenContractFactory.deploy();
    // target holds the contarct address for ethers version 6 or higher
    console.log("TrustTokenWithRewardPool deployed to: ", trustTokenWithRewardPool.target); 

    // deploy NFT contract
    const nftContractFactory = await ethers.getContractFactory('TrustNFT');
    console.log("Deploying TrustNFT...");
    const trustNFT = await nftContractFactory.deploy();
    console.log("TrustNFT deployed to: ", trustNFT.target);
}

// using async/ await pattern to properly handle any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });