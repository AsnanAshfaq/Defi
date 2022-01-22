import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Colors from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';

type props = {
  text: string;
  onPress: () => void;
};
const Button: FC<props> = ({text, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: Width * 0.7,
          backgroundColor: Colors.DARK_PURPLE,

          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'transparent',
        },
        styles.center,
      ]}
      onPress={onPress}
      activeOpacity={0.5}>
      <Text style={[styles.text, {color: Colors.WHITE}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  text: {
    fontSize: Sizes.normal,
    fontFamily: 'TitilliumWeb-Regular',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
