import { createSignal, createEffect } from "solid-js";

// hooks
import { useProvider } from "./useProvider";

// web3
import { config } from "../web3/config";

// types
import type { PropsWithChildren } from "solid-js";
import type { EpicNFTs } from "../web3/typechain";

function useContract(props: PropsWithChildren<{ name: "EpicNFTs" }>) {
  const [contract, setContract] = createSignal<EpicNFTs>();

  // hooks
  const { provider } = useProvider();

  createEffect(() => {
    const contract = config.contractFactory["EpicNFTs"]();

    console.log("provider", provider());
  });

  return { contract };
}

export { useContract };
