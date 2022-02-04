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
    email: {value: '', error: ''},
  });

  const changePassword = () => {
    // few checks
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (Input.email.value.trim() === '') {
      ToastAndroid.show('Email cannot be empty', 1500);
    } else if (!emailRegex.test(Input.email.value)) {
      ToastAndroid.show('Plase enter a valid Email Address', 1500);
    } else {
      setloading(true);
      auth()
        .sendPasswordResetEmail(Input.email.value)
        .then(res => {
          ToastAndroid.show(
            'We have sent you an email containing reset link',
            1500,
          );
          setloading(false);
        })
        .catch(() => {
          ToastAndroid.show('An error occurred while resetting password', 1500);
          setloading(false);
        });
    }
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

        <View style={[{flex: 0.2}, styles.center]}>
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
        </View>
        <View style={[{flex: 0.15}, styles.center]}>
          <Button
            text="Reset Password"
            onPress={changePassword}
            loading={loading}
          />
        </View>
        {/* rest of the stuff */}
        <View
          style={[{flex: 0.2, alignItems: 'center'}, styles.footerContainer]}>
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
