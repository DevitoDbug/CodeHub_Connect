import { FC, useContext, useState } from "react";
import { ChangeChatRecipient, addUser, doesUserExist } from "../firebase/users";
import { createUserChats } from "../firebase/userChats";
import { createChat, doesChatExist } from "../firebase/chat";
import { NavContext } from "../pages/Home";
import { SearchContext } from "../context/SearchContext";
import { ChatContext } from "../context/ChatContext";
import { UserInfo } from "firebase/auth";

interface ContactParams {
  userInfo: UserInfo;
  isSelected: boolean;
  onClick: () => void;
}

export const Contact: FC<ContactParams> = ({
  userInfo,
  isSelected,
  onClick,
}: ContactParams) => {
  const { scrollToMessageSection } = useContext(NavContext);
  const { setSearchOpen } = useContext(SearchContext);
  const { data, dispatch } = useContext(ChatContext);

  const [user, setUser] = useState<UserInfo>({
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    providerId: "github",
    uid: "",
  });

  const darkBg = isSelected
    ? "rounded-xl bg-C_DarkBlue shadow-lg shadow-C_DarkBlueShadow"
    : "border-b-2 border-C_BorderLightBlue";

  const handleContactSelected = async () => {
    if (!userInfo.displayName) {
      throw Error("User name is null");
    }
    ChangeChatRecipient(userInfo.displayName, dispatch);
    setUser(data.userInfo);

    //Check to see if user is in the users collection
    const userExitst = await doesUserExist(user.uid);
    if (!userExitst && user) {
      //Add user to the users collection
      //addUser (uid, displayName, nickName, email, photoURL)
      await addUser({
        uid: user.uid || "",
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });

      //Add user to the userChats collection
      //createUserChats(id)
      await createUserChats(user.uid);
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
          src={user.photoURL ? user.photoURL : ""}
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
            {user.displayName}
          </span>
        </div>
      </div>
    </div>
  );
};
