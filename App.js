import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import Stacks from './app/stacks/Stack'

export default function App() {
  return (
    <NavigationContainer>
      <Stacks/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})