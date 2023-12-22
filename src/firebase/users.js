import { doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

//Check if user exitst in firebase user collection
export const doesUserExist = async (id) => {
  const docRef = doc(db, 'users', String(id));
  const docSnap = await docRef.get();
  return docSnap.exists();
};

//Add user to the firebase user collection
export const addUser = async (uid, displayName, nickName, email, photoURL) => {
  const docRef = doc(db, 'users', String(uid));
  await docRef.set({
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
  const docSnap = await docRef.get();
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
  const docRef = doc(db, 'users', String(uid));
  await docRef.update({
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
  await docRef.delete();
};
