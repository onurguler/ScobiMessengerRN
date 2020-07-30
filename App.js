/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Chats'}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerLeft: null,
              title: 'Sign In',
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <SafeAreaView />
    </>
  );
};

export default App;
