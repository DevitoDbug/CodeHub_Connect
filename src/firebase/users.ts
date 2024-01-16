import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserInfo } from "firebase/auth";

interface UpdateUserParams {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

// interface Contact {
//   followers: UserInfo[];
//   following: UserInfo[];
//}

//Check if user exitst in firebase user collection
export const doesUserExist = async (id: string) => {
  //Check if the user is in the user collection in fireabase
  const docRef = doc(db, "users", String(id));
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

//Add user to the firebase user collection
export const addUser = async ({
  uid,
  displayName,
  email,
  photoURL,
}: UserInfo) => {
  await setDoc(doc(db, "users", String(uid)), {
    displayName,
    email,
    photoURL,
    createdAt: serverTimestamp(),
  });
};

//Get user from firebase user collection
export const getUser = async (uid: string) => {
  const docRef = doc(db, "users", String(uid));
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

//Update user in firebase user collection
export const updateUser = async ({
  uid,
  displayName,
  email,
  photoURL,
}: UpdateUserParams) => {
  await updateDoc(doc(db, "users", uid), {
    displayName,
    email,
    photoURL,
    updatedAt: serverTimestamp(),
  });
};

//Delete user from firebase user collection
export const deleteUser = async (uid: string) => {
  const docRef = doc(db, "users", String(uid));

  await updateDoc(docRef, {
    displayName: deleteField(),
    nickName: deleteField(),
    email: deleteField(),
    photoURL: deleteField(),
    updatedAt: serverTimestamp(),
  });
};

// export const ChangeChatRecipient = (
//   name: UserInfo,
//   dispatch: React.Dispatch<ChangeChatRecipientAction>
// ) => {
//   dispatch({ type: "CHANGE_CHAT_RECIPIENT", payload: name });
// };

// export const useFetchContacts = (name: string): Contact => {
//   if (name === null) {
//     throw Error("There is no user name to fetch data");
//   }

//   let followers: UserInfo[] = [];
//   let following: UserInfo[] = [];

//   const {
//     data: followersData,
//     status: followersStatus,
//     error: followersError,
//   } = useFetchFollowers(name);

//   //Following data
//   const {
//     data: followingData,
//     status: followingStatus,
//     error: followingError,
//   } = useFetchFollowing(name);

//   if (followersStatus === "success") {
//     followers = followersData;
//   }
//   if (followersStatus === "error") {
//     throw Error(followersError.message);
//   }

//   if (followingStatus === "success") {
//     following = followingData;
//   }
//   if (followingStatus === "error") {
//     throw Error(followingError.message);
//   }
//   return { followers, following };
// };
