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
type OperatorProps = {
  value: string;
  isChecked: boolean | undefined;
  setIsChecked: (value: string) => void;
};
const Operator: FC<OperatorProps> = ({value, isChecked, setIsChecked}) => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 3, marginLeft: 10}}>
      <BouncyCheckbox
        size={20}
        fillColor={Colors.PURPLE}
        unfillColor={Colors.PURPLE}
        // text="Custom Checkbox"
        iconStyle={{borderColor: Colors.GREY}}
        onPress={(check: boolean) => {
          setIsChecked(value.toLowerCase());
        }}
        isChecked={isChecked}
        disableBuiltInState={true}
      />
      <View style={{marginLeft: 10}}>
        <Text style={[styles.operatorText]}>{value}</Text>
      </View>
    </View>
  );
};

type props = {
  value: string;
  isShow: boolean;
  toggleModal: () => void;
  onSelect: (value: string) => void;
};

const OperatorModal: FC<props> = ({isShow, toggleModal, value, onSelect}) => {
  const [CheckBox, setCheckBox] = useState<string>(value);
  const handleSelect = () => {
    // get all the selected technologies
    onSelect(CheckBox);
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
          <Text style={[styles.heading]}>Select Operator </Text>
        </View>

        <View style={{flex: 0.5}}>
          <Operator
            value="Multiplication"
            isChecked={CheckBox === 'multiplication'}
            setIsChecked={setCheckBox}
          />
          <Operator
            value="Addition"
            isChecked={CheckBox === 'addition'}
            setIsChecked={setCheckBox}
          />
          <Operator
            value="Subtraction"
            isChecked={CheckBox === 'subtraction'}
            setIsChecked={setCheckBox}
          />
        </View>

        {/* done button  */}
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              // toggle modal first
              toggleModal();
              handleSelect();
            }}
            style={[styles.applyButton]}>
            <Text style={[styles.apply]}>Done</Text>
          </TouchableOpacity>
        </View>
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
    height: Height * 0.3,
    marginHorizontal: Width * 0.1,
    width: Width * 0.8,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    flex: 0.3,
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
    color: Colors.GREY,
  },
  scroll: {
    marginVertical: 15,
  },
  tag: {
    fontSize: Sizes.normal * 0.85,
    marginRight: 30,
    padding: 3,
    flexShrink: 1,
    lineHeight: 19,
  },
  operatorText: {
    fontSize: Sizes.normal,
    color: Colors.WHITE,
    fontFamily: 'TitilliumWeb-Regular',
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
  },
  apply: {
    fontSize: Sizes.normal,
    color: Colors.WHITE,
  },
});
export default OperatorModal;
