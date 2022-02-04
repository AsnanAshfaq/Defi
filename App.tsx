/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import Splash from './src/Screens/Splash';
import Naivgation from './src/Navigations/index';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [showSplash, setshowSplash] = useState(true);
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState<any>();

  function onAuthStateChanged(user: any) {
    setTimeout(() => {
      setUser(user);
      if (loading) setloading(false);
    }, 3000);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  });
  if (loading) {
    return <Splash />;
  }
  return <Naivgation is_authenticated={user ? true : false} />;
};

export default App;
