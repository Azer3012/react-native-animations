import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import native from '../../helpers/native'
import { useNavigation } from '@react-navigation/native';

const Animations = () => {

const navigation=useNavigation()
    const data=[
        
        {id:native.uniqid(),name:'Scroll Item',route:'ScrollItem'},
        {id:native.uniqid(),name:'Scroll to Index',route:'ScrollToIndex'},
        {id:native.uniqid(),name:'Gallery',route:'Gallery'},
        {id:native.uniqid(),name:'StarRating',route:'StarRating'},
    ]
    const renderItem=({item})=>{
        return(
            <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate(item.route)}>
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
  return (
    <FlatList
    data={data}
    keyExtractor={item=>item.id}
    renderItem={renderItem}
    style={styles.container}
    
    />
  )
}

export default Animations

const styles = StyleSheet.create({
    container:{
        marginTop:native.px(25)
    },
    item:{
        backgroundColor:'blue',
        marginBottom:native.px(10),
        padding: native.px(10),
        marginHorizontal:native.px(16),
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontWeight:'400',
        color: 'white'
    }
})