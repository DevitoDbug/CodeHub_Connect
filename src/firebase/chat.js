//CRUD operations on the chat collection in firebase

import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

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

//Upload text message to the chat collection in firebase
export const uploadText = async (combinedId, currentUserId, text) => {
  await updateDoc(doc(db, 'chats', combinedId), {
    messages: arrayUnion({
      id: uuid(),
      text,
      senderId: currentUserId,
      date: Timestamp.now(),
    }),
  });
};

//Upload text and image message to the chat collection in firebase
export const uploadImageAndText = async (
  img,
  combinedId,
  currentUserId,
  text,
) => {
  const storageRef = ref(storage, uuid());
  const uploadTask = uploadBytesResumable(storageRef, img);

  uploadTask.on(
    (error) => {
      console.log('There  was a failure on the upload\n ERROR: ', error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateDoc(doc(db, 'chats', combinedId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            imageURL: downloadURL,
            senderId: currentUserId,
            date: Timestamp.now(),
          }),
        });
      });
    },
  );
};
