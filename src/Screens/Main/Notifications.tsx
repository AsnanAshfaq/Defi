import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import Colors from '../../Constants/Colors';
import {Sizes, Width} from '../../Constants/Size';
import {handeLocaleNotifications} from '../../Notifications';

const Notifications = () => {
  const getNotifications = () => {
    handeLocaleNotifications('Hey There!', "Is the app good?");
  };
  return (
    <View style={styles.parent}>
      <Header label="Notifications" />

      <View style={[styles.buttonContainer, styles.center]}>
        <TouchableOpacity
          style={[styles.button, styles.center, {}]}
          onPress={getNotifications}
          activeOpacity={0.5}>
          <Text style={[styles.buttonText]}>Get Notification</Text>
        </TouchableOpacity>

        <Text style={{}}>
          Press this button to get notification on your device.
        </Text>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Platform.OS === 'android' ? 10 : 5,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    width: Width * 0.5,
    backgroundColor: Colors.DARK_PURPLE,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: 'TitilliumWeb-Regular',
    color: Colors.WHITE,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpText: {
    color: Colors.GREY,
    fontSize: Sizes.small,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
