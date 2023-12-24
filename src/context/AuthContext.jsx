import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const LoginContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserBulk, setCurrentUserBulk] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

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
      setCurrentUser(user?.providerData[0]);
      setCurrentUserBulk(user);
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

  return (
    <LoginContext.Provider
      value={{ currentUser, accessToken, setAccessToken, currentUserBulk }}
    >
      {children}
    </LoginContext.Provider>
  );
};
