import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Animations, Gallery, ScrollItem, ScrollToIndex, StarRating } from '../screeens'
import SplashScreen from 'react-native-splash-screen'

const Stack=createNativeStackNavigator()
export default function Stacks() {

  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
         <Stack.Screen name="Animations" component={Animations}/>
        <Stack.Screen name="ScrollItem" component={ScrollItem}/>
        <Stack.Screen name="ScrollToIndex" component={ScrollToIndex}/>
        <Stack.Screen name="Gallery" component={Gallery}/>
        <Stack.Screen name="StarRating" component={StarRating}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})