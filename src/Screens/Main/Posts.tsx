import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import Header from '../../Components/Header';
import Colors from '../../Constants/Colors';
import {Height, Width} from '../../Constants/Size';
import PostInput from '../../Components/PostInput';
import PostCard from '../../Components/PostCard';
import firestore from '@react-native-firebase/firestore';

const data = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
];
const Posts: FC = () => {
  const handleSend = (text: string) => {
    if (text.trim() !== '') {
      console.log('Sending text');
    } else {
      Keyboard.dismiss();
    }
  };

  const getPosts = async () => {
    const posts = await firestore().collection('posts').get();
    console.log('Posts are', posts);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View
      style={[
        styles.parent,
        {backgroundColor: Colors.SCREEN_BACKGROUND_COLOR},
      ]}>
      <Header label="Posts" />
      <View style={{marginTop: Height * 0.03}}>
        <PostInput handleSend={handleSend} />
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
  },
});
