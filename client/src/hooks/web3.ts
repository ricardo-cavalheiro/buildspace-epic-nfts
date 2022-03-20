import { useContext } from "solid-js";

// contexts
import { Web3Context } from "../contexts/web3";

function useWeb3() {
  return useContext(Web3Context);
}

export { useWeb3 };
