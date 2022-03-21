import { Alert, AlertIcon, Flex, Text, CloseButton } from '@hope-ui/solid'

function ChainWarning() {
  return (
    <Alert
      gap='10px'
      status='warning'
      textAlign='center'
      flexDirection='column'
      justifyContent='center'
    >
      <AlertIcon marginRight='0px' />
      <Text>Make sure you're connected to the Rinkeby TestNet</Text>
    </Alert>
  )
}

export { ChainWarning }
