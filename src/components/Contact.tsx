import { useContext, useState } from "react";
import { ChangeChatRecipient, addUser, doesUserExist } from "../firebase/users";
import { createUserChats } from "../firebase/userChats";
import { createChat, doesChatExist } from "../firebase/chat";
import { NavContext } from "../pages/Home";
import { SearchContext } from "../context/SearchContext";
import { ChatContext, UserInfo } from "../context/ChatContext";

interface ContactParams {
  userInfo: UserInfo;
  isSelected: boolean;
  onClick: () => void;
}

export const Contact = ({ userInfo, isSelected, onClick }: ContactParams) => {
  const { scrollToMessageSection } = useContext(NavContext);
  const { setSearchOpen } = useContext(SearchContext);
  const { data, dispatch } = useContext(ChatContext);

  const [user, setUser] = useState<UserInfo>({
    id: "",
    name: "",
    login: "",
    email: "",
    avatar_url: "",
  });

  const darkBg = isSelected
    ? "rounded-xl bg-C_DarkBlue shadow-lg shadow-C_DarkBlueShadow"
    : "border-b-2 border-C_BorderLightBlue";

  const handleContactSelected = async () => {
    ChangeChatRecipient(userInfo.login, dispatch);
    setUser(data.userInfo);

    //Check to see if user is in the users collection
    const userExitst = await doesUserExist(user.id);
    if (!userExitst && user) {
      //Add user to the users collection
      //addUser (uid, displayName, nickName, email, photoURL)
      await addUser({
        uid: user.id,
        displayName: user.name,
        nickName: user.login,
        email: user.email,
        photoURL: user.avatar_url,
      });

      //Add user to the userChats collection
      //createUserChats(id)
      await createUserChats(user.id);
    }

    //Check to see if there is chat between our two users in the chats collection
    const chatExists = await doesChatExist(data.combinedId);
    if (!chatExists) {
      //Add chat to the chats collection
      //createChat(id)
      await createChat(data.combinedId);
    }

    //Navigate to the chat page
    scrollToMessageSection();
    setSearchOpen(false);
  };
  return (
    <div
      onClick={() => {
        handleContactSelected();
        onClick();
      }}
      className={`flex h-20 w-full flex-row items-center justify-between p-2 ${darkBg} `}
    >
      <div className="flex flex-row gap-2">
        <img
          src={user?.avatar_url}
          alt=""
          className={`rounded-full border-2 border-C_Gold object-cover ${
            isSelected ? "h-14 w-14 " : "h-12 w-12 "
          } `}
        />
        <div className="flex flex-col justify-center">
          <span
            className={`text-xs font-semibold ${
              isSelected ? "text-C_TextWhite" : "text-C_TextBlack"
            }`}
          >
            {user?.login}
          </span>
        </div>
      </div>
    </div>
  );
};
