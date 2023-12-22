//CRUD operations on the chat collection in firebase

import { doc } from 'firebase/firestore';
import { db } from '../firebase';

//Create message in the chat as an empty array
export const createMessage = async (uid) => {
  const docRef = doc(db, 'chat', String(uid));
  await docRef.set({
    messages: [],
  });
};
