import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  Keyboard,
  RefreshControl,
  Text,
  ToastAndroid,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Colors from '../../Constants/Colors';
import {Height, Sizes, Width} from '../../Constants/Size';
import PostInput from '../../Components/PostInput';
import PostCard from '../../Components/PostCard';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';

const data = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
];
const Posts: FC = () => {
  const [posts, setPosts] = useState<Array<{id: string; text: string}>>([]);
  const [refreshing, setrefreshing] = useState(false);
  const [loading, setloading] = useState(false);
  const [Input, setInput] = useState('');

  const handleSend = (text: string) => {
    if (text.trim() !== '') {
      firestore()
        .collection('posts')
        .add({
          text: text,
        })
        .then(() => {
          setInput('');
          Keyboard.dismiss();
          ToastAndroid.show('Post has been added', 1500);
        });
    } else {
      Keyboard.dismiss();
    }
  };

  const getPosts = async () => {
    setloading(true);
    firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log('Doc is', documentSnapshot.id);
          setPosts(prev => {
            return [
              ...prev,
              {
                id: documentSnapshot.id,
                text: documentSnapshot.data().text,
              },
            ];
          });
        });
      })
      .then(() => setloading(false))
      .catch(() => setloading(false));
  };

  const onRefresh = () => {
    setrefreshing(true);
    getPosts();
    setrefreshing(false);
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection('posts')
      .onSnapshot(documentSnapshot => {
        documentSnapshot.docs.map(doc => {
          setPosts(prev => {
            return [
              {
                id: doc.id,
                text: doc.data().text,
              },
              ...prev,
            ];
          });
        });

        // console.log('User data: ', documentSnapshot.docs);
      });

    return () => subscribe();
  }, []);
  return (
    <View
      style={[
        styles.parent,
        {backgroundColor: Colors.SCREEN_BACKGROUND_COLOR},
      ]}>
      <Header label="Posts" />
      <View style={{marginTop: Height * 0.03}}>
        <PostInput
          handleSend={handleSend}
          input={Input}
          setInput={text => setInput(text)}
        />
      </View>

      {loading ? (
        <View style={[{flex: 1}, styles.center]}>
          <Loading color={Colors.DARK_PURPLE} width={Width * 0.5} />
        </View>
      ) : !loading && posts.length === 0 ? (
        <View style={[{flex: 1}, styles.center]}>
          <Text style={styles.text}>No posts yet</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={Colors.WHITE}
            />
          }
          style={{marginTop: Height * 0.03}}
          renderItem={({item}) => <PostCard text={item.text} />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      )}
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Sizes.normal * 0.8,
    fontFamily: 'TitilliumWeb-Regular',
    color: Colors.DARK_PURPLE,
  },
});
