//CRUD for the list of chats for a given user in firebase
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

//creat user in userChats as an empty object
export const createUserChats = async (uid) => {
  await setDoc(doc(db, 'userChats', String(uid)), {});
};

//get userChats from firebase
export const getUserChats = async (uid) => {
  const docRef = doc(db, 'userChats', String(uid));
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

//update userChats in firebase.
export const updateUserChats = async (
  userID,
  combinedID,
  otherUserID,
  otherUserDisplayName,
  otherUserNickName,
  otherUserEmail,
  otherUserPhotoURL,
) => {
  await updateDoc(doc(db, 'userChats', String(userID)), {
    [combinedID + '.userInfo']: {
      id: otherUserID,
      name: otherUserDisplayName,
      login: otherUserNickName,
      email: otherUserEmail,
      avatar_url: otherUserPhotoURL,
    },
    [combinedID + '.date']: serverTimestamp(),
  });
};

//UpdateLastMessage in userChats in firebase
export const updateLastMessageAndDate = async (
  userID,
  combinedID,
  lastMessage,
) => {
  await updateDoc(doc(db, 'userChats', String(userID)), {
    [combinedID + '.lastMessage']: { text: lastMessage },
    [combinedID + '.date']: serverTimestamp(),
  });
};

//Check if userChats exists in firebase
export const doesUserChatsExist = async (id) => {
  const docRef = doc(db, 'userChats', String(id));
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};
