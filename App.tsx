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
import Notifications from './src/Notifications';

const App = () => {
  const [showSplash, setshowSplash] = useState(true);

  useEffect(() => {
    // set notifications
    Notifications();
    setTimeout(() => {
      setshowSplash(false);
    }, 3000);
  });
  if (showSplash) {
    return <Splash />;
  }
  return <Naivgation />;
};

export default App;
