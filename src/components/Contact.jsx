import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
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
  const { dispatch } = useContext(ChatContext);
  const { scrollToMessageSection } = useContext(NavContext);

  const darkBg = isSelected
    ? 'rounded-xl bg-C_DarkBlue shadow-lg shadow-C_DarkBlueShadow'
    : 'border-b-2 border-C_BorderLightBlue';

  const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

  const handleSelect = async () => {
    setSearchPanelOpen(false);

    //setting chat context
    dispatch({ type: 'CHANGE_CHAT_RECIPIENT', payload: user });

    //Getting info about the currently loged in  user
    let currentUserDetails;
    const q = query(
      collection(db, 'users'),
      where('firstName', '==', currentUser.displayName),
    );

    try {
      //Searching for a user from firebase
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        currentUserDetails = doc.data();
      });
    } catch (e) {
      console.log('Fetching data from firestore error: ', e);
    }

    //Checking if there exist a chat between user and selected contact
    //Also check if user is trying to make a chat to himself
    const docRef = doc(db, 'chats', combinedId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists() && user.uid != currentUser.uid) {
      //create that chat
      await setDoc(doc(db, 'chats', combinedId), { message: [] });
      //Adding user to userChats for both communicators
      try {
        await updateDoc(
          doc(db, 'userChats', currentUserDetails.uid),
          {
            [combinedId + '.userInfo']: {
              uid: user.uid,
              firstName: user.firstName,
              secondName: user.secondName,
              photoURL: user.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          },
        );
      } catch (error) {
        console.log(error);
      }
      try {
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUserDetails.uid,
            firstName: currentUserDetails.firstName,
            secondName: currentUserDetails.secondName,
            photoURL: currentUserDetails.photoURL,
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
            {user.firstName}
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
