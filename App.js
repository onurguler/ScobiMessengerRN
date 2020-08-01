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
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const App = ({navigation}) => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
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
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{title: 'Sign Up'}}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({route}) => ({title: route.params.name})}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <SafeAreaView />
    </ApplicationProvider>
  );
};

export default App;
