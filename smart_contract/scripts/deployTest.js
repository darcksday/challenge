// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { saveFrontendFiles } = require('./utils');
const { WrapperBuilder } = require("@redstone-finance/evm-connector");
const sdk = require("redstone-sdk");
const { convertStringToBytes32 } = require("redstone-protocol/dist/src/common/utils");


async function main() {
  // Hardhat always runs to compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Test = await hre.ethers.getContractFactory("Test");
  const test = await Test.deploy();
  // await test.deployed();



    const unsignedMetadata = "manual-payload";
    const redstonePayload = await sdk.requestRedstonePayload(
      {
        dataServiceId: "redstone-main-demo",
        uniqueSignersCount: 1,
        dataFeeds: ["STX"],
      },
      ["https://d33trozg86ya9x.cloudfront.net"],
      unsignedMetadata
    );

    // Interact with the contract (getting oracle value securely)
    const stxPrice = await test.getLatestPrice(
      `0x${redstonePayload}`,
      convertStringToBytes32("STX")
    );
    console.log({ stxPrice });

  saveFrontendFiles(test, "Test");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
