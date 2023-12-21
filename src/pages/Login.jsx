import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth, db } from '../firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { LoginContext } from '../context/AuthContext';
const Login = () => {
  //navigate to home
  const navigate = useNavigate();

  const { setAccessToken } = useContext(LoginContext);

  const handleSignIn = async () => {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    setAccessToken(token);

    //Add user to the users collection
    try {
      await setDoc(
        doc(db, 'users', result.user.reloadUserInfo.providerUserInfo[0].rawId),
        {
          uid: result.user.reloadUserInfo.providerUserInfo[0].rawId,
          displayName: result.user.displayName,
          nickName: result.user.reloadUserInfo.providerUserInfo[0].screenName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        },
      );
    } catch (error) {
      console.log(error);
    }

    //Add the user to the userChats collection
    try {
      await setDoc(
        doc(
          db,
          'userChats',
          result.user.reloadUserInfo.providerUserInfo[0].rawId,
        ),
        {},
      );

      // Navigate to the home page after creating the userChat document
    } catch (e) {
      console.log('Adding user chat to firestore error:\n', e);
    }
    navigate('/');
  };

  return (
    <div className="flex h-[100svh] w-full flex-col items-center justify-center gap-3 bg-C_LightBlue text-lg md:h-[40%] md:w-[60%] md:gap-3 md:rounded-xl md:shadow-xl lg:h-[60%] lg:w-[30%]">
      <h2 className="text-xl text-C_TextBlack md:text-2xl lg:text-lg">Login</h2>
      <button
        onClick={handleSignIn}
        className="flex items-center justify-center gap-2 rounded-md bg-C_TextBlack p-2 text-white shadow-lg "
      >
        <FontAwesomeIcon className="text-xl" icon={faGithub} />
        Login with Github
      </button>
    </div>
  );
};

export default Login;
