import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import React, {FC, useState} from 'react';
import Colors from '../../Constants/Colors';
import {LogoWithTagLine} from '../../Components/Logo';
import CustomTextInput from '../../Components/AuthInput';
import Button from '../../Components/Button';
import {Height, Sizes} from '../../Constants/Size';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Loading from '../../Components/Loading';

type props = {
  navigation: any;
};
const ForgotPassword: FC<props> = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [Input, setInput] = useState({
    email: {value: '18asnan@gmail.com', error: ''},
    password: {value: 'Shanay_Ash18', error: ''},
    confirm_password: {value: 'Shanay_Ash18', error: ''},
  });

  const changePassword = () => {
    setloading(true);
    // few checks
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (Input.email.value.trim() === '') {
      ToastAndroid.show('Email cannot be empty', 1500);
    } else if (!emailRegex.test(Input.email.value)) {
      ToastAndroid.show('Plase enter a valid Email Address', 1500);
    } else if (Input.password.value.trim() === '') {
      ToastAndroid.show('Password cannot be empty', 1500);
    } else if (
      Input.password.value.trim() !== Input.confirm_password.value.trim()
    ) {
      ToastAndroid.show('Passwords are not same', 1500);
    } else {
      console.log('Everything is clear');
    }
    setloading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-(Height * 0.08)}
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

        <View style={{flex: 0.25}}>
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
              defaultValue={Input.password.value}
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
          <View style={styles.inputContainer}>
            <CustomTextInput
              defaultValue={Input.confirm_password.value}
              keyboardType="default"
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    confirm_password: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder="Confirm Password"
              name="password"
              is_password
            />
          </View>
        </View>
        <View style={[{flex: 0.15}, styles.center]}>
          <Button
            text="Change Password"
            onPress={changePassword}
            loading={loading}
          />
        </View>
        {/* rest of the stuff */}
        <View style={[{flex: 0.15}, styles.center, styles.footerContainer]}>
          <Text style={[styles.footerText, {color: Colors.GREY}]}>
            Back to{'  '}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={[styles.footerText, {color: Colors.WHITE}]}>
                Login
              </Text>
            </TouchableWithoutFeedback>
            <Text style={[styles.footerText, {color: Colors.WHITE}]}></Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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
    fontFamily: 'TitilliumWeb-Regular',
  },
  forgotText: {
    color: Colors.WHITE,
    fontSize: Sizes.normal * 0.8,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
