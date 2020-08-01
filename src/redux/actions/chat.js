import axios from 'axios';
import {
  GET_CONVERSATIONS,
  GET_CHAT_MESSAGES,
  UPDATE_CURRENT_CHAT,
} from './types';
import {endPoint} from '../api';

// Get user's all conversations
export const getConversations = () => async (dispatch) => {
  try {
    const res = await axios.get(`${endPoint}/api/chat/conversations/`);
    dispatch({
      type: GET_CONVERSATIONS,
      payload: res.data,
    });
  } catch (err) {}
};

export const getUserChatMessages = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`${endPoint}/api/chat/user/${username}/`);

    let messages = [];

    let toUser = {};

    res.data.forEach((message) => {
      let newMessage = {
        _id: message.id,
        text: message.text,
        createdAt: new Date(message.created_at),
        user: {
          _id: message.owner.uuid,
          name: message.owner.first_name + ' ' + message.owner.last_name,
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      if (message.owner.username === username) {
        toUser.username = username;
        toUser.uuid = message.owner.uuid;
        toUser.firstName = message.owner.first_name;
        toUser.lastName = message.owner.last_name;
      }

      messages.push(newMessage);
    });

    dispatch({
      type: UPDATE_CURRENT_CHAT,
      payload: toUser,
    });

    dispatch({
      type: GET_CHAT_MESSAGES,
      payload: messages,
    });
  } catch (err) {}
};
