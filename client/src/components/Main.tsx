import { createSignal } from 'solid-js'
import { Flex, Button, Heading } from '@hope-ui/solid'

// components
import { TransactionStatus } from '../components/TransactionStatus'

// hooks
import { useWeb3 } from '../hooks/web3'
import { useContract } from '../hooks/useContract'
import { useDisclosure } from '../hooks/useDisclosure'

// web3
import { config } from '../web3/config'

// types
import type { PropsWithChildren } from 'solid-js'
import type { ContractTransaction } from 'ethers'

function Main(props: PropsWithChildren) {
  // signals
  const [isLoading, setIsLoading] = createSignal(false)
  const [transaction, setTransaction] = createSignal({} as ContractTransaction)

  // hooks
  const { toggleIsActive, userWallet } = useWeb3()
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { contract } = useContract({ name: 'EpicNFTs', onlyWithSigner: true })

  async function mintNFT() {
    try {
      onToggle()
      setIsLoading(true)

      const transaction = await contract().functions.makeAnEpicNFT()

      setTransaction(transaction)
    } catch (err) {
      console.log({ err })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex
      as='main'
      direction='column'
      justifyContent='space-between'
      alignItems='center'
      gap='20px'
      w='100%'
    >
      <Flex direction='column' alignItems='center' gap='20px'>
        <Heading size='4xl'>
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
        View collection
      </Button>

      <TransactionStatus
        isOpen={isOpen()}
        onToggle={onToggle}
        transaction={transaction()}
      />
    </Flex>
  )
}

export { Main }
