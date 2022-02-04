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
import {Sizes} from '../../Constants/Size';
import auth from '@react-native-firebase/auth';

type props = {
  navigation: any;
};
const SignUp: FC<props> = ({navigation}) => {
  const [Input, setInput] = useState({
    email: {value: '', error: ''},
    password: {value: '', error: ''},
  });
  const [loading, setloading] = useState(false);

  const handleRegister = () => {
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
        .createUserWithEmailAndPassword(Input.email.value, Input.password.value)
        .then(() => {
          setloading(false);
        })
        .catch((error: any) => {
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
    <ScrollView
      keyboardShouldPersistTaps={'never'}
      contentContainerStyle={{flex: 1}}>
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-100}
          style={{flex: 1, flexDirection: 'column'}}>
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
                  is_password
                />
              </View>
            </View>
            <View style={[{flex: 0.15}, styles.center]}>
              <Button
                text="Register"
                onPress={handleRegister}
                loading={loading}
              />
            </View>
            {/* rest of the stuff */}
            <View style={[{flex: 0.2}, styles.center, styles.footerContainer]}>
              <Text style={[styles.footerText, {color: Colors.GREY}]}>
                Joined us before ?{' '}
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('SignIn')}>
                  <Text style={[styles.footerText, {color: Colors.WHITE}]}>
                    Login
                  </Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </ScrollView>
  );
};

export default SignUp;

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
});
