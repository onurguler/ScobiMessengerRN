import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {getUserChatMessages} from '../redux/actions/chat';

export class ChatScreen extends Component {
  constructor(props) {
    super(props);
    const {username} = props.route.params;
    props.getUserChatMessages(username);
  }

  render() {
    return (
      <GiftedChat
        messages={
          this.props.currentChat && this.props.currentChat.messages
            ? this.props.currentChat.messages
            : []
        }
        // onSend={messages => onSend(messages)}
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

export default connect(mapStateToProps, {getUserChatMessages})(ChatScreen);
