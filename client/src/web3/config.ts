import EpicNFTsABI from './ABIs/EpicNFTs.json'
import { EpicNFTs__factory } from './typechain'

// utils
import { currentEnv } from '../utils/currentEnv'

// types
import type { Signer } from 'ethers'
import type { Provider } from '@ethersproject/providers'

const common = {
  abi: {
    EpicNFTs: EpicNFTsABI,
  },
  contractFactory: {
    EpicNFTs: (signerOrProvider: Signer | Provider) => {
      return EpicNFTs__factory.connect(
        import.meta.env.VITE_EPIC_NFTS_SMART_CONTRACT_ADDRESS,
        signerOrProvider
      )
    },
  },
}
const devConfig = {
  smartContractAddresses: {
    EpicNFTs: import.meta.env.VITE_EPIC_NFTS_SMART_CONTRACT_ADDRESS,
  },
  supportedChainsID: [1337, 31337],
  url: 'http://localhost:8545',
  ...common,
}
const prodConfig = {
  smartContractAddresses: {
    EpicNFTs: import.meta.env.VITE_EPIC_NFTS_SMART_CONTRACT_ADDRESS,
  },
  supportedChainsID: [4],
  url: 'https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  ...common,
}

const config = currentEnv === 'development' ? devConfig : prodConfig

export { config }
