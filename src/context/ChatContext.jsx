import React, { createContext, useContext, useReducer } from 'react';
import { LoginContext } from './AuthContext';

export const ChatContext = createContext();

const ChatContextProider = ({ children }) => {
  const { currentUser } = useContext(LoginContext);

  const reducer = (state, action) => {
    const currentUserUid = currentUser.providerData[0].uid;
    switch (action.type) {
      case 'CHANGE_CHAT_RECIPIENT':
        return {
          userInfo: action.payload,
          combinedId:
            currentUserUid > action.payload.uid
              ? currentUserUid + action.payload.uid
              : action.payload.uid + currentUserUid,
        };
      default:
        throw new Error('That action type is not defined');
    }
  };

  const INITIAL_STATE = {
    combinedId: 'null',
    userInfo: {},
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProider;
