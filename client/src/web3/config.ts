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
        '0x4Aa98f666EFfD892458C21Fc66dc08325Af9b32a',
        signerOrProvider
      )
    },
  },
}
const devConfig = {
  smartContractAddresses: {
    EpicNFTs: '0x5a4db5726CBbe9276dDc95F7898511e6095873F4',
  },
  supportedChainsID: [1337, 31337],
  url: 'http://localhost:8545',
  ...common,
}
const prodConfig = {
  smartContractAddresses: {
    EpicNFTs: '0x4Aa98f666EFfD892458C21Fc66dc08325Af9b32a',
  },
  supportedChainsID: [4],
  url: '',
  ...common,
}

const config = currentEnv === 'development' ? devConfig : prodConfig

export { config }
