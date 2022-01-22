import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import Colors from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type textContentType =
  | 'none' //disable autofill
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password';

type keyboardType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';

const ICON_SIZE = Width * 0.07;

const LeftIcon: FC<{name: string}> = ({name}) => {
  const SIZE = ICON_SIZE * 0.65;
  if (name === 'email') {
    return <Entypo name="email" color={Colors.GREY} size={SIZE} />;
  }
  if (name === 'password') {
    return <MaterialIcons name="lock" color={Colors.GREY} size={SIZE} />;
  }

  if (name === 'full_name') {
    return <Ionicons name="person" color={Colors.GREY} size={SIZE} />;
  }

  return null;
};

type props = {
  defaultValue: any;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType: keyboardType;
  name: 'email' | 'password' | 'full_name';
  textContentType?: textContentType;
  is_password?: boolean;
  multiLine?: boolean;
  showLength?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  error?: string;
};
const CustomTextInput: FC<props> = ({
  defaultValue,
  onChangeText,
  keyboardType,
  placeholder,
  name,
  autoFocus,
  error,
  multiLine,
  is_password = false,
  textContentType = 'none',
  maxLength,
  showLength = false,
}) => {
  const ref = useRef<any>(null);
  const [Security, setSecurity] = useState(is_password);
  Keyboard.addListener('keyboardDidHide', e => {
    if (ref.current) {
      ref?.current.blur();
    }
  });

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: Colors.GREY,
        height: Height * 0.05,
        flexDirection: 'row',
      }}>
      {/* left icon container  */}

      <View style={[styles.center]}>
        <LeftIcon name={name} />
      </View>
      <TextInput
        placeholder={placeholder}
        ref={ref}
        style={[
          styles.textField,
          {
            width: showLength ? Width * 0.54 : Width * 0.55,
            color: Colors.GREY,
          },
        ]}
        value={defaultValue}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.GREY}
        textContentType={textContentType}
        keyboardType={keyboardType}
        secureTextEntry={Security === true ? Security : false}
        maxLength={maxLength}
        autoFocus={autoFocus}
        multiline={multiLine ? multiLine : false}
      />

      {showLength && (
        <View style={{position: 'absolute', width: 40, right: 3, top: 5}}>
          <Text
            style={{
              color: Colors.GREY,
              fontSize: Sizes.small * 0.73,
            }}>
            {defaultValue.trim().length} / {maxLength}
          </Text>
        </View>
      )}

      {is_password && (
        <TouchableWithoutFeedback onPress={() => setSecurity(!Security)}>
          <Ionicons
            name={Security ? 'eye-outline' : 'eye-off-outline'}
            size={ICON_SIZE * 0.8}
            color={Colors.GREY}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      )}

      <Text style={[styles.errorText, {color: Colors.ERROR_TEXT}]}>
        {error}
      </Text>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textField: {
    fontSize: Sizes.normal * 0.8,
    marginLeft: 10,
  },
  errorText: {
    fontSize: Sizes.small,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
