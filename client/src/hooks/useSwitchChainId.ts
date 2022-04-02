// hooks
import { useWeb3 } from '../hooks/web3'

// utils
import { currentEnv } from '../utils/currentEnv'

function useSwitchChainId() {
  // hooks
  const { ethereum } = useWeb3()

  async function switchChainId() {
    try {
      ethereum().request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: currentEnv === 'development' ? '0x7A69' : '0x4' }],
      })
    } catch (err) {
      console.log({ err })
    }
  }

  return { switchChainId }
}

export { useSwitchChainId }
