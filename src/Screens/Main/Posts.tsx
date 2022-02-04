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

  useEffect(() => {
    const subscribe = firestore()
      .collection('posts')
      .onSnapshot(documentSnapshot => {
        documentSnapshot.docs.map(doc => {
          setPosts(
            documentSnapshot.docs.map(item => ({
              id: item.id,
              text: item.data().text,
            })),
          );
        });
      });

    return () => subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore]);
  return (
    <View
      style={[
        styles.parent,
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
      ) : (
        <FlatList
          data={posts}
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
