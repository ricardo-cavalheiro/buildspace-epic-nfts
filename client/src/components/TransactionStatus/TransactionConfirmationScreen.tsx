import { Show } from 'solid-js'
import { Flex, Heading, Text, ModalBody } from '@hope-ui/solid'

// types
import type { PropsWithChildren } from 'solid-js'
import type { ContractReceipt } from 'ethers'

function TransactionConfirmationScreen(
  props?: PropsWithChildren<{ transaction: ContractReceipt }>
) {
  return (
    <ModalBody>
      <Show
        when={props.transaction.confirmations > 0}
        children={
          <Heading textAlign='center' size='3xl'>
            Transaction done
          </Heading>
        }
        fallback={
          <Heading textAlign='center' size='3xl'>
            Waiting for blockchain confirmation
          </Heading>
        }
      />

      <Flex
        direction='column'
        border='1px solid $blackAlpha2'
        p='10px'
        mt='20px'
      >
        <Text color='$blackAlpha5' mb='$2'>
          Transaction hash
        </Text>

        <Text
          as='a'
          target='_blank'
          fontWeight='bold'
          color='$blackAlpha6'
          href={`https://rinkeby.etherscan.io/tx/${props.transaction.transactionHash}`}
        >
          {props.transaction.transactionHash}
        </Text>
      </Flex>
    </ModalBody>
  )
}

export { TransactionConfirmationScreen }
