import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {
  getUserChatMessages,
  sendMessageToUser,
  addMessageToCurrentChat,
} from '../redux/actions/chat';
import {socketEndPoint} from '../redux/api';

export class ChatScreen extends Component {
  constructor(props) {
    super(props);
    const {username} = props.route.params;
    props.getUserChatMessages(username);

    AsyncStorage.getItem('token').then((token) => {
      const socket = new WebSocket(
        `${socketEndPoint}/chat/${username}/?token=${token}`,
      );

      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const message = JSON.parse(data.message);
        props.addMessageToCurrentChat(message);
      };
    });
  }

  onSend = (messages) => {
    const text = messages[0].text;
    const {username} = this.props.route.params;
    this.props.sendMessageToUser(username, text);
  };

  render() {
    return (
      <GiftedChat
        messages={
          this.props.currentChat && this.props.currentChat.messages
            ? this.props.currentChat.messages
            : []
        }
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id:
            this.props.auth &&
            this.props.auth.user &&
            this.props.auth.user.uuid,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  currentChat: state.chat.currentChat,
});

export default connect(mapStateToProps, {
  getUserChatMessages,
  sendMessageToUser,
  addMessageToCurrentChat,
})(ChatScreen);
