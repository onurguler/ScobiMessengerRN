import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ConversationList from '../components/ConversationList';

export class HomeScreen extends Component {
  state = {
    username: '',
    token: '',
    conversations: [],
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
            .then((response) => {
              if (response.status === 401) {
                AsyncStorage.setItem('logged_in', JSON.stringify(false)).then(
                  () => {
                    Alert.alert(
                      'Error',
                      'Your auth session ended. Please sign in again.',
                    );
                    // this.props.navigation.popToTop();
                    this.props.navigation.replace('SignIn');
                  },
                );
                return null;
              } else {
                return response.json();
              }
            })
            .then((data) => {
              if (data === null) {
                return;
              }

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

          fetch('http://192.168.1.106:8000/api/chat/conversations/', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          })
            .then((response) => {
              if (response.status === 401) {
                AsyncStorage.setItem('logged_in', JSON.stringify(false)).then(
                  () => {
                    Alert.alert(
                      'Error',
                      'Your auth session ended. Please sign in again.',
                    );
                    // this.props.navigation.popToTop();
                    this.props.navigation.replace('SignIn');
                  },
                );
                return null;
              } else {
                return response.json();
              }
            })
            .then((data) => {
              if (data === null) {
                return;
              }

              this.setState({conversations: data});
            })
            .catch((error) => {
              console.warn(error);
            });
        });
      }
    });
  }

  render() {
    const {username, conversations} = this.state;

    return (
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <ConversationList conversations={conversations} username={username} />
        </View>
      </View>
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
  sectionContainer: {},
});

export default HomeScreen;
