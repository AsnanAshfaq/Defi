import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {FC, useState} from 'react';
import Colors from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LogoutModal from './LogoutModal';
type props = {
  label: string;
};
const Header: FC<props> = ({label}) => {
  const [modal, setmodal] = useState(false);
  return (
    <View style={styles.parent}>
      <LogoutModal isShow={modal} toggleModal={() => setmodal(false)} />
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, {color: Colors.PURPLE}]}>{label}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setmodal(true);
          console.log('Opening modal');
        }}>
        <View style={styles.logoutContainer}>
          <MaterialIcons
            name={'logout'}
            color={Colors.PURPLE}
            size={Width * 0.07}
          />
          <Text style={styles.logoutText}>Logout{'   '}</Text>
        </View>
      </TouchableWithoutFeedback>
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
