import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';

type props = {
  text: string;
};
const TextCard: FC<props> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TextCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CARD_BACKGROUND,
    marginHorizontal: Width * 0.05,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 15,
  },
  text: {
    lineHeight: 20,
    color: Colors.PURPLE,
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: Sizes.normal * 0.9,
  },
});
