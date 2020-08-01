import {
  GET_CONVERSATIONS,
  CLEAR_CURRENT_CHAT,
  GET_CHAT_MESSAGES,
  UPDATE_CURRENT_CHAT,
} from '../actions/types';

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
    default:
      return state;
  }
}
