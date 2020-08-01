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

import {Provider} from 'react-redux';
import store from './src/redux/store';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ChatScreen from './src/screens/ChatScreen';

import {navigationRef, isReadyRef} from './src/RootNavigation';

const Stack = createStackNavigator();

const App = ({navigation}) => {
  React.useEffect(() => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
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
    </Provider>
  );
};

export default App;
