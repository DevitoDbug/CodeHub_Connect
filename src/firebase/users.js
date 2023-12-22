import { doc } from 'firebase/firestore';
import { db } from '../firebase';

//Check if user exitst in firebase user collection
export const doesUserExist = async (id) => {
  const docRef = doc(db, 'users', id);
  const docSnap = await docRef.get();
  return docSnap.exists();
};

//Add user to the firebase user collection
export const addUser = async (uid, displayName, nickName, email, photoURL) => {
  const docRef = doc(db, 'users', uid);
  await docRef.set({
    displayName,
    nickName,
    email,
    photoURL,
    createdAt: new Date(),
  });
};

//Get user from firebase user collection
export const getUser = async (uid) => {
  const docRef = doc(db, 'users', uid);
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
  const docRef = doc(db, 'users', uid);
  await docRef.update({
    displayName,
    nickName,
    email,
    photoURL,
    updatedAt: new Date(),
  });
};

//Delete user from firebase user collection
export const deleteUser = async (uid) => {
  const docRef = doc(db, 'users', uid);
  await docRef.delete();
};
