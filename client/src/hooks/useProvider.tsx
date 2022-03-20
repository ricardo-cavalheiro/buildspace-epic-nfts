import { createSignal, createEffect } from "solid-js";
import { providers } from "ethers";

// hooks
import { useWeb3 } from "./web3";

// types
import type { PropsWithChildren } from "solid-js";

function useProvider(
  props: PropsWithChildren<{ onlyWithActiveWallet?: boolean }>
) {
  const [provider, setProvider] = createSignal();
  const [signer, setSigner] = createSignal();

  // hooks
  const { ethereum } = useWeb3();

  createEffect(() => {
    const provider = new providers.Web3Provider(ethereum());

    setProvider(provider);
  });

  return { provider, signer };
}

export { useProvider };
