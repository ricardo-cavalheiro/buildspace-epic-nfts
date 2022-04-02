import { createSignal, Show } from 'solid-js'
import { Flex, Button, Heading } from '@hope-ui/solid'

// components
import { ChainWarning } from './ChainWarning'
import { TransactionStatus } from '../components/TransactionStatus'
import { PendingTransaction } from '../components/TransactionStatus/PendingTransaction'

// hooks
import { useContract } from '../hooks/useContract'
import { useDisclosure } from '../hooks/useDisclosure'

// types
import type { ContractTransaction, ContractReceipt } from 'ethers'

function Main() {
  // signals
  const [isLoading, setIsLoading] = createSignal(false)
  const [isMetaMaskPopUpOpen, setIsMetaMaskPopUpOpen] = createSignal(false)
  const [userConfirmedTransaction, setUserConfirmedTransaction] =
    createSignal(false)
  const [initialTransaction, setInitialTransaction] =
    createSignal<ContractTransaction | null>(null)
  const [transactionConfirmation, setTransactionConfirmation] =
    createSignal<ContractReceipt | null>(null)

  // hooks
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { contract } = useContract({ name: 'EpicNFTs', onlyWithSigner: true })

  async function mintNFT() {
    try {
      onToggle()
      setIsLoading(true)
      setIsMetaMaskPopUpOpen(true)

      const transaction = await contract().functions.makeAnEpicNFT({
        gasLimit: 25_000,
      })
      setUserConfirmedTransaction(true)
      setInitialTransaction(transaction)

      const transactionConfirmation = await transaction.wait()

      setTransactionConfirmation(transactionConfirmation)
    } catch (err) {
      console.log({ err })

      onClose()
    } finally {
      setIsLoading(false)
      setIsMetaMaskPopUpOpen(false)
    }
  }

  function handleCloseModal() {
    // reset transaction status only when it's confirmed
    // this way we ensure that the txn status is kept even if the user
    // has closed the modal
    if (transactionConfirmation()?.confirmations > 0) {
      setInitialTransaction(null)
      setTransactionConfirmation(null)
      setIsLoading(false)
      setUserConfirmedTransaction(false)
    }

    onClose()
  }

  return (
    <Flex
      w='100%'
      p='20px'
      as='main'
      gap='20px'
      direction='column'
      alignItems='center'
      justifyContent='space-between'
    >
      <Flex direction='column' alignItems='center' gap='20px'>
        <Heading
          size='4xl'
          textAlign='center'
          w={{ '@sm': '290px', '@md': '500px', '@lg': '100%' }}
        >
          Each unique. Each beautiful. Discover your NFT today.
        </Heading>

        <Button w='300px' onClick={mintNFT} loading={isLoading()}>
          Mint NFT
        </Button>
      </Flex>

      <Button
        as='a'
        target='_blank'
        href='https://testnets.opensea.io/collection/squarenft-3lulssb1bw'
      >
        View collection on Open Sea
      </Button>

      <Show
        when={isOpen() === false && isMetaMaskPopUpOpen() === true}
        children={<PendingTransaction onToggle={onToggle} />}
        fallback={null}
      />

      <ChainWarning />

      <TransactionStatus
        isOpen={isOpen()}
        onToggle={handleCloseModal}
        initialTransaction={initialTransaction()}
        transactionConfirmation={transactionConfirmation()}
        userConfirmedTransaction={userConfirmedTransaction()}
      />
    </Flex>
  )
}

export { Main }
