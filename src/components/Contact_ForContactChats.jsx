import { useContext, useEffect, useState } from 'react';
import { NavContext } from '../pages/Home';
import { ChatContext } from '../context/ChatContext';
import { useFetchUser } from '../api/hooks';

const Contact_ForContactChats = ({
  userInfo,
  isSelected,
  lastMessage,
  lastMessageDate,
  onClick,
}) => {
  const { scrollToMessageSection } = useContext(NavContext);
  const { dispatch } = useContext(ChatContext);
  const [user, setUser] = useState(null);

  const darkBg = isSelected
    ? 'rounded-xl bg-C_DarkBlue shadow-lg shadow-C_DarkBlueShadow'
    : 'border-b-2 border-C_BorderLightBlue';

  //fetched user data
  const {
    data: userData,
    status: userStatus,
    error: userError,
  } = useFetchUser(userInfo?.login);

  //Update user's data
  useEffect(() => {
    if (userStatus === 'success') {
      setUser(userData);
    }
    if (userStatus === 'error') {
      if (userInfo) {
        console.log(userError);
      }
    }
  }, [userStatus, userData, userError, userInfo]);

  //When contact is selected :
  // 1. Change the background color
  // 2. Set the user in the chat context (ChatContext)
  // 2. Navigate to the message page

  const handleContactSelected = () => {
    //Set the user in the chat context
    dispatch({ type: 'CHANGE_CHAT_RECIPIENT', payload: user });

    //Navigate to the chat page
    scrollToMessageSection(true);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        handleContactSelected();
        onClick();
      }}
      className={`flex h-20 w-full flex-row items-center justify-between p-2 ${darkBg} `}
    >
      <div className="flex flex-row gap-2">
        <img
          src={userInfo?.avatar_url}
          alt=""
          className={`rounded-full border-2 border-C_Gold object-cover ${
            isSelected ? 'h-14 w-14 ' : 'h-12 w-12 '
          } `}
        />
        <div className="flex flex-col justify-center">
          <span
            className={`text-xs font-semibold ${
              isSelected ? 'text-C_TextWhite' : 'text-C_TextBlack'
            }`}
          >
            {userInfo?.login}
          </span>
          <span
            className={`text-[0.625rem] font-light  ${
              isSelected ? 'text-C_TextWhiteDull' : 'text-C_TextBlack'
            }`}
          >
            {lastMessage?.text}
          </span>
        </div>
      </div>
      <div
        className={`text-[0.625rem] font-normal ${
          isSelected ? 'text-C_TextWhite' : 'text-C_TextBlack'
        }`}
      >
        {lastMessageDate &&
          lastMessageDate.toDate().toLocaleDateString('en-US')}
      </div>
    </div>
  );
};

export default Contact_ForContactChats;
