import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type props = {
  label: string;
};
const Header: FC<props> = ({label}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, {color: Colors.PURPLE}]}>{label}</Text>
      </View>
      <View style={styles.logoutContainer}>
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

        <MaterialIcons
          name={'logout'}
          color={Colors.PURPLE}
          size={Width * 0.07}
        />
        <Text style={styles.logoutText}>Logout{'   '}</Text>
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
    flex: 0.85,
  },
  labelText: {
    fontSize: Sizes.large * 1.3,
    fontFamily: 'TitilliumWeb-Bold',
  },
  logoutText: {
    color: Colors.DARK_PURPLE,
    fontSize: Sizes.normal * 0.8,
    fontFamily: 'TitilliumWeb-Regular',
  },
  logoutContainer: {
    flex: 0.15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
