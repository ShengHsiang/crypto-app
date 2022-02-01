import React from 'react'
import { Text, Center } from 'native-base'
import ThemeToggle from '../components/theme-toggle'

export default function MainScreen() {
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <Text>Open up App.js to start working on your app!</Text>
      <ThemeToggle></ThemeToggle>
    </Center>
  )
}
