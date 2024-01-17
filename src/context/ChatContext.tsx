import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import { LoginContext } from "./AuthContext";
import { UserInfo } from "firebase/auth";

export interface ChatContextProiderParams {
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
    combinedId: "",
  },
  dispatch: () => {},
});

export const ChatContextProider: FC<ChatContextProiderParams> = ({
  children,
}) => {
  const { currentUser } = useContext(LoginContext);

  const reducer = (_state: ChatState, action: ChangeChatRecipientAction) => {
    const currentUserUid = currentUser.uid;
    if (currentUserUid === null) {
      throw new Error("Current user ID is null");
    } else {
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
    }
  };

  const INITIAL_STATE = {
    combinedId: "",
    userInfo: {} as UserInfo,
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
