import { ethers } from "hardhat";

// ABI
import EpicNFTsABI from "../artifacts/contracts/EpicNFTs.sol/EpicNFTs.json";

const main = async () => {
  const [signer] = await ethers.getSigners();

  const contract = new ethers.Contract(
    "0xE96E8aE57725eE4d54fbc9C7507e228f43a75459",
    EpicNFTsABI.abi,
    signer
  );

  // Call the function.
  let txn = await contract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();

  // Mint another NFT for fun.
  txn = await contract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
