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
});

export const AuthContextProvider: FC<LoginContextProp> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<currentUser>({
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  });

  const [accessToken, setAccessToken] = useState("");

  //checking for changes in current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.providerData[0]) {
        const userData = user.providerData[0];

        setCurrentUser({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          displayName: (user as any).reloadUserInfo?.screenName || "",
          email: userData.email || "",
          photoURL: userData.photoURL || "",
          uid: userData.uid || "",
        });
      } else {
        throw Error("user is undefined");
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const loginContextParams: LoginContextParams = {
    currentUser,
    accessToken,
    setAccessToken,
  };
  return (
    <LoginContext.Provider value={loginContextParams}>
      {children}
    </LoginContext.Provider>
  );
};
