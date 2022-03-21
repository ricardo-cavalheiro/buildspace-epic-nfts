// hooks
import { useWeb3 } from '../hooks/web3'

function useSwitchChainId() {
  // hooks
  const { ethereum } = useWeb3()

  async function switchChainId() {
    try {
      ethereum().request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      })
    } catch (err) {
      console.log({ err })
    }
  }

  return { switchChainId }
}

export { useSwitchChainId }
