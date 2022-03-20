import { createSignal, createEffect, on } from 'solid-js'

// hooks
import { useProvider } from './useProvider'

// web3
import { config } from '../web3/config'

// types
import type { PropsWithChildren } from 'solid-js'
import type { EpicNFTs } from '../web3/typechain'

function useContract(
  props: PropsWithChildren<{ name: 'EpicNFTs'; onlyWithSigner?: boolean }>
) {
  const [contract, setContract] = createSignal<EpicNFTs>()

  // hooks
  const { provider, signer } = useProvider()

  createEffect(
    on(
      [provider, signer],
      async ([provider, signer]) => {
        if (props?.onlyWithSigner === true) {
          const contract = config.contractFactory[props.name](signer)

          setContract(contract)
        } else {
          const contract = config.contractFactory[props.name](provider)

          setContract(contract)
        }
      },
      { defer: true }
    )
  )

  return { contract }
}

export { useContract }
