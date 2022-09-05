import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import native from '../../helpers/native';

const colors = {
  active: '#FCD259ff',
  inActive: '#FCD25900',
};
const spacing = 10;

const ScrollToIndex = () => {
  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  const data = [...Array(10).keys()].map((_, i) => {
    return {
      id: native.uniqid(),
      name: 'Item',
    };
  });

  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition,
      viewOffset: spacing,
    });
  }, [index, viewPosition]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        initialScrollIndex={index}
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingLeft: spacing}}
        horizontal
        style={{flexGrow: 0}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index: fIndex}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIndex(fIndex);
              }}>
              <View
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      fIndex === index ? colors.active : colors.inActive,
                  },
                ]}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.positionsAndNavigation}>
        <View>
          <Text>Positions</Text>
          <View style={styles.positions}>
            <TouchableOpacity
              style={styles.indicators}
              onPress={() => setViewPosition(0)}>
              <Text style={styles.indicatorsText}>start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.indicators}
              onPress={() => setViewPosition(0.5)}>
              <Text style={styles.indicatorsText}>middle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.indicators}
              onPress={() => setViewPosition(1)}>
              <Text style={styles.indicatorsText}>finish</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>Navigations</Text>
          <View style={styles.navigations}>
            <TouchableOpacity
              style={styles.indicators}
              onPress={() => {
                if (index === 0) {
                  return;
                }
                setIndex(index - 1);
              }}>
              <Text style={styles.indicatorsText}>prev</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.indicators}
              onPress={() => {
                if (index === data.length - 1) {
                  return;
                }
                setIndex(index + 1);
              }}>
              <Text style={styles.indicatorsText}>next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScrollToIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    borderRadius: native.px(12),
    borderColor: colors.active,
    borderWidth: 1,
    backgroundColor: colors.inActive,
    marginRight: spacing,
    padding: spacing,
    minWidth: native.px(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionsAndNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: native.px(30),
  },
  positions: {
    flexDirection: 'row',
  },
  indicators: {
    borderRadius: native.px(12),
    padding: spacing,
    marginRight: spacing,
    backgroundColor: colors.active,
  },
  indicatorsText: {
    color: 'white',
  },
  navigations: {
    flexDirection: 'row',
  },
});
