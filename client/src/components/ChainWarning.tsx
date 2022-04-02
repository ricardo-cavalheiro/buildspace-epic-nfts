import { Alert as HAlert, AlertIcon, Text, Button } from '@hope-ui/solid'
import { createEffect } from 'solid-js'

// hooks
import { useWeb3 } from '../hooks/web3'
import { useSwitchChainId } from '../hooks/useSwitchChainId'

// utils
import { currentEnv } from '../utils/currentEnv'

// types
import type { PropsWithChildren } from 'solid-js'

function Alert(
  props: PropsWithChildren<{ chainId: string; networkName: string }>
) {
  // hooks
  const { switchChainId } = useSwitchChainId()

  return (
    <HAlert
      gap='10px'
      status='warning'
      textAlign='center'
      flexDirection='column'
      justifyContent='center'
    >
      <AlertIcon marginRight='0px' />
      <Text>
        You appear to be connected to a different chain ID than{' '}
        {props.networkName}
      </Text>

      <Button w='200px' colorScheme='warning' onClick={switchChainId}>
        Change network
      </Button>
    </HAlert>
  )
}

function ChainWarning() {
  // hooks
  const { ethereum } = useWeb3()

  if (currentEnv === 'development' && ethereum().chainId !== '0x7a69') {
    return <Alert chainId={ethereum().chainId} networkName='HardHat' />
  } else if (currentEnv === 'production' && ethereum().chainId !== '0x4') {
    return <Alert chainId={ethereum().chainId} networkName='Rinkeby' />
  } else {
    return null
  }
}

export { ChainWarning }
