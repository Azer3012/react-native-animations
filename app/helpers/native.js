
import { Alert, Dimensions, PixelRatio, Platform } from 'react-native';





Array.prototype.filterSplit = function (cb) {
  const nonFiltereds = [];
  const filtereds = this.filter(item => {
    if (!cb(item)) nonFiltereds.push(item);
    return cb(item);
  })
  return [filtereds, nonFiltereds];
};

class Native {
  constructor() {
    
    
    this.isIOS = Platform.OS === 'ios';
    
    this.screenWidth = Dimensions.get('window').width;
    this.screenHeight = Dimensions.get('window').height;
    this.locale = "az";
    this.style = {
      center: () => ({ justifyContent: 'center', alignItems: 'center' }),
      border: (borderRadius, borderWidth, borderColor) => ({ borderRadius, borderWidth, borderColor }),
      size: (width, height, backgroundColor) => ({ width: this.px(width), height: this.px(height), backgroundColor }),
      square: (size, backgroundColor) => ({ width: this.px(size), height: this.px(size), backgroundColor }),
      circle: (radius, backgroundColor) => ({ width: this.px(radius), height: this.px(radius), borderRadius: this.px(radius), backgroundColor }),
      circumference: (radius, borderWidth, borderColor) => ({ width: this.px(radius), height: this.px(radius), borderRadius: radius, borderWidth, borderColor }),
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  uniqueArrayObjects(array, key) {
    return [...new Map(array.map(item => [item?.[key], item])).values()];
  }

  

  px(pixel) {
    const scale = this.screenWidth / 375;
    const newSize = pixel * scale;
    let result = Math.round(PixelRatio.roundToNearestPixel(newSize));
    result = this.isIOS ? result : result - 2;
    return pixel > 0 && result <= 0 ? 1 : result;
  }

  random(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  

  

  handleError() {
    // if (error.response.status === 422) {
    //   this.toast('Daxil edilən məlumat keçərli deyil', 'error');
    // }
    // if (error.response.status === 401) {
    //   userStore.logout(() => {
    //     navigationStore.navigation.navigate('HomePage');
    //   });
    // }

  }

  uniqid(length) {
    let chars = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ];
    let part1 = chars.sort(() => Math.random() - 0.5).join('');
    let part2 = chars.sort(() => Math.random() - 0.5).join('');
    return (part1 + part2).substring(5, length + 5);
  }

  uniqint(length) {
    let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let parts = [];
    chars.forEach(() =>
      parts.push(chars.sort(() => Math.random() - 0.5).join('')),
    );
    return parts.join('').substring(5, length + 5);
  }

  arrayUniqueByKey(array, key) {
    return [...new Map(array.map(item => [item[key], item])).values()];
  }

  uniqueByNestedKey(array, key) {
    let keys = key.split(".");
    return [...new Map(array.map(item => {
      return [keys.reduce((first, second) => {
        return first && first[second];
      }, item), item]
    }
    )
    ).values()];
  }

  uniqueArray(data) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    return data?.filter(onlyUnique);
  }

  confirm(options = {}) {
    Alert.alert(
      options?.title || '',
      options?.text || '',
      [
        {
          text: options?.noButtonText || this.translate("decline"),
          style: 'cancel',
          color: 'red',
        },
        {
          text: options?.yesButtonText || this.translate("yes"),
          onPress: () => options?.onConfirm(),
        },
      ],
      {
        cancelable: options?.cancelable || true,
      },
    );
  }

  ucWords(str) {
    str = str.toLocaleLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) {
      return s.toLocaleUpperCase();
    });
  }

  

 
}

export default new Native();