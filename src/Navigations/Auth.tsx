import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/SignUp';
import ForgotPassword from '../Screens/Auth/ForgotPassword';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{header: () => null}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default Auth;

const styles = StyleSheet.create({});
