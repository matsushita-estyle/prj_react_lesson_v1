import { useState } from 'react'

export const useSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openSideMenu = () => setIsOpen(true)
  const closeSideMenu = () => setIsOpen(false)
  const toggleSideMenu = () => setIsOpen(!isOpen)

  return {
    isOpen,
    openSideMenu,
    closeSideMenu,
    toggleSideMenu,
  }
}