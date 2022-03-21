import { Alert, AlertIcon, Text, Button } from '@hope-ui/solid'

// hooks
import { useSwitchChainId } from '../hooks/useSwitchChainId'

function ChainWarning() {
  // hooks
  const { switchChainId } = useSwitchChainId()

  return (
    <Alert
      gap='10px'
      status='warning'
      textAlign='center'
      flexDirection='column'
      justifyContent='center'
    >
      <AlertIcon marginRight='0px' />
      <Text>
        You appear to be connected to a different chain ID than Rinkeby
      </Text>

      <Button w='200px' colorScheme='warning' onClick={switchChainId}>
        Change network
      </Button>
    </Alert>
  )
}

export { ChainWarning }
