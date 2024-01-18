import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { signInWithGithub } from "../firebase/login.js";
import { addUser, doesUserExist, updateUser } from "../firebase/users.js";
import { createUserChats } from "../firebase/userChats.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";
import { FC, useState } from "react";

export const Login: FC = () => {
  //navigate to home
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    //Sign in with github
    const loggedInUser = await signInWithGithub();
    const loggedInUserUid = loggedInUser.providerData[0].uid;
    const loggedInUserDisplayName =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (loggedInUser as any).reloadUserInfo.screenName;
    const loggedInUserEmail = loggedInUser.email;
    const loggedInUserPhotoURL = loggedInUser.photoURL;

    //Add user to the users collection
    const doesUserExistInDb = await doesUserExist(loggedInUserUid);

    if (doesUserExistInDb) {
      if (
        loggedInUserDisplayName &&
        loggedInUserEmail &&
        loggedInUserPhotoURL
      ) {
        updateUser({
          uid: loggedInUserUid,
          displayName: loggedInUserDisplayName,
          email: loggedInUserEmail,
          photoURL: loggedInUserPhotoURL,
        });
      }
      navigate("/");
    } else {
      if (
        loggedInUserDisplayName &&
        loggedInUserEmail &&
        loggedInUserPhotoURL
      ) {
        await addUser({
          uid: loggedInUserUid,
          displayName: loggedInUserDisplayName,
          email: loggedInUserEmail,
          photoURL: loggedInUserPhotoURL,
        });
      }
      await createUserChats(loggedInUserUid);
    }

    //Navigate to home
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="flex h-[100svh] w-full flex-col items-center justify-center gap-3 bg-C_LightBlue text-lg md:h-[40%] md:w-[60%] md:gap-3 md:rounded-xl md:shadow-xl lg:h-[60%] lg:w-[30%]">
      {/* Display the loading spinner when loading is true */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className="text-xl text-C_TextBlack md:text-2xl lg:text-lg">
            Login
          </h2>
          <button
            onClick={handleSignIn}
            className="flex items-center justify-center gap-2 rounded-md bg-C_TextBlack p-2 text-white shadow-lg "
          >
            <FontAwesomeIcon className="text-xl" icon={faGithub} />
            Login with Github
          </button>
        </>
      )}
    </div>
  );
};
