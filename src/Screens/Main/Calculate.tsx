import {
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import React, {FC, useState} from 'react';
import Header from '../../Components/Header';
import Colors from '../../Constants/Colors';
import {Height, Sizes, Width} from '../../Constants/Size';
import CalculatorInput from '../../Components/CalculatorInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OperatorModal from '../../Modals/OperatorModal';
import Button from '../../Components/Button';
import Loading from '../../Components/Loading';
import Slider from '@react-native-community/slider';

const ICON_SIZE = Width * 0.07;
const Calculate: FC = () => {
  const [Input, setInput] = useState({
    first: {value: '', error: ''},
    second: {value: '', error: ''},
    operator: 'multiplication',
    result: '',
  });
  const [loading, setloading] = useState(false);

  const [modal, setmodal] = useState(false);

  const openModal = () => {
    setmodal(true);
  };

  const calculate = () => {
    console.log('Handling calculations');
    var numbers = /^[0-9]+$/;

    // check if both inputs are numbers
    if (Input.first.value.trim() === '') {
      ToastAndroid.show('First value is empty', 1500);
    } else if (Input.second.value.trim() === '') {
      ToastAndroid.show('Second value is empty', 1500);
    } else if (!numbers.test(Input.first.value)) {
      ToastAndroid.show('First value is not a valid number', 1500);
    } else if (!numbers.test(Input.second.value)) {
      ToastAndroid.show('Second value is not a valid number', 1500);
    } else {
      // make api call
      setloading(true);

      fetch(
        `https://backend-defi.herokuapp.com/?first=${
          Input.first.value
        }&second=${Input.second.value}&operator=${Input.operator.trim()}`,
      )
        .then(res => res.json())
        .then(data => {
          setInput(props => {
            return {
              ...props,
              first: {value: props.first.value, error: ''},
              second: {value: props.second.value, error: ''},
              result: data,
            };
          });
          setloading(false);
        })
        .catch(() => setloading(false));
    }
  };

  console.log('Input is', Input);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-80}
      style={{flex: 1}}>
      <View style={[styles.parent]}>
        <OperatorModal
          value={Input.operator}
          isShow={modal}
          onSelect={value =>
            setInput(props => {
              return {
                ...props,
                operator: value.toLocaleLowerCase(),
              };
            })
          }
          toggleModal={() => setmodal(false)}
        />
        <Header label="Calculate" />
        <View style={[{flex: 1}, styles.center]}>
          <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
            <CalculatorInput
              placeholder="First Value"
              value={Input.first.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    first: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
            />

            {/* <View style={styles.center}>
              <Text style={styles.valueText}>{Input.first.value}</Text>
            </View> */}

            {/* operator container  */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.operatorTextContainer}>
                <Text style={styles.operatorText}>
                  {Input.operator === 'multiplication'
                    ? 'X'
                    : Input.operator === 'addition'
                    ? '+'
                    : Input.operator === 'subtraction' && '-'}
                </Text>
              </View>
              <View style={styles.dropIconContainer}>
                <TouchableWithoutFeedback onPress={openModal}>
                  <AntDesign
                    name="caretdown"
                    color={Colors.DARK_PURPLE}
                    size={ICON_SIZE * 0.8}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <CalculatorInput
              placeholder="Second Value"
              value={Input.second.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    second: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
            />

            {/* <View style={styles.center}>
              <Text style={styles.valueText}>{Input.second.value}</Text>
            </View> */}
          </View>

          <View style={[styles.buttonContainer, styles.center]}>
            {Input.result !== '' && (
              <>
                <Text style={styles.operatorText}>=</Text>
                <Text style={styles.operatorText}>{Input.result}</Text>
              </>
            )}

            <TouchableOpacity
              style={[styles.button, styles.center]}
              onPress={calculate}
              disabled={loading}
              activeOpacity={0.5}>
              {loading ? (
                <Loading />
              ) : (
                <Text style={[styles.buttonText]}>Calculate</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Calculate;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Platform.OS === 'android' ? 10 : 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  operatorTextContainer: {
    flex: 0.6,
    paddingRight: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  valueText: {
    color: Colors.DARK_PURPLE,
    fontSize: Sizes.normal * 2,
    fontFamily: 'Dongle-Bold',
  },
  operatorText: {
    color: Colors.DARK_PURPLE,
    fontSize: Sizes.large * 3.5,
    fontFamily: 'Dongle-Bold',
  },
  dropIconContainer: {
    justifyContent: 'center',
    flex: 0.4,
    alignItems: 'flex-start',
  },
  buttonContainer: {
    flex: 0.5,
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
});
