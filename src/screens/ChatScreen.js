import React, {Component} from 'react';
import {Text, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {GiftedChat} from 'react-native-gifted-chat';

export class ChatScreen extends Component {
  state = {
    username: '',
    messages: [],
    uuid: '',
  };

  componentWillMount() {
    const {username} = this.props.route.params;
    this.setState({username});
    AsyncStorage.getItem('token').then((token) => {
      fetch('http://192.168.1.106:8000/api/chat/user/' + username + '/', {
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

          AsyncStorage.getItem('uuid').then((user_uuid) => {
            this.setState({uuid: user_uuid});
            let messages = [];
            data.forEach((message) => {
              let newMessage = {
                _id: message.id,
                text: message.text,
                createdAt: new Date(message.created_at),
                user: {
                  _id: message.owner.uuid,
                  name:
                    message.owner.first_name + ' ' + message.owner.last_name,
                  avatar: 'https://placeimg.com/140/140/any',
                },
              };

              messages.push(newMessage);

              this.setState({messages});
            });
          });
        })
        .catch((error) => {
          console.warn(error);
        });
    });
  }

  render() {
    const {username, messages, uuid} = this.state;
    return (
      <GiftedChat
        messages={messages}
        // onSend={messages => onSend(messages)}
        user={{
          _id: uuid,
        }}
      />
    );
  }
}

export default ChatScreen;
