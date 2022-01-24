import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {Sizes, Width} from '../Constants/Size';
import Colors from '../Constants/Colors';

type props = {
  width?: number;
  height?: number;
  text?: string;
  color?: string;
};
const Loading: FC<props> = ({
  width = Width * 0.35,
  // height = Width * 0.1,
  text,
  color = Colors.WHITE,
}) => {
  return (
    <View style={styles.center}>
      <LottieView
        source={require('../Animations/loading.json')}
        autoPlay
        style={{
          width: width,
          // height: height,
        }}
        loop
        colorFilters={[
          {
            keypath: 'Dot4',
            color: color,
          },
          {
            keypath: 'Dot3',
            color: color,
          },
          {
            keypath: 'Dot2',
            color: color,
          },
          {
            keypath: 'Dot1',
            color: color,
          },
        ]}
      />
      {text !== '' && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Sizes.normal * 0.8,
    color: Colors.GREY,
  },
});
