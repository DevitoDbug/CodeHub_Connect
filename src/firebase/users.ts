import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChangeChatRecipientAction } from "../context/ChatContext";
import {
  useFetchFollowers,
  useFetchFollowing,
  useFetchUser,
} from "../api/hooks";
import { UserInfo } from "firebase/auth";

interface addUserParams {
  uid: string;
  displayName: string;
  nickName: string;
  email: string;
  photoURL: string;
}

interface updateUserParams {
  uid: string;
  displayName: string;
  nickName: string;
  email: string;
  photoURL: string;
}

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
  nickName,
  email,
  photoURL,
}: addUserParams) => {
  await setDoc(doc(db, "users", String(uid)), {
    displayName,
    nickName,
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
  nickName,
  email,
  photoURL,
}: updateUserParams) => {
  await updateDoc(doc(db, "users", uid), {
    displayName,
    nickName,
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

export const ChangeChatRecipient = (
  name: string,
  dispatch: React.Dispatch<ChangeChatRecipientAction>
) => {
  //fetched user data
  const {
    data: userData,
    status: userStatus,
    error: userError,
  } = useFetchUser(name);

  if (userStatus === "success") {
    dispatch({ type: "CHANGE_CHAT_RECIPIENT", payload: userData });
  }
  if (userStatus === "error") {
    throw Error(userError.message);
  }
};

export const FetchContacts = (name: string) => {
  if (name === null) {
    throw Error("There is no user name to fetch data");
  }
  //UserInfo
  //  displayName: null,
  // email: null,
  // phoneNumber: null,
  // photoURL: null,
  // providerId: "",
  // uid: "",

  let contacts: UserInfo[] = [];
  const {
    data: followersData,
    status: followersStatus,
    error: followersError,
  } = useFetchFollowers(name);

  //Following data
  const {
    data: followingData,
    status: followingStatus,
    error: followingError,
  } = useFetchFollowing(name);

  if (followersStatus === "success") {
    contacts = [...(Object.values(followersData) as UserInfo[])];
  }
  if (followersStatus === "error") {
    throw Error(followersError?.message);
  }

  if (followingStatus === "success") {
    contacts = [...contacts, ...(Object.values(followingData) as UserInfo[])];
  }
  if (followingStatus === "error") {
    throw Error(followingError?.message);
  }
  return contacts;
};
