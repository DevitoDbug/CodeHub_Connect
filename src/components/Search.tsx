import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { Contact } from "./Contact";
import { LoginContext } from "../context/AuthContext";
import { UserInfo } from "firebase/auth";
import { useFetchFollowers, useFetchFollowing } from "../api/hooks";

export const Search: FC = () => {
  const { currentUser } = useContext(LoginContext);
  const { setSearchOpen } = useContext(SearchContext);
  const [isActive, setIsActive] = useState("");
  const [followers, setFollowers] = useState<UserInfo[]>([]);
  const [following, setFollowing] = useState<UserInfo[]>([]);
  const [toggleContactList, setToggleContactList] = useState(true);

  //Followers data
  const {
    data: followersData,
    status: followersStatus,
    error: followersError,
  } = useFetchFollowers(currentUser?.displayName || "");

  //Following data
  const {
    data: followingData,
    status: followingStatus,
    error: followingError,
  } = useFetchFollowing(currentUser?.displayName || "");

  //Update following data
  useEffect(() => {
    if (followersStatus === "success") {
      setFollowers(Object.values(followersData));
    }
    if (followersStatus === "error") {
      console.error(followersError);
    }
  }, [followersStatus, followersData, followersError]);

  //Update followers data
  useEffect(() => {
    if (followingStatus === "success") {
      setFollowing(Object.values(followingData));
    }
    if (followingStatus === "error") {
      console.error(followingError);
    }
  }, [followingStatus, followingData, followingError]);

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleContactClick = (id: string) => {
    setIsActive(id);
  };

  return (
    <div className="absolute left-[10%] top-[10%] flex h-[40%] w-[80%] flex-col items-center rounded-lg bg-[#bae9f8] px-1 py-2 shadow-lg md:left-[30%] md:w-[50%] lg:left-[30%] lg:top-[20%] lg:h-[50%] lg:w-[40%]">
      <div className="flex w-full items-start justify-between ">
        <div className="flex gap-3 p-2">
          <button
            className={`self-end rounded-xl border-2 border-C_BorderBlackFade px-3 py-1 text-[105%] font-bold text-C_TextBlackFade transition-transform duration-300 ease-in-out first-letter:capitalize 
            ${
              toggleContactList
                ? "scale-110 border-none bg-C_DarkBlue text-C_TextWhiteDull"
                : ""
            } `}
            onClick={() => setToggleContactList(true)}
          >
            Folowers
          </button>
          <button
            className={`self-end rounded-xl border-2 border-C_BorderBlackFade px-3 py-1 text-[105%] font-bold text-C_TextBlackFade transition-transform duration-300 ease-in-out first-letter:capitalize
            ${
              !toggleContactList
                ? "scale-110 border-none bg-C_DarkBlue text-C_TextWhiteDull"
                : ""
            } 
            `}
            onClick={() => setToggleContactList(false)}
          >
            Following
          </button>
        </div>

        <button
          onClick={handleCloseSearch}
          className=" self-start  pr-2 text-[170%] font-bold text-C_GreyBorder"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className="h-full w-full overflow-y-scroll bg-[#bae9f8f5]">
        {toggleContactList ? (
          followers ? (
            followers?.map((follower) => {
              return (
                <Contact
                  key={follower.uid}
                  userInfo={follower}
                  isSelected={isActive === follower.uid}
                  onClick={() => {
                    handleContactClick(follower.uid);
                  }}
                />
              );
            })
          ) : (
            <p>Loading followers...</p>
          )
        ) : following ? (
          following?.map((follow) => (
            <Contact
              key={follow.uid}
              userInfo={follow}
              isSelected={isActive === follow.uid}
              onClick={() => handleContactClick(follow.uid)}
            />
          ))
        ) : (
          <p>Loading following...</p>
        )}
      </div>
    </div>
  );
};
