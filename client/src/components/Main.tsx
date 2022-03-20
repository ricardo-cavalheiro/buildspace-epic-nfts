import { Flex, Button, Heading } from "@hope-ui/solid";

// hooks
import { useWeb3 } from "../hooks/web3";

// web3
import EpicNFTsABI from "../web3/ABIs/EpicNFTs.json";

// hooks
import { useContract } from "../hooks/useContract";

// types
import type { PropsWithChildren } from "solid-js";

function Main(props: PropsWithChildren) {
  // hooks
  const { toggleIsActive } = useWeb3();
  const { contract } = useContract({ name: "EpicNFTs" });

  console.log(contract());
  async function MintNFT() {}

  return (
    <Flex as="main" direction="column" alignItems="center" gap="20px">
      <Heading size="4xl">
        Each unique. Each beautiful. Discover your NFT today.
      </Heading>

      <Button w="300px">Mint NFT</Button>
    </Flex>
  );
}

export { Main };
