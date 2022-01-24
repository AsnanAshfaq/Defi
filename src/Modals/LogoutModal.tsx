/* eslint-disable no-sparse-arrays */
import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import Colors from '../Constants/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import auth from '@react-native-firebase/auth';
import Loading from '../Components/Loading';

type props = {
  isShow: boolean;
  toggleModal: () => void;
};

const LogoutModal: FC<props> = ({isShow, toggleModal}) => {
  const [loading, setloading] = useState(false);

  const handleLogout = () => {
    setloading(true);

    auth()
      .signOut()
      .then(() => {
        setloading(false);
        toggleModal();
      })
      .catch(() => {
        setloading(false);
        toggleModal();
      });
  };
  return (
    <Modal
      isVisible={isShow}
      style={[
        styles.Modalparent,
        {
          backgroundColor: Colors.PURPLE,
        },
      ]}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={200}
      backdropColor={'#575959'}
      backdropOpacity={0.3}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <>
        <View style={styles.headingContainer}>
          <Text style={[styles.heading]}>Logout </Text>
        </View>

        <View style={[{flex: 0.4}, styles.center]}>
          <Text style={styles.helpText}>
            Are you sure that you want to logout?
          </Text>
        </View>

        {/* done button  */}

        {loading ? (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ) : (
          <View style={styles.applyButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                // toggle modal first
                toggleModal();
              }}
              style={[styles.applyButton]}>
              <Text style={[styles.apply]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // toggle modal first
                handleLogout();
              }}
              style={[styles.applyButton]}>
              <Text style={[styles.apply]}>Yes</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    borderColor: 'transparent',
    marginVertical: Height * 0.32,
    position: 'absolute',
    height: Height * 0.23,
    marginHorizontal: Width * 0.1,
    width: Width * 0.8,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    flex: 0.4,
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
    color: Colors.GREY,
    fontFamily: 'TitilliumWeb-Regular',
  },

  helpText: {
    color: Colors.WHITE,
    fontSize: Sizes.normal * 0.9,
    fontFamily: 'TitilliumWeb-Regular',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  applyButtonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  applyButton: {
    width: Width * 0.35,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.DARK_PURPLE,
    marginHorizontal: 5,
  },
  apply: {
    fontSize: Sizes.normal * 0.8,
    color: Colors.WHITE,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
export default LogoutModal;
