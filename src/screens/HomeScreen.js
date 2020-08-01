import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ConversationList from '../components/ConversationList';

import {connect} from 'react-redux';
import {loadUser} from '../redux/actions/auth';
import {getConversations} from '../redux/actions/chat';

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // if user not logged in navigate to sign in screen
    // else fetch authenticated user
    // AsyncStorage.clear();
    AsyncStorage.getItem('logged_in').then((value) => {
      const isLoggedIn = JSON.parse(value);
      if (!isLoggedIn) {
        props.navigation.replace('SignIn');
      } else {
        props.loadUser().then((success) => {
          if (success) {
            props.getConversations();
          }
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <ConversationList
            navigation={this.props.navigation}
            conversations={this.props.conversations}
            username={this.props.currentUserUsername}
          />
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

const mapStateToProps = (state) => ({
  conversations: state.chat.conversations,
  currentUserUsername: state.auth.user && state.auth.user.username,
});

export default connect(mapStateToProps, {loadUser, getConversations})(
  HomeScreen,
);
