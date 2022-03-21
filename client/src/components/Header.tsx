import { Show } from 'solid-js'
import { Flex, Box, Text, Button } from '@hope-ui/solid'

// hooks
import { useWeb3 } from '../hooks/web3'

// types
import type { Component } from 'solid-js'

const Header: Component = () => {
  // hooks
  const { userWallet, connectWallet, disconnectWallet } = useWeb3()

  function formattedUserWallet() {
    const userWalletAddress = userWallet()

    const userWalletFirstPart = userWalletAddress.slice(0, 6)
    const userWalletSecondPart = userWalletAddress.slice(38)

    if (!userWalletFirstPart || !userWalletSecondPart) {
      return ''
    }

    return `${userWalletFirstPart} ... ${userWalletSecondPart}`
  }

  return (
    <Flex
      p='20px'
      w='100%'
      as='header'
      alignItems='center'
      justifyContent='space-between'
      borderBottom='1px solid $blackAlpha2'
    >
      <Box></Box>

      <Flex
        alignItems='center'
        justifyContent='center'
        gap='20px'
        wrap='wrap-reverse'
      >
        <Text
          px='10px'
          cursor='pointer'
          borderRadius='$lg'
          color='$blackAlpha8'
          fontWeight='$medium'
          bgColor='#4a5568a6'
          transition='ease 200ms'
          _hover={{
            bgColor: '$blackAlpha2',
          }}
        >
          {formattedUserWallet()}
        </Text>

        <Show
          when={userWallet()}
          fallback={<Button onClick={connectWallet}>connect wallet</Button>}
          children={
            <Button onClick={disconnectWallet}>disconnect wallet</Button>
          }
        />
      </Flex>
    </Flex>
  )
}

export { Header }
