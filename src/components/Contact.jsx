import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/AuthContext';
import { useFetchUser } from '../api/hooks';
import { addUser, doesUserExist } from '../firebase/users';
import { createUserChats } from '../firebase/userChats';
import { createChat, doesChatExist } from '../firebase/chat';
import { NavContext } from '../pages/Home';
import { SearchContext } from '../context/SearchContext';
import { ChatContext } from '../context/ChatContext';

const Contact = ({
  userInfo,
  isSelected,
  lastMessage,
  lastMessageDate,
  onClick,
}) => {
  const { currentUser } = useContext(LoginContext);
  const { scrollToMessageSection } = useContext(NavContext);
  const [, setSearchOpen] = useContext(SearchContext);
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
  } = useFetchUser(userInfo.login);

  //Update user's data
  useEffect(() => {
    if (userStatus === 'success') {
      setUser(userData);
    }
    if (userStatus === 'error') {
      console.log(userError);
    }
  }, [userStatus, userData, userError]);

  const combinedId =
    currentUser?.uid > user?.id
      ? currentUser?.uid + user?.id
      : user?.id + currentUser?.uid;

  const handleContactSelected = async () => {
    //Set the user in the chat context
    dispatch({ type: 'CHANGE_CHAT_RECIPIENT', payload: user });

    //Check to see if user is in the users collection
    const userExitst = await doesUserExist(user.id);
    if (!userExitst) {
      //Add user to the users collection
      //addUser (uid, displayName, nickName, email, photoURL)
      await addUser(
        user.id,
        user.name,
        user.login,
        user.email,
        user.avatar_url,
      );

      //Add user to the userChats collection
      //createUserChats(id)
      await createUserChats(user.id);
    }

    //Check to see if there is chat between our two users in the chats collection
    const chatExists = await doesChatExist(combinedId);
    if (!chatExists) {
      //Add chat to the chats collection
      //createChat(id)
      await createChat(combinedId);
    }

    //Navigate to the chat page
    scrollToMessageSection(true);
    setSearchOpen(false);
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
          src={user?.avatar_url}
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
            {user?.login}
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

export default Contact;
