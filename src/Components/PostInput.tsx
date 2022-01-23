import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Sizes, Width} from '../Constants/Size';
import Colors from '../Constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
const PostInput = () => {
  const [Input, setInput] = useState('');
  const ref = useRef<any>(null);

  Keyboard.addListener('keyboardDidHide', e => {
    if (ref.current) {
      ref?.current.blur();
    }
  });

  const handleSend = () => {
    console.log('Sending text');
  };
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
          value={Input}
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
        <TouchableOpacity onPress={handleSend}>
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
