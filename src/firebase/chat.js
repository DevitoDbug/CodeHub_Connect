//CRUD operations on the chat collection in firebase

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

//Create message in the chat as an empty array
export const createChat = async (uid) => {
  await setDoc(doc(db, 'chat', String(uid)), {
    messages: [],
  });
};

//Does chat exist in the chats collection in firebase
export const doesChatExist = async (id) => {
  const docRef = doc(db, 'chat', String(id));
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};
