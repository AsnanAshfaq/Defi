import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {FC, useState} from 'react';
import Colors from '../../Constants/Colors';
import {LogoWithTagLine} from '../../Components/Logo';
import CustomTextInput from '../../Components/AuthInput';
import Button from '../../Components/Button';
import {Sizes} from '../../Constants/Size';
import auth from '@react-native-firebase/auth';
import Loading from '../../Components/Loading';

type props = {
  navigation: any;
};
const SignIn: FC<props> = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [Input, setInput] = useState({
    email: {value: '', error: ''},
    password: {value: '', error: ''},
  });

  const handleLogIn = () => {
    // few checks
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (Input.email.value.trim() === '') {
      ToastAndroid.show('Email cannot be empty', 1500);
    } else if (!emailRegex.test(Input.email.value)) {
      ToastAndroid.show('Plase enter a valid Email Address', 1500);
    } else if (Input.password.value.trim() === '') {
      ToastAndroid.show('Password cannot be empty', 1500);
    } else {
      setloading(true);
      auth()
        .signInWithEmailAndPassword(Input.email.value, Input.password.value)
        .then(() => {
          setloading(false);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            ToastAndroid.show('Email Address is already in use', 1500);
          }

          if (error.code === 'auth/invalid-email') {
            ToastAndroid.show('Email Address is invalid', 1500);
          }
          setloading(false);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-100}
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
              // maxLength={15}
              is_password
            />
          </View>
          <View style={[styles.inputContainer, {alignItems: 'flex-end'}]}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[{flex: 0.15}, styles.center]}>
          <Button text="Login" onPress={handleLogIn} loading={loading} />
        </View>
        {/* rest of the stuff */}
        <View style={[{flex: 0.2}, styles.center, styles.footerContainer]}>
          <Text style={[styles.footerText, {color: Colors.GREY}]}>
            New to Defi ?{' '}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.footerText, {color: Colors.WHITE}]}>
                Register Now
              </Text>
            </TouchableWithoutFeedback>
            <Text style={[styles.footerText, {color: Colors.WHITE}]}></Text>
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
    fontFamily: 'TitilliumWeb-Regular',
  },
  forgotText: {
    color: Colors.WHITE,
    fontSize: Sizes.normal * 0.8,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
