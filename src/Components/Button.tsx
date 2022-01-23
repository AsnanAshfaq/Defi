import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Colors from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Loading from './Loading';

type props = {
  text: string;
  loading?: boolean;
  onPress: () => void;
};
const Button: FC<props> = ({text, onPress, loading}) => {
  if (loading)
    return (
      <View style={[styles.container, {height: Height * 0.06}]}>
        <Loading width={Width * 0.3} />
      </View>
    );

  return (
    <TouchableOpacity
      style={[styles.container, styles.center]}
      onPress={onPress}
      activeOpacity={0.5}>
      {/* {loading ? (
        <View
          style={{
            // height: 20,
            // justifyContent: 'center',
            // alignItems: 'center',
            // width: Width * 0.7,
            backgroundColor: 'red',
            flex: 0.15,
          }}>
          <Loading />
        </View>
      ) : (
      )} */}
      <Text style={[styles.text, {color: Colors.WHITE}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: Width * 0.7,
    backgroundColor: Colors.DARK_PURPLE,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    fontSize: Sizes.normal,
    fontFamily: 'TitilliumWeb-Regular',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
