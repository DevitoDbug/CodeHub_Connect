import { FC, useContext } from "react";
import { NavContext } from "../pages/Home";
import { ChatContext } from "../context/ChatContext";
import { Timestamp } from "firebase/firestore";
import { UserInfo } from "firebase/auth";

interface Contact_ForContactChatsParams {
  userInfo: UserInfo;
  isSelected: boolean;
  lastMessage: string;
  lastMessageDate: Timestamp;
  onClick: () => void;
}

export const Contact_ForContactChats: FC<Contact_ForContactChatsParams> = ({
  userInfo,
  isSelected,
  lastMessage,
  lastMessageDate,
  onClick,
}) => {
  const { scrollToMessageSection } = useContext(NavContext);
  const { dispatch } = useContext(ChatContext);

  const darkBg = isSelected
    ? "rounded-xl bg-C_DarkBlue shadow-lg shadow-C_DarkBlueShadow"
    : "border-b-2 border-C_BorderLightBlue";

  const handleContactSelected = () => {
    if (!userInfo.displayName) {
      throw Error("Selected user is null");
    }
    //Change recepient
    dispatch({ type: "CHANGE_CHAT_RECIPIENT", payload: userInfo });

    scrollToMessageSection();
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
          src={userInfo?.photoURL || ""}
          alt="profile"
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
            {userInfo?.displayName}
          </span>
          <span
            className={`text-[0.625rem] font-light  ${
              isSelected ? "text-C_TextWhiteDull" : "text-C_TextBlack"
            }`}
          >
            {lastMessage}
          </span>
        </div>
      </div>
      <div
        className={`text-[0.625rem] font-normal ${
          isSelected ? "text-C_TextWhite" : "text-C_TextBlack"
        }`}
      >
        {lastMessageDate &&
          lastMessageDate.toDate().toLocaleDateString("en-US")}
      </div>
    </div>
  );
};
