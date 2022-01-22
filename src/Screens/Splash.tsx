import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import {LogoWithTagLine} from '../Components/Logo';

const Splash = () => {
  return (
    <View
      style={[
        styles.parent,
        styles.center,
        {
          backgroundColor: Colors.PURPLE,
        },
      ]}>
      <LogoWithTagLine />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
