import { FC, useContext } from "react";
import { addUser, doesUserExist } from "../firebase/users";
import { createUserChats } from "../firebase/userChats";
import { createChat, doesChatExist } from "../firebase/chat";
import { NavContext } from "../pages/Home";
import { SearchContext } from "../context/SearchContext";
import { ChatContext } from "../context/ChatContext";
import { UserInfo } from "firebase/auth";
import { LoginContext } from "../context/AuthContext";

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
  const { currentUser } = useContext(LoginContext);
  const { scrollToMessageSection } = useContext(NavContext);
  const { setSearchOpen } = useContext(SearchContext);
  const { dispatch } = useContext(ChatContext);

  const darkBg = isSelected
    ? "rounded-xl bg-C_DarkBlue shadow-lg shadow-C_DarkBlueShadow"
    : "border-b-2 border-C_BorderLightBlue";

  const handleContactSelected = async () => {
    if (!userInfo.displayName) {
      throw Error("User name is null");
    }

    //Change recepient
    dispatch({ type: "CHANGE_CHAT_RECIPIENT", payload: userInfo });

    //Check to see if user is in the users collection
    const userExitst = await doesUserExist(userInfo.uid);
    if (!userExitst) {
      //Add user to the users collection
      await addUser(userInfo);

      //Add user to the userChats collection
      await createUserChats(userInfo.uid);
    }

    if (currentUser.uid && userInfo.uid) {
      const combinedId =
        currentUser.uid > userInfo.uid
          ? currentUser?.uid + userInfo.uid
          : userInfo.uid + currentUser.uid;

      const chatExists = await doesChatExist(combinedId); //null for data
      if (!chatExists) {
        //Add chat to the chats collection
        await createChat(combinedId);
      }
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
          src={userInfo.photoURL ? userInfo.photoURL : ""}
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
            {userInfo.displayName}
          </span>
        </div>
      </div>
    </div>
  );
};
