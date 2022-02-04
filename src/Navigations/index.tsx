import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './Auth';
import Main from '../Navigations/Main';
import Colors from '../Constants/Colors';

const Stack = createNativeStackNavigator();

type props = {
  is_authenticated: boolean;
};
const index: FC<props> = ({is_authenticated}) => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: is_authenticated
            ? Colors.SCREEN_BACKGROUND_COLOR
            : Colors.PURPLE, //depending upn the auth state(if true than purple otherwise white)
          border: '#fff',
          card: '#fff',
          notification: '#fff',
          primary: '#fff',
          text: '#fff',
        },
        dark: false,
      }}>
      <Stack.Navigator
        screenOptions={({navigation}: any) => {
          return {
            header: () => null,
            animationEnabled: true,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            detachPreviousScreen: !navigation.isFocused(),
          };
        }}>
        {is_authenticated ? (
          <Stack.Screen name="Main" component={Main} />
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({});
