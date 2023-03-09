var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// smart_contract/scripts/newTest.ts
import { Web3Function } from "@gelatonetwork/web3-functions-sdk";
import sdk from "redstone-sdk";
import { convertStringToBytes32 } from "redstone-protocol/dist/src/common/utils";
var hre = __require("hardhat");
Web3Function.onRun(async (context) => {
  const { userArgs, gelatoArgs, provider } = context;
  const contract = await hre.ethers.getContractAt("PriceChallenge", "0xE8EDC021aDceA8aDd62e792Af695731857e6F47b");
  const unsignedMetadata = "manual-payload";
  const redstonePayload = await sdk.requestRedstonePayload(
    {
      dataServiceId: "redstone-main-demo",
      uniqueSignersCount: 1,
      dataFeeds: ["BTC"]
    },
    ["https://d33trozg86ya9x.cloudfront.net"],
    unsignedMetadata
  );
  const btcbytes = convertStringToBytes32("BTC");
  return {
    canExec: true,
    callData: contract.interface.encodeFunctionData("getLatestPrice", [redstonePayload, btcbytes])
  };
});
