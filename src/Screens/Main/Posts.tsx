import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import Colors from '../../Constants/Colors';
import {Height, Width} from '../../Constants/Size';
import PostInput from '../../Components/PostInput';
import PostCard from '../../Components/PostCard';

const data = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
];
const Posts = () => {
  return (
    <View
      style={[
        styles.parent,
        {backgroundColor: Colors.SCREEN_BACKGROUND_COLOR},
      ]}>
      <Header label="Posts" />
      <View style={{marginTop: Height * 0.03}}>
        <PostInput />
      </View>

      <FlatList
        data={data}
        style={{marginTop: Height * 0.03}}
        renderItem={({item}) => <PostCard text={item} />}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Platform.OS === 'android' ? 10 : 5,
    backgroundColor: Colors.SCREEN_BACKGROUND_COLOR,
  },
});
