import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { LoginContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { NavContext } from '../pages/Home';

const Contact = ({
  user,
  isSelected,
  lastMessage,
  lastMessageDate,
  onClick,
}) => {
  const [, setSearchPanelOpen] = useContext(SearchContext);
  const { currentUser } = useContext(LoginContext);
  const currentUserNickName = currentUser?.reloadUserInfo?.screenName;
  const currentUserUid = currentUser.providerData[0].uid;
  const currentUserDisplayName = currentUser?.reloadUserInfo?.displayName;
  const currentUserPhotoURL = currentUser?.reloadUserInfo?.photoURL;

  const { dispatch } = useContext(ChatContext);
  const { scrollToMessageSection } = useContext(NavContext);

  const darkBg = isSelected
    ? 'rounded-xl bg-C_DarkBlue shadow-lg shadow-C_DarkBlueShadow'
    : 'border-b-2 border-C_BorderLightBlue';

  const combinedId =
    currentUserUid > user.uid
      ? currentUserUid + user.uid
      : user.uid + currentUserUid;

  const handleSelect = async () => {
    setSearchPanelOpen(false);

    //setting chat context
    dispatch({ type: 'CHANGE_CHAT_RECIPIENT', payload: user });

    //Checking if there exist a chat between user and selected contact
    //Also check if user is trying to make a chat to himself
    const docRef = doc(db, 'chats', combinedId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists() && user.uid != currentUserUid) {
      //create that chat
      await setDoc(doc(db, 'chats', combinedId), { message: [] });
      //Adding user to userChats for both communicators
      try {
        await updateDoc(doc(db, 'userChats', currentUserUid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            nickName: user.nickName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }

      try {
        //We update the userChats for the receiver of the text
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUserUid,
            nickName: currentUserNickName,
            displayName: currentUserDisplayName,
            photoURL: currentUserPhotoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }

    //Navigaiton to messages
    scrollToMessageSection();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        handleSelect();
        onClick();
      }}
      className={`flex h-20 w-full flex-row items-center justify-between p-2 ${darkBg} `}
    >
      <div className="flex flex-row gap-2">
        <img
          src={user.photoURL}
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
            {user.nickName}
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
