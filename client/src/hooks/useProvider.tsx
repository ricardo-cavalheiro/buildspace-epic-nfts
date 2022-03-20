import { createSignal, createEffect } from 'solid-js'
import { providers } from 'ethers'

// hooks
import { useWeb3 } from './web3'

// types
import type { PropsWithChildren } from 'solid-js'
import type { Signer } from 'ethers'
import type { MetaMaskInpageProvider } from '@metamask/providers'
import type { Provider } from '@ethersproject/providers'

function useProvider(props?: PropsWithChildren<{}>) {
  const [provider, setProvider] = createSignal(
    window.ethereum as MetaMaskInpageProvider & Provider
  )
  const [signer, setSigner] = createSignal<Signer>()

  // hooks
  const { ethereum } = useWeb3()

  createEffect(() => {
    const provider = new providers.Web3Provider(ethereum())
    const signer = new providers.Web3Provider(ethereum()).getSigner()

    setSigner(signer)
    setProvider(provider)
  })

  return { provider, signer }
}

export { useProvider }
