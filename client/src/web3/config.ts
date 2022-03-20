import EpicNFTsABI from "./ABIs/EpicNFTs.json";
import { EpicNFTs__factory } from "./typechain";

// utils
import { currentEnv } from "../utils/currentEnv";

// types
import type { Signer } from "ethers";

const common = {
  abi: {
    EpicNFTs: EpicNFTsABI,
  },
  contractFactory: {
    EpicNFTs: (signer: Signer) => EpicNFTs__factory.connect("", signer),
  },
};
const devConfig = {
  smartContractAddresses: {
    EpicNFTs: "",
  },
  supportedChainsID: [1337, 31337],
  url: "http://localhost:8545",
  ...common,
};
const prodConfig = {
  smartContractAddresses: {
    EpicNFTs: "",
  },
  supportedChainsID: [4],
  url: "",
  ...common,
};

const config = currentEnv === "development" ? devConfig : prodConfig;

export { config };
