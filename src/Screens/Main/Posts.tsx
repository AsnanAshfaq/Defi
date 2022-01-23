import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import Colors from '../../Constants/Colors';
import {Width} from '../../Constants/Size';

const Posts = () => {
  return (
    <View
      style={[
        styles.parent,
        {backgroundColor: Colors.SCREEN_BACKGROUND_COLOR},
      ]}>
      <Header label="Posts" />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Platform.OS === 'android' ? 10 : 5,
  },
});
