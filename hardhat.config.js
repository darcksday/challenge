require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.14",
  networks: {

    localhost: {},

    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },


  },
  etherscan: {
    apiKey: "FIG2APYTSQI5Z9P5D4NW84CSHZN2PFEI6Y"
  },

  paths: {
    artifacts: "./smart_contract/artifacts",
    sources: "./smart_contract/contracts",
    cache: "./smart_contract/cache",
    tests: "./smart_contract/test"
  },
};
