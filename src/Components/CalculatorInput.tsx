import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {Sizes, Width} from '../Constants/Size';
import Colors from '../Constants/Colors';

type props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};
const CalculatorInput: FC<props> = ({placeholder, onChangeText, value}) => {
  const ref = useRef<any>(null);

  Keyboard.addListener('keyboardDidHide', e => {
    if (ref.current) {
      ref?.current.blur();
    }
  });

  return (
    <View style={{width: Width * 0.6}}>
      <TextInput
        placeholder={placeholder}
        ref={ref}
        style={[styles.textField]}
        value={value}
        onChangeText={text => onChangeText(text)}
        placeholderTextColor={Colors.GREY}
        keyboardType={'decimal-pad'}
        multiline={false}
        maxLength={10}
      />
    </View>
  );
};

export default CalculatorInput;

const styles = StyleSheet.create({
  textField: {
    fontSize: Sizes.normal * 0.8,
    fontFamily: 'TitilliumWeb-Bold',
    color: Colors.GREY,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
