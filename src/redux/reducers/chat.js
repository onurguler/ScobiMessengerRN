import {
  GET_CONVERSATIONS,
  CLEAR_CURRENT_CHAT,
  GET_CHAT_MESSAGES,
  UPDATE_CURRENT_CHAT,
  SEND_MESSAGE,
  UPDATE_CURRENT_CHAT_MESSAGES,
} from '../actions/types';

import {GiftedChat} from 'react-native-gifted-chat';

const initialState = {
  conversations: [],
  currentChat: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: payload,
      };
    case UPDATE_CURRENT_CHAT:
      return {
        ...state,
        currentChat: {...state.currentChat, toUser: payload},
      };
    case GET_CHAT_MESSAGES:
      return {
        ...state,
        currentChat: {...state.currentChat, messages: payload},
      };
    case CLEAR_CURRENT_CHAT:
      return {
        ...state,
        currentChat: {},
      };
    case UPDATE_CURRENT_CHAT_MESSAGES:
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: GiftedChat.append(state.currentChat.messages, [payload]),
        },
      };
    case SEND_MESSAGE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
