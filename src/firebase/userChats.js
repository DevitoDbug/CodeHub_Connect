//CRUD for the list of chats for a given user in firebase

import { doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

//creat user in userChats as an empty object
export const createUserChats = async (uid) => {
  const docRef = doc(db, 'userChats', String(uid));
  await docRef.set({});
};

//get userChats from firebase
export const getUserChats = async (uid) => {
  const docRef = doc(db, 'userChats', String(uid));
  const docSnap = await docRef.get();
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
  const docRef = doc(db, 'userChats', String(userID));
  await docRef.update({
    [combinedID + '.userInfo']: {
      otherUserID,
      otherUserDisplayName,
      otherUserNickName,
      otherUserEmail,
      otherUserPhotoURL,
    },
    [combinedID + '.date']: serverTimestamp(),
  });
};

//delete userChats from firebase
export const deleteUserChats = async (uid) => {
  const docRef = doc(db, 'userChats', String(uid));
  await docRef.delete();
};

//Check if userChats exists in firebase
export const doesUserChatsExist = async (id) => {
  const docRef = doc(db, 'userChats', String(id));
  const docSnap = await docRef.get();
  return docSnap.exists();
};
