import { Switch, Match } from 'solid-js'
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Button,
  Heading,
} from '@hope-ui/solid'

// components
import { UserConfirmationScreen } from './UserConfirmationScreen'
import { TransactionConfirmationScreen } from './TransactionConfirmationScreen'

// types
import type { PropsWithChildren } from 'solid-js'
import type { ContractTransaction, ContractReceipt } from 'ethers'

function TransactionStatus(
  props?: PropsWithChildren<{
    isOpen: boolean
    onToggle: () => void
    initialTransaction: ContractTransaction
    transactionConfirmation: ContractReceipt
    userConfirmedTransaction: boolean
  }>
) {
  return (
    <Modal opened={props.isOpen} onClose={props.onToggle}>
      <ModalOverlay />
      <ModalContent>
        <Switch
          fallback={
            <Heading textAlign='center' size='3xl' p='20px'>
              Waiting for your confirmation
            </Heading>
          }
          children={
            <>
              <Match
                when={props.transactionConfirmation}
                children={
                  <TransactionConfirmationScreen
                    transaction={props.transactionConfirmation}
                  />
                }
              />

              <Match
                when={props.userConfirmedTransaction}
                children={
                  <UserConfirmationScreen
                    initialTransaction={props.initialTransaction}
                  />
                }
              />
            </>
          }
        />

        <ModalFooter justifyContent='center'>
          <Button onClick={props.onToggle}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { TransactionStatus }
