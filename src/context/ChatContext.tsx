import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import { LoginContext } from "./AuthContext";
import { UserInfo } from "firebase/auth";

export interface ChatContextProider {
  children: ReactNode;
}
export interface ChatState {
  userInfo: UserInfo;
  combinedId: string;
}

export interface ChangeChatRecipientAction {
  type: "CHANGE_CHAT_RECIPIENT";
  payload: UserInfo;
}

export interface ChatContextParams {
  data: ChatState;
  dispatch: React.Dispatch<ChangeChatRecipientAction>;
}

export const ChatContext = createContext<ChatContextParams>({
  data: {
    userInfo: {} as UserInfo,
    combinedId: "null",
  },
  dispatch: () => {},
});

export const ChatContextProider: FC<ChatContextProider> = ({ children }) => {
  const { currentUser } = useContext(LoginContext);

  const reducer = (state: ChatState, action: ChangeChatRecipientAction) => {
    const currentUserUid: string | null = currentUser.uid;

    if (currentUserUid === null) {
      throw new Error("Current user ID is null");
    }

    switch (action.type) {
      case "CHANGE_CHAT_RECIPIENT":
        return {
          //setting user to the userInfo field
          //setting the combinedId
          userInfo: action.payload,
          combinedId:
            currentUserUid > action.payload.uid
              ? currentUserUid + action.payload.uid
              : action.payload.uid + currentUserUid,
        };
      default:
        throw new Error("That action type is not defined");
    }
  };

  const INITIAL_STATE = {
    combinedId: "null",
    userInfo: {} as UserInfo,
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
