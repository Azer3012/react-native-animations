import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {API_KEY} from '../../config/config';
import native from '../../helpers/native';

const Gallery = () => {
  const API_URL = 'https://api.pexels.com/v1/search?query=nature';

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [activeIndex, setActiveIndex] = useState(0);

  const [images, setImages] = useState();

  const topRef = useRef();
  const bottomRef = useRef();

  const fetchImagesFromPexels = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: API_KEY,
        },
      });

      setImages(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    //scroll flatlist
    topRef?.current.scrollToOffset({
      offset:index*width,
      animated:true
    })
    if(index*(80+10)-40 >width/2){
      bottomRef?.current.scrollToOffset({
        offset:index*(80+10)-width/2+40,
        animated:true
      })
    }
    else{
      bottomRef?.current.scrollToOffset({
        offset:0,
        animated:true
      })
    }
  };

  useEffect(() => {
    fetchImagesFromPexels();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          scrollToActiveIndex(
            Math.floor(e.nativeEvent.contentOffset.x / width),
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View style={{width, height}}>
              <Image
                style={[StyleSheet.absoluteFillObject]}
                source={{uri: item.src.portrait}}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={bottomRef}
        data={images}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          position: 'absolute',
          bottom: native.px(80),
          
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
            onPress={()=>scrollToActiveIndex(index)}
            
            >
              <Image
                style={{
                  width: native.px(80),
                  height: native.px(80),
                  borderRadius: native.px(12),
                  borderWidth: 1,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                  marginRight: native.px(10),
                }}
                source={{uri: item.src.portrait}}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({});
