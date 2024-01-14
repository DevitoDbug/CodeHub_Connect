import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { LoginContext } from "../context/AuthContext";

export const NavBar: FC = () => {
  const { currentUser } = useContext(LoginContext);

  const name = currentUser?.displayName;
  const profilePic = currentUser?.photoURL;

  const [isLoggedIn, setIsloggedIn] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    setIsloggedIn(false);
    navigate("/login");
  };
  return (
    <div className="m-1 flex h-[90%] flex-row items-center justify-between gap-2 rounded-xl bg-C_LightBlue px-1 py-1 ">
      <h1 className="ml-1 flex flex-col text-xl font-bold text-C_TextBlack">
        CodeHub
        <div className="m-0 h-1 w-[85%] animate-pulse rounded-xl bg-C_DarkBlue"></div>
      </h1>
      <div className="flex flex-row justify-around gap-2">
        <img
          className="h-10 w-10 rounded-full border-2 border-C_Gold "
          src={profilePic || ""}
          alt=""
        />
        <div className="items-left flex flex-col">
          <h2 className="w-[6.625rem] font-semibold text-C_TextBlack ">
            {name}
          </h2>
          <button
            onClick={handleSignOut}
            className="flex w-[90%] items-center justify-between rounded-3xl bg-C_DarkBlue px-2 py-1 text-sm font-thin text-C_TextWhite md:p-2 "
          >
            <span className="">log Out</span>
            <FontAwesomeIcon
              icon={isLoggedIn ? faToggleOff : faToggleOn}
              className="ml-2 text-C_Gold"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
