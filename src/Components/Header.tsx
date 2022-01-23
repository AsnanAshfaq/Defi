import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '../Constants/Colors';
import {Sizes} from '../Constants/Size';

type props = {
  label: string;
};
const Header: FC<props> = ({label}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, {color: Colors.PURPLE}]}>{label}</Text>
      </View>
      <View style={styles.drawerIconContainer}>
        {/* <View
          style={{
            width: 40,
            height: 2.5,
            backgroundColor: Colors.DARK_PURPLE,
            marginBottom: 5,
          }}
        />
        <View
          style={{
            width: 30,
            height: 2.5,
            backgroundColor: Colors.DARK_PURPLE,
            marginLeft: 10,
          }}
        /> */}
        {/* <Text
          style={{
            color: Colors.DARK_PURPLE,
            fontSize: Sizes.normal,
          }}>
          Hey Asnan
        </Text> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
  },
  labelContainer: {
    flex: 0.7,
  },
  labelText: {
    fontSize: Sizes.large * 1.3,
    fontFamily: 'TitilliumWeb-Bold',
  },
  drawerIconContainer: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
