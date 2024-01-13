import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export interface currentUser {
  displayName: null | string;
  email: null | string;
  photoURL: null | string;
  uid: null | string;
}

export interface currentUserBulk {
  screenName: null | string;
  email: null | string;
  photoURL: null | string;
}

export interface LoginContextParams {
  currentUser: currentUser;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  currentUserBulk: currentUserBulk;
}

export interface LoginContextProp {
  children: ReactNode;
}

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

export const LoginContext = createContext<LoginContextParams>({
  currentUser: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  },
  accessToken: "",
  setAccessToken: () => {},
  currentUserBulk: {
    screenName: "",
    email: "",
    photoURL: "",
  },
});

export const AuthContextProvider: FC<LoginContextProp> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<currentUser>({
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  });
  const [currentUserBulk, setCurrentUserBulk] = useState<currentUserBulk>({
    screenName: "",
    email: "",
    photoURL: "",
  });

  const [accessToken, setAccessToken] = useState("");

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

        setCurrentUserBulk({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          screenName: (user as any).reloadUserInfo?.screenName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
        });
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
