import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Width} from '../Constants/Size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Constants/Colors';

type props = {
  src: string;
  handleDelete: () => void;
};

const ICON_SIZE = Width * 0.07;
const ImageCard: FC<props> = ({src, handleDelete}) => {
  return (
    <View>
      <Image source={{uri: src}} style={styles.image} resizeMode="cover" />
      {/* cross container  */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleDelete}>
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
  iconContainer: {
    position: 'absolute',
    right: -10,
    top: 5,
  },
});
