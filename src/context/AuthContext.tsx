import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export interface currentUser {
  displayName: null | string;
  email: null | string;
  photoURL: null | string;
  uid: null | string;
}

export interface LoginContextParams {
  currentUser: currentUser;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  currentUserBulk: object;
}

export interface LoginContextProp {
  children: ReactNode;
}

export const LoginContext = createContext<LoginContextParams>({
  currentUser: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  },
  accessToken: "",
  setAccessToken: () => {},
  currentUserBulk: {},
});

export const AuthContextProvider: FC<LoginContextProp> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  });
  const [currentUserBulk, setCurrentUserBulk] = useState({});

  const [accessToken, setAccessToken] = useState("");

  //.providerData[0] has the following
  // displayName: null;
  // email: 'davidochiengy@gmail.com';
  // phoneNumber: null;
  // photoURL: 'https://avatars.githubusercontent.com/u/105533289?v=4';
  // providerId: 'github.com';
  // uid: '105533289';

  //checking for changes in current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.providerData[0]) {
        const userData = user.providerData[0];

        setCurrentUser({
          displayName: userData.displayName || "",
          email: userData.email || "",
          photoURL: userData.photoURL || "",
          uid: userData.uid || "",
        });

        setCurrentUserBulk(user);
      } else {
        throw Error("user is undefined");
      }
    });
    return () => {
      unsub();
    };
  }, []);

  // reloadUserInfo:
  // createdAt: ""
  // email: ""
  // emailVerified: false
  // lastLoginAt: ""
  // lastRefreshAt: ""
  // localId: ""
  // photoUrl: ""
  // providerUserInfo:
  // [{…}]
  // screenName: ""
  // validSince: ""

  const loginContextParams: LoginContextParams = {
    currentUser,
    accessToken,
    setAccessToken,
    currentUserBulk,
  };
  return (
    <LoginContext.Provider value={loginContextParams}>
      {children}
    </LoginContext.Provider>
  );
};
