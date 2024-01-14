//CRUD operations on the chat collection in firebase

import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { handleError } from "../utils";

interface UploadTextParams {
  combinedId: string;
  currentUserId: string;
  text: string;
}
interface UploadImageAndTextParams {
  img: Blob | Uint8Array | ArrayBuffer;
  combinedId: string;
  currentUserId: string;
  text: string;
}

//Create message in the chat as an empty array
export const createChat = async (uid: string) => {
  await setDoc(doc(db, "chats", uid), {
    messages: [],
  });
};

//Does chat exist in the chats collection in firebase
export const doesChatExist = async (id: string) => {
  const docRef = doc(db, "chats", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

//Upload text message to the chat collection in firebase
export const uploadText = async ({
  combinedId,
  currentUserId,
  text,
}: UploadTextParams) => {
  await updateDoc(doc(db, "chats", combinedId), {
    messages: arrayUnion({
      id: uuid(),
      text,
      senderId: currentUserId,
      date: Timestamp.now(),
    }),
  });
};

//Upload text and image message to the chat collection in firebase
export const uploadImageAndText = async ({
  img,
  combinedId,
  currentUserId,
  text,
}: UploadImageAndTextParams) => {
  const storageRef = ref(storage, uuid());
  const uploadTask = uploadBytesResumable(storageRef, img);

  uploadTask.on(
    "state_changed",
    () => {},
    (err) => {
      console.log(
        "There  was a failure on the upload\n ERROR: ",
        handleError(err)
      );
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            imageURL: downloadURL,
            senderId: currentUserId,
            date: Timestamp.now(),
          }),
        });
      });
    }
  );
};
