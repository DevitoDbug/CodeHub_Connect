import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import Contact from './Contact';
import { LoginContext } from '../context/AuthContext';
import { useFetchFollowers, useFetchFollowing } from '../api/hooks';

const Search = () => {
  const { currentUser } = useContext(LoginContext);
  const [, setSearchOpen] = useContext(SearchContext);
  const [isActive, setIsActive] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [toggleContactList, setToggleContactList] = useState(true);

  //Followers data
  const {
    data: followersData,
    status: followersStatus,
    error: followersError,
  } = useFetchFollowers(currentUser?.reloadUserInfo?.screenName);

  //Following data
  const {
    data: followingData,
    status: followingStatus,
    error: followingError,
  } = useFetchFollowing(currentUser?.reloadUserInfo?.screenName);

  //Update followers data
  useEffect(() => {
    if (followersStatus === 'success') {
      setFollowers(Object.values(followersData));
    }
    if (followersStatus === 'error') {
      console.log(followersError);
    }
  }, [followersStatus, followersData, followersError]);

  //Update following data
  useEffect(() => {
    if (followingStatus === 'success') {
      setFollowing(Object.values(followingData));
    }
    if (followingStatus === 'error') {
      console.log(followingError);
    }
  }, [followingStatus, followingData, followingError]);

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleContactClick = (id, nickName, photoURL) => {
    setIsActive(id);
  };

  // useEffect(() => {
  //   console.log(currentUser.providerData[0]);
  // }, [currentUser]);
  return (
    <div className="absolute left-[10%] top-[10%] flex h-[40%] w-[80%] flex-col items-center rounded-lg bg-[#bae9f8] px-1 py-2 shadow-lg md:left-[30%] md:w-[50%] lg:left-[30%] lg:top-[20%] lg:h-[50%] lg:w-[40%]">
      <div className="flex w-full items-start justify-between ">
        <div className="flex gap-2 p-2">
          <button
            className="self-end rounded-xl border-2 border-C_BorderLightBlue p-1 text-[110%] font-bold text-C_GreyBorder"
            onClick={() => setToggleContactList(true)}
          >
            Folowers
          </button>
          <button
            className="self-end rounded-xl border-2 border-C_BorderLightBlue p-1 text-[110%] font-bold text-C_GreyBorder"
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
        {toggleContactList
          ? followers?.map((follower) => {
              return (
                <Contact
                  key={follower.id}
                  userID={follower.id}
                  isSelected={isActive === follower.id}
                  onClick={() => {
                    handleContactClick(
                      follower.id,
                      follower.login,
                      follower.avatar_url,
                    );
                  }}
                />
              );
            })
          : following?.map((follow) => {
              return (
                <Contact
                  key={follow.id}
                  userID={follow.id}
                  isSelected={isActive === follow.id}
                  onClick={() =>
                    handleContactClick(
                      follow.id,
                      follow.login,
                      follow.avatar_url,
                    )
                  }
                />
              );
            })}
      </div>
    </div>
  );
};
export default Search;
