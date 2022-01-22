import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

type props = {
  label: string;
};
const Header: FC<props> = ({label}) => {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
