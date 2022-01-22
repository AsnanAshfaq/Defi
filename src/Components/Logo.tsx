import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import {Sizes} from '../Constants/Size';

const LogoWithTagLine = () => {
  return (
    <View style={[styles.center]}>
      <Text style={[styles.logoText, {color: Colors.WHITE}]}>defi</Text>
      <Text style={[styles.tagLineText, {color: Colors.WHITE}]}>
        Be Social, Be artistic, Be simple
      </Text>
    </View>
  );
};

const LogoWithOutTagLine = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export {LogoWithTagLine, LogoWithOutTagLine};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: Sizes.large * 3,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  tagLineText: {
    fontSize: Sizes.small,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
