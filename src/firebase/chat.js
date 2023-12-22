//CRUD operations on the chat collection in firebase

import { doc } from 'firebase/firestore';
import { db } from '../firebase';

//Create message in the chat as an empty array
export const createChat = async (uid) => {
  const docRef = doc(db, 'chat', String(uid));
  await docRef.set({
    messages: [],
  });
};

//Does chat exist in the chats collection in firebase
export const doesChatExist = async (id) => {
  const docRef = doc(db, 'chat', String(id));
  const docSnap = await docRef.get();
  return docSnap.exists();
};
