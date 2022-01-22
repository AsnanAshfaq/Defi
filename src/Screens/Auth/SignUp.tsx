import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {FC, useState} from 'react';
import Colors from '../../Constants/Colors';
import {LogoWithTagLine} from '../../Components/Logo';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
import {Sizes} from '../../Constants/Size';

type props = {
  navigation: any;
};
const SignUp: FC<props> = ({navigation}) => {
  const [Input, setInput] = useState({
    name: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
  });
  return (
    <ScrollView
      keyboardShouldPersistTaps={'never'}
      contentContainerStyle={{flex: 1}}>
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-20}
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

            <View style={{flex: 0.35}}>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  defaultValue={Input.name.value}
                  keyboardType="default"
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        name: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder="Full Name"
                  name="full_name"
                  showLength
                  maxLength={20}
                />
              </View>
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
            <View style={[{flex: 0.1}, styles.center]}>
              <Button
                text="Register"
                onPress={() => console.log('Registering')}
              />
            </View>
            {/* rest of the stuff */}
            <View style={[{flex: 0.1}, styles.center, styles.footerContainer]}>
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
