import {StyleSheet, Text, TouchableOpacity, View, Animated, Easing} from 'react-native';
import React, { useState } from 'react';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import native from '../../helpers/native';

const StarRating = () => {
  const numStars = 5;

  const [rating,setRating]=useState(4)
  const [animations] = useState(new Animated.Value(1));

  const giveRating=(star)=>{
    setRating(star)
  }

  const animate=()=>{
    Animated.timing(animations,{
        toValue:2,
        duration:480,
        easing:Easing.ease,
        useNativeDriver:true
    }).start(()=>{
        animations.setValue(1)
    })
  }

  const animateScale=animations.interpolate({
    inputRange:[1,1.5,2],
    outputRange:[1,1.4,1]
  })

  const animatedOpacity=animations.interpolate({
    inputRange:[1,1.2,2],
    outputRange:[1,0.5,1]
  })

  const animatedWobble=animations.interpolate({
    inputRange:[1,1.25,1.75,2],
    outputRange:["0deg","-3deg","3deg","0deg"]
  })

  const animationStyle={
    transform:[{scale:animateScale},{rotate:animatedWobble}],
    opacity:animatedOpacity
  }
  

  const data = [...Array(numStars).keys()].map((_, i) => {
    return {
      id: native.uniqid(),
      name: 'star',
    };
  });

  const Star = ({filled,index}) => {
    return (
        <TouchableOpacity  onPress={() => {
            giveRating(index)
            
            animate()
            }}>
        <Animated.View style={rating?animationStyle:""}>
          <StarIcon
            
            name={filled?"star":"star-o"}
            size={32}
            color={'gold'}
            style={{marginHorizontal: native.px(6)}}
          />
        </Animated.View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>

        
       {
       data.map((item,index)=>(
        <Star index={index} key={item.id} filled={index<=rating?true:false} />
       ))
       
       
       
       }
      </View>
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({});
