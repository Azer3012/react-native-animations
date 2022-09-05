import {Animated, FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useRef } from 'react';
import native from '../../helpers/native';

const ScrollItem = () => {
  const data = [...Array(30).keys()].map((_, i) => {
    return {
      id: native.uniqid(),
      image: `https://i.pravatar.cc/150?img=${parseInt(Math.random() * 10)}`,
      name: 'Jhon Doe',
      jobTitle: 'Developer',
      email: 'jhondoe@gmail.com',
    };
  });

  const scrollY=useRef(new Animated.Value(0)).current

 const itemSize=130

  return (
    <View style={styles.container}>
        <Image style={StyleSheet.absoluteFill} source={require('../../assets/images/bg.jpg')}/>
      <Animated.FlatList
      onScroll={Animated.event(
        [{nativeEvent:{contentOffset:{y:scrollY}}}],
        {nativeDriver:true}
      )}
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index}) => {
            const inputRange=[
                -1,
                0,
                itemSize*index,
                itemSize*(index+2)
            ]
            const opacityInputRange=[
                -1,
                0,
                itemSize*index,
                itemSize*(index+.5)
            ]
            const scale=scrollY.interpolate({
                inputRange,
                outputRange:[1,1,1,0]
            })
            const opacity=scrollY.interpolate({
                inputRange:opacityInputRange,
                outputRange:[1,1,1,0]
            })
          return(
           <Animated.View style={[styles.item,{transform:[{scale}],opacity}]}>
                <Image style={styles.image} source={{uri:item.image}}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>
           </Animated.View>
          )
        }}
      />
    </View>
  );
};

export default ScrollItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle:{
    padding: native.px(20),
    paddingTop:StatusBar.currentHeight || native.px(42)
  },
  item:{
    flexDirection:'row',
    padding: native.px(20),
    margin: native.px(20),
    borderRadius:native.px(12),
    backgroundColor:'rgba(255,255,255,0.9)',
    shadowColor:'#000',
    shadowOffset:{
        width: 0,
        height: native.px(10)
    },
    shadowOpacity:0.3,
    shadowRadius:native.px(20)

  },
  image:{
    width: native.px(70),
    height: native.px(70),
    borderRadius:native.px(50),
    marginRight:native.px(10)

  },
  info:{},
  name:{
    fontSize:native.px(22),
    fontWeight:'700'
  },
  jobTitle:{
    fontSize:native.px(18),
    opacity: .7
  },
  email:{
    fontSize:native.px(16),
    opacity: .8,
    color: '#0009cc'
  }

});
