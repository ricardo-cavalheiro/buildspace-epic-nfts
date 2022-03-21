import { Show } from 'solid-js'
import { Flex, Text, Spinner, Heading, ModalBody } from '@hope-ui/solid'

// types
import type { PropsWithChildren } from 'solid-js'
import type { ContractTransaction } from 'ethers'

function UserConfirmationScreen(
  props?: PropsWithChildren<{ initialTransaction: ContractTransaction }>
) {
  return (
    <ModalBody>
      <Heading textAlign='center' size='3xl'>
        Waiting for blockchain confirmation
      </Heading>

      <Flex
        direction='column'
        border='1px solid $blackAlpha2'
        p='10px'
        mt='20px'
      >
        <Text color='$blackAlpha5' mb='$2'>
          Transaction hash
        </Text>

        <Show
          when={props.initialTransaction}
          children={
            <Text
              as='a'
              target='_blank'
              fontWeight='bold'
              color='$blackAlpha6'
              href={`https://rinkeby.etherscan.io/tx/${props.initialTransaction.hash}`}
            >
              {props.initialTransaction.hash}
            </Text>
          }
          fallback={
            <Spinner
              thickness='2px'
              speed='0.65s'
              emptyColor='$neutral4'
              color='$info10'
              size='md'
            />
          }
        />
      </Flex>
    </ModalBody>
  )
}

export { UserConfirmationScreen }
