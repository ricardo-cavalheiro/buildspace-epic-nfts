import {} from 'solid-js'
import { Flex, Text, Alert, AlertIcon, Button } from '@hope-ui/solid'

// types
import type { PropsWithChildren } from 'solid-js'

function PendingTransaction(
  props?: PropsWithChildren<{ onToggle: () => void }>
) {
  return (
    <Flex>
      <Alert status='info' flexDirection='column' textAlign='center' gap='10px'>
        <AlertIcon />
        <Text>You still have a pending transaction, check your MetaMask</Text>
        <Button onClick={props.onToggle}>Back to transaction status</Button>
      </Alert>
    </Flex>
  )
}

export { PendingTransaction }
