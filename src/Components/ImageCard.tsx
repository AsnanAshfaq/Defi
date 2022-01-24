import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Sizes, Width} from '../Constants/Size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Constants/Colors';
import DeleteModal from '../Modals/DeleteModal';
import storage from '@react-native-firebase/storage';

type props = {
  src: string;
};

const GREY_IMAGE_PATH =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O8-Ud_7lnP6aq-UFoJUP0fhGuVqLaMg-eQ&usqp=CAU';
const ICON_SIZE = Width * 0.07;

const ImageCard: FC<props> = ({src}) => {
  const [deleting, setDeleting] = useState(false);
  const [modal, setmodal] = useState(false);
  const [loading, setloading] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    const imageRef = storage().refFromURL(src);
    imageRef
      .delete()
      .then(() => {
        setDeleting(false);
        setmodal(false);
        ToastAndroid.show('Image has been deleted', 1500);
      })
      .catch(() => {
        setDeleting(false);
        setmodal(false);
        ToastAndroid.show('Error occurred while deleting image', 1500);
      });
  };
  return (
    <View>
      <DeleteModal
        isShow={modal}
        toggleModal={() => setmodal(false)}
        handleDelete={handleDelete}
        deleting={deleting}
      />
      <Image
        source={{uri: loading ? GREY_IMAGE_PATH : src}}
        style={styles.image}
        resizeMode="cover"
        onLoadEnd={() => setloading(false)}
        onError={() => setloading(false)}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setmodal(true)}>
          <MaterialIcons
            name="cancel"
            size={ICON_SIZE * 0.9}
            color={Colors.DARK_PURPLE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    width: Width * 0.75,
    height: Width * 0.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    marginVertical: 20,
  },
  card: {
    width: Width * 0.75,
    height: Width * 0.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    marginVertical: 20,
    backgroundColor: Colors.CARD_BACKGROUND,
  },
  iconContainer: {
    position: 'absolute',
    right: -10,
    top: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Sizes.normal * 0.8,
    fontFamily: 'TitilliumWeb-Regular',
    color: Colors.DARK_PURPLE,
  },
});
