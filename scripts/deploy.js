// npx hardhat run --network rinkeby scripts/deploy.js
// npx hardhat verify --network rinkeby 0xb50D1dCdAae5bd9546f3F4eAb1FcF04C8613563b "1000000000000000000000000" "MRCH Token" "MRCH"

const hre = require("hardhat");
const dotenv = require('dotenv');
const fs = require('fs');
const envConfig = dotenv.parse(fs.readFileSync(`.env`));
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

async function main() {

    const TokenMRCH = await hre.ethers.getContractFactory("TokenMRCH");
    const tokenmrch = await TokenMRCH.deploy(
        process.env.MRCH_INITIALSUPPLY,
        process.env.MRCH_NAME,
        process.env.MRCH_SYMBOL
    );

    console.log(`TokenMRCH smart contract has been deployed to: ${tokenmrch.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
