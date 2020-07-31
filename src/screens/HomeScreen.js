import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export class HomeScreen extends Component {
  state = {
    username: '',
    token: '',
  };

  constructor() {
    super();
    // if user not logged in navigate to sign in screen
    // else fetch authenticated user
    AsyncStorage.getItem('logged_in').then((value) => {
      const isLoggedIn = JSON.parse(value);
      if (!isLoggedIn) {
        this.props.navigation.replace('SignIn');
      } else {
        AsyncStorage.getItem('token').then((token) => {
          fetch('http://192.168.1.106:8000/api/accounts/auth/', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const {uuid, first_name, last_name, username} = data;

              this.setState({username});

              AsyncStorage.setItem('uuid', uuid);
              AsyncStorage.setItem('first_name', first_name);
              AsyncStorage.setItem('last_name', last_name);
              AsyncStorage.setItem('username', username);
            })
            .catch((error) => {
              console.warn(error);
            });
        });
      }
    });
  }

  render() {
    const {username} = this.state;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Home Screen</Text>
            <Text style={styles.sectionDescription}>
              Edit <Text style={styles.highlight}>App.js</Text> to change this
              screen and then come back to see your edits.
            </Text>
            <Text>{username}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
