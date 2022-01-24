import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Colors from '../../Constants/Colors';
import {Height, Sizes, Width} from '../../Constants/Size';
import ImageCard from '../../Components/ImageCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import DeleteModal from '../../Modals/DeleteModal';
import storage from '@react-native-firebase/storage';
import Loading from '../../Components/Loading';

const Data = [
  'https://cdn.pixabay.com/photo/2017/01/08/13/58/cube-1963036__340.jpg',
  'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJB-LNm-0OOD5g1FEXFqDsLgSZEGuaWJA8zw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJB-LNm-0OOD5g1FEXFqDsLgSZEGuaWJA8zw&usqp=CAU',
  'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
];
const Images: FC = () => {
  const [modal, setmodal] = useState(false);
  const [paths, setpaths] = useState<Array<string>>([]);
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);

  const uploadImage = (path: any, filename: any) => {
    let reference = storage().ref(filename);

    const task = reference.putFile(path);

    console.log('Uploading image');
    task
      .then(() => {
        ToastAndroid.show('Image has been uploaded', 1500);
        ToastAndroid.show('Refreshing', 1500);
        // setrefreshing(true);
      })
      .catch(() => {
        console.log('Error occurred while uploading image');
      });
  };
  const openCamera = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      res => {
        if (res.didCancel) {
          console.log('User cancelled');
        } else {
          console.log('Response is', res.assets);
          const fileName = res.assets[0].fileName;
          const path = res.assets[0].uri;

          uploadImage(path, fileName);
        }
      },
    );
  };

  const openGallery = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      res => {
        if (res.didCancel) {
          console.log('User cancelled');
        } else {
          console.log('Response is', res.assets);
          const fileName = res.assets[0].fileName;
          const path = res.assets[0].uri;

          uploadImage(path, fileName);
        }
      },
    );
  };

  const handleDelete = (path: string) => {
    setmodal(true);
    const imageRef = storage().refFromURL(path);
    imageRef
      .delete()
      .then(() => {
        ToastAndroid.show('Image has been deleted', 1500);
      })
      .catch(() => {
        ToastAndroid.show('Error occurred while deleting image', 1500);
      });
  };

  const getImagePaths = async () => {
    // setloading(true);
    const reference = storage().ref().child('Images').listAll();
    const urls = await Promise.all(
      (await reference).items.map(ref => ref.getDownloadURL()),
    );
    setpaths(urls);
    // setloading(false);
  };

  const onRefresh = () => {
    setrefreshing(true);
    getImagePaths();
    setrefreshing(false);
  };

  useEffect(() => {
    getImagePaths();
  }, []);

  return (
    <View style={[styles.parent]}>
      <Header label="Images" />

      <DeleteModal isShow={modal} toggleModal={() => setmodal(false)} />

      {loading ? (
        <View style={[{flex: 1}, styles.center]}>
          <Loading color={Colors.DARK_PURPLE} width={Width * 0.5} />
        </View>
      ) : (
        <FlatList
          data={paths}
          style={{marginTop: Height * 0.03}}
          keyExtractor={(item, index) => `${index}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              progressBackgroundColor={Colors.DARK_PURPLE}
              colors={[Colors.WHITE]}
              onRefresh={onRefresh}
            />
          }
          renderItem={({item}) => (
            <ImageCard src={item} handleDelete={handleDelete} />
          )}
          contentContainerStyle={styles.center}
        />
      )}

      {/* icon container  */}
      <View style={styles.iconContainer}>
        <View
          style={[
            {
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              borderRightColor: Colors.WHITE,
              borderRightWidth: 2,
              borderRadius: 2,
            },
          ]}>
          <TouchableOpacity onPress={openGallery} activeOpacity={0.5}>
            <Ionicons
              name="images"
              size={Width * 0.07 * 0.9}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            {flex: 1},
            {alignItems: 'flex-end', justifyContent: 'center'},
          ]}>
          <TouchableOpacity onPress={openCamera} activeOpacity={0.5}>
            <Ionicons
              name="camera"
              size={Width * 0.07 * 0.9}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Images;

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
  iconContainer: {
    position: 'absolute',
    backgroundColor: Colors.PURPLE,
    // minWidth: Width * 0.09,
    width: Width * 0.3,
    height: Width * 0.16,
    padding: 10,
    bottom: 10,
    right: -7,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    fontSize: Sizes.normal * 0.8,
    fontFamily: 'TitilliumWeb-Regular',
    color: Colors.DARK_PURPLE,
  },
});
