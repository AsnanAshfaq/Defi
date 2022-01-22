import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Constants/Colors';
import {LogoWithTagLine} from '../Components/Logo';
import CustomTextInput from '../Components/TextInput';
import Button from '../Components/Button';
import {Sizes} from '../Constants/Size';

const SignIn = () => {
  const [Input, setInput] = useState({
    email: {value: '', error: ''},
    password: {value: '', error: ''},
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View
        style={[
          styles.parent,
          styles.center,
          {
            backgroundColor: Colors.PURPLE,
          },
        ]}>
        <View style={[styles.center, {flex: 0.45}]}>
          <LogoWithTagLine />
        </View>

        <View style={{flex: 0.2}}>
          <View style={styles.inputContainer}>
            <CustomTextInput
              defaultValue={Input.email.value}
              keyboardType="email-address"
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    email: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder="Email Address"
              name="email"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              defaultValue={Input.email.value}
              keyboardType="default"
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    password: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder="Password"
              name="password"
              is_password
            />
          </View>
        </View>
        <View style={[{flex: 0.15}, styles.center]}>
          <Button
            text="Login"
            onPress={() => console.log('Pressed on button')}
          />
        </View>
        {/* rest of the stuff */}
        <View style={[{flex: 0.2}, styles.center, styles.footerContainer]}>
          <Text style={[styles.footerText, {color: Colors.GREY}]}>
            New to Dafi ?{' '}
            <Text style={[styles.footerText, {color: Colors.WHITE}]}>
              Register Now
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 15,
  },
  footerContainer: {},
  footerText: {
    fontSize: Sizes.normal * 0.8,
  },
});
