import { GithubAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

//Handle login to account with github
export const signInWithGithub = async (): Promise<User> => {
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);
  //   const credential = GithubAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  return result.user;
};
