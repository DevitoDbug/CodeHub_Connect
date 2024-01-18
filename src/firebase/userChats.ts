//CRUD for the list of chats for a given user in firebase
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

interface UpdateUserChatsParams {
  userID: string;
  combinedID: string;
  otherUserID: string;
  otherUserDisplayName: string;
  otherUserEmail: string;
  otherUserPhotoURL: string;
}

interface UpdateLastMessageAndDateParams {
  userID: string;
  combinedID: string;
  lastMessage: string;
}

//creat user in userChats as an empty object
export const createUserChats = async (uid: string) => {
  await setDoc(doc(db, "userChats", String(uid)), {});
};

//get userChats from firebase
export const getUserChats = async (uid: string) => {
  const docRef = doc(db, "userChats", String(uid));
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

//update userChats in firebase.
export const updateUserChats = async ({
  userID,
  combinedID,
  otherUserID,
  otherUserDisplayName,
  otherUserEmail,
  otherUserPhotoURL,
}: UpdateUserChatsParams) => {
  await updateDoc(doc(db, "userChats", String(userID)), {
    [combinedID + ".userInfo"]: {
      id: otherUserID,
      displayName: otherUserDisplayName,
      email: otherUserEmail,
      photoURL: otherUserPhotoURL,
    },
    [combinedID + ".date"]: serverTimestamp(),
  });
};

//UpdateLastMessage in userChats in firebase
export const updateLastMessageAndDate = async ({
  userID,
  combinedID,
  lastMessage,
}: UpdateLastMessageAndDateParams) => {
  await updateDoc(doc(db, "userChats", String(userID)), {
    [combinedID + ".lastMessage"]: { text: lastMessage },
    [combinedID + ".date"]: serverTimestamp(),
  });
};

//Check if userChats exists in firebase
export const doesUserChatsExist = async (id: string) => {
  const docRef = doc(db, "userChats", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};
