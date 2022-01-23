import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Sizes, Width} from '../Constants/Size';
import Colors from '../Constants/Colors';
import Notifications from '../Screens/Main/Notifications';
import Calculate from '../Screens/Main/Calculate';
import Images from '../Screens/Main/Images';
import Posts from '../Screens/Main/Posts';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          const ICON_SIZE = focused ? Width * 0.063 : Width * 0.06;
          if (route.name === 'Notification') {
            iconName = focused ? 'bell' : 'bell';
          } else if (route.name === 'Images') {
            iconName = focused ? 'images' : 'images';
          } else if (route.name === 'Posts') {
            iconName = focused ? 'text-fields' : 'text-fields';
          } else if (route.name === 'Calculate') {
            iconName = focused ? 'calculate' : 'calculate';
          }

          const colors = focused ? Colors.WHITE : Colors.GREY;

          if (route.name === 'Notification') {
            return <Entypo name={iconName} size={ICON_SIZE} color={colors} />;
          }

          if (route.name === 'Posts') {
            return (
              <MaterialIcons name={iconName} size={ICON_SIZE} color={colors} />
            );
          }

          if (route.name === 'Calculate') {
            return (
              <MaterialIcons name={iconName} size={ICON_SIZE} color={colors} />
            );
          }
          return <Ionicons name={iconName} size={ICON_SIZE} color={colors} />;
        },
        tabBarLabel: ({focused, color}) => (
          <>
            {focused && (
              <View
                style={{
                  backgroundColor: Colors.WHITE,
                  width: 22,
                  height: 3.5,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderRadius: 3,
                  borderColor: 'transparent',
                }}
              />
            )}
          </>
        ),

        tabBarActiveTintColor: Colors.WHITE,
        tabBarStyle: {
          backgroundColor: Colors.PURPLE,
          borderColor: 'transparent',
          borderTopWidth: 1,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        },
        header: () => null,
      })}
      // tabBarOptions={{
      //   activeTintColor: Colors.WHITE,
      //   inactiveTintColor: Colors.GREY,
      //   iconStyle: {
      //     // color: state.theme.TAB_BAR_ICON_COLOR,
      //     // fontSize: Sizes.normal * 10,
      //   },

      //   allowFontScaling: true,
      //   keyboardHidesTabBar: true,
      //   // activeBackgroundColor: darkColors.LIGHT_BACKGROUND,
      //   style: {
      //     backgroundColor: Colors.PURPLE,
      //     borderTopColor: 'transparent',
      //     paddingVertical: 2,
      //     // position: 'absolute',
      //   },
      // }}
      backBehavior="none">
      <Tab.Screen
        name="Notification"
        component={Notifications}
        // options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Images"
        component={Images}
        // options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        // options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Calculate"
        component={Calculate}
        // options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
};

export default TabScreens;
