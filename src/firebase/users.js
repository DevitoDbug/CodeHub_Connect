import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

//Check if user exitst in firebase user collection
export const doesUserExist = async (id) => {
  //Check if the user is in the user collection in fireabase
  const docRef = doc(db, 'users', String(id));
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

//Add user to the firebase user collection
export const addUser = async (uid, displayName, nickName, email, photoURL) => {
  await setDoc(doc(db, 'users', String(uid)), {
    displayName,
    nickName,
    email,
    photoURL,
    createdAt: serverTimestamp(),
  });
};

//Get user from firebase user collection
export const getUser = async (uid) => {
  const docRef = doc(db, 'users', String(uid));
  const docSnap = await docRef.getDoc();
  return docSnap.data();
};

//Update user in firebase user collection
export const updateUser = async (
  uid,
  displayName,
  nickName,
  email,
  photoURL,
) => {
  await updateDoc(doc(db, 'users', String(uid)), {
    displayName,
    nickName,
    email,
    photoURL,
    updatedAt: serverTimestamp(),
  });
};

//Delete user from firebase user collection
export const deleteUser = async (uid) => {
  const docRef = doc(db, 'users', String(uid));

  await updateDoc(docRef, {
    displayName: deleteField(),
    nickName: deleteField(),
    email: deleteField(),
    photoURL: deleteField(),
    updatedAt: serverTimestamp(),
  });
};
