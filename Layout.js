import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import native from './app/helpers/native'

const Layout = ({children,text}) => {
  return (
    <View>
        <View>
            <TouchableOpacity>
                <Image style={styles.image} source={require('./app/assets/images/left.png')}/>
            </TouchableOpacity>
            <Text>{text}</Text>
        </View>
      {children}
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
    image:{
        width: native.px(40),
        height: native.px(40)
    }
})