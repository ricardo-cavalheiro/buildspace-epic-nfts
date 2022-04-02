import { createSignal, createEffect, createContext, onMount } from 'solid-js'
import detectEthereumProvider from '@metamask/detect-provider'

// types
import type { Accessor, PropsWithChildren } from 'solid-js'
import type { MetaMaskInpageProvider } from '@metamask/providers'

type Web3Context = {
  ethereum: Accessor<MetaMaskInpageProvider>
  userWallet: Accessor<string>
  toggleIsActive: () => boolean
  connectWallet: () => Promise<string>
  disconnectWallet: () => void
  chainId: Accessor<string>
}

const Web3Context = createContext<Web3Context>({} as Web3Context)

function Web3Provider(props?: PropsWithChildren<{}>) {
  const [ethereum, setEthereum] = createSignal(
    window.ethereum as MetaMaskInpageProvider
  )
  const [userWallet, setUserWallet] = createSignal('')
  const [chainId, setChainId] = createSignal('')

  // set up ethereum provider on context mount
  onMount(async () => {
    const provider = (await detectEthereumProvider({
      mustBeMetaMask: true,
    })) as MetaMaskInpageProvider

    setEthereum(provider)
  })

  // updates the user wallet on context mount
  onMount(() => {
    const selectedAddress = ethereum().selectedAddress

    if (selectedAddress) {
      setUserWallet(selectedAddress)
    }
  })

  onMount(() => {
    setChainId(ethereum().chainId)
  })

  // watch for wallet change events triggered by the user
  createEffect(() => {
    function listener(...accounts: unknown[]) {
      if (accounts.length) {
        setUserWallet(accounts[0] as string)

        return
      }

      disconnectWallet()
    }

    ethereum().on('accountsChanged', listener)
  })

  createEffect(() => {
    function listener(...chainId: unknown[]) {
      window.location.reload()
    }

    ethereum().on('chainChanged', listener)
  })

  function toggleIsActive() {
    return userWallet().length ? true : false
  }

  async function connectWallet() {
    try {
      if (userWallet()) {
        return userWallet()
      }

      const accounts = await ethereum().request<string[]>({
        method: 'eth_requestAccounts',
      })

      if (accounts?.[0]) {
        setUserWallet(accounts[0])

        return accounts[0]
      }

      throw new Error('Wallet could not be connected.')
    } catch (err) {
      const error = err as Error
      console.log({ error })

      return error.message
    }
  }

  function disconnectWallet() {
    setUserWallet('')
  }

  const store = {
    ethereum,
    userWallet,
    connectWallet,
    disconnectWallet,
    toggleIsActive,
    chainId,
  }

  return (
    <Web3Context.Provider value={store}>{props.children}</Web3Context.Provider>
  )
}

export { Web3Context, Web3Provider }
