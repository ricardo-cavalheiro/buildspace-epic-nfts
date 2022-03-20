import { createSignal, Show } from 'solid-js'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Flex,
  Heading,
  Button,
  Spinner,
} from '@hope-ui/solid'

// types
import type { PropsWithChildren } from 'solid-js'
import type { ContractTransaction } from 'ethers'

function TransactionStatus(
  props?: PropsWithChildren<{
    isOpen: boolean
    onToggle: () => void
    transaction: ContractTransaction
  }>
) {
  return (
    <Modal opened={props.isOpen} onClose={props.onToggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Heading textAlign='center' size='3xl'>
            Waiting confirmation
          </Heading>

          <Flex
            direction='column'
            border='1px solid $blackAlpha2'
            p='10px'
            mt='20px'
          >
            <Text color='$blackAlpha5' mb='$2'>
              Transaction hash{' '}
            </Text>
            <Show
              when={props.transaction.hash}
              fallback={
                <Spinner
                  thickness='2px'
                  speed='0.65s'
                  emptyColor='$neutral4'
                  color='$info10'
                  size='md'
                />
              }
            >
              <Text
                as='a'
                target='_blank'
                fontWeight='bold'
                color='$blackAlpha6'
                href={`https://rinkeby.etherscan.io/tx/${props.transaction.hash}`}
              >
                {props.transaction.hash}
              </Text>
            </Show>
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent='center'>
          <Button onClick={props.onToggle}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { TransactionStatus }
