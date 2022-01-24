import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {Sizes, Width} from '../Constants/Size';
import Colors from '../Constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
type props = {
  input: string;
  setInput: (text: string) => void;
  handleSend: (text: string) => void;
};
const PostInput: FC<props> = ({input, setInput, handleSend}) => {
  const ref = useRef<any>(null);

  Keyboard.addListener('keyboardDidHide', () => {
    if (ref.current) {
      ref?.current.blur();
    }
  });

  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          flex: 0.9,
        }}>
        <TextInput
          placeholder={'Write Something'}
          ref={ref}
          style={styles.textField}
          value={input}
          onChangeText={text => setInput(text)}
          placeholderTextColor={Colors.GREY}
          keyboardType={'default'}
          // maxLength={maxLength}

          multiline={false}
        />
      </View>
      <View
        style={[
          {
            flex: 0.1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          },
        ]}>
        <TouchableOpacity onPress={() => handleSend(input)}>
          <Feather name="send" color={Colors.PURPLE} size={Width * 0.07} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostInput;

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
