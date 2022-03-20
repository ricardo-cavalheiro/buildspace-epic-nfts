import { createSignal } from 'solid-js'

function useDisclosure() {
  const [isOpen, setIsOpen] = createSignal(false)

  function onToggle() {
    setIsOpen((prevValue) => !prevValue)
  }

  function onClose() {
    setIsOpen(false)
  }

  function onOpen() {
    setIsOpen(true)
  }

  return { isOpen, onToggle, onClose, onOpen }
}

export { useDisclosure }
