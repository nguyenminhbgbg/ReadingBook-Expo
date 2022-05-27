import React from "react";

import { createNativeStackNavigator  } from "@react-navigation/native-stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const RootStack = createNativeStackNavigator ();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ title: '', headerShown: false }}/>
    <RootStack.Screen name="SignInScreen" component={SignInScreen} 
        options={{
          title: 'Đăng nhập', 
          headerStyle: {
          backgroundColor: COLORS.black ,
          },
          headerShown: false,
          headerTintColor: COLORS.white, }}/>
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} 
        options={{ 
          title: 'Đăng ký',
          headerStyle: {
          backgroundColor: COLORS.black,
          },
          headerShown: false,
          headerTintColor: COLORS.white, }}/>

  </RootStack.Navigator>
);

export default RootStackScreen;
