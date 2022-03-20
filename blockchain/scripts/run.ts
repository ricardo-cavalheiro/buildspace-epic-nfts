import { ethers } from "hardhat";

// ABI
import EpicNFTsABI from "../artifacts/contracts/MyEpicNFT.sol/MyEpicNFT.json";

const main = async () => {
  // const nftContractFactory = await ethers.getContractFactory("MyEpicNFT");
  // const nftContract = await nftContractFactory.deploy();

  // await nftContract.deployed();

  const [signer] = await ethers.getSigners();

  const contract = new ethers.Contract(
    "0xE96E8aE57725eE4d54fbc9C7507e228f43a75459",
    EpicNFTsABI.abi,
    signer
  );

  console.log("Contract deployed to:", contract.address);
  console.log("signer", signer.address);

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
