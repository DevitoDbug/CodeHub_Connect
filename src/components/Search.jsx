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

  const handleContactClick = (id) => {
    setIsActive(id);
  };

  // userInfo: email: 'emilysofia@gmail.com';
  // firstName: 'Emily';
  // photoURL: 'https://firebasestorage.googleapis.com/v0/b/artlife4-fc1df.appspot.com/o/Emily?alt=media&token=1f43b858-4e3b-4734-baa0-5311da80c148';
  // secondName: 'Sofia';
  // uid: '52oegJ044XMHVPoQY1dOUwmBwIz2';

  useEffect(() => {
    console.log(currentUser.providerData[0].uid);
  }, [currentUser]);
  return (
    <div className="absolute left-[10%] top-[10%] flex h-[40%] w-[80%] flex-col items-center rounded-lg bg-[#bae9f8] px-1 py-2 shadow-lg md:left-[30%] md:w-[50%] lg:left-[30%] lg:top-[20%] lg:h-[50%] lg:w-[40%] ">
      <button
        onClick={handleCloseSearch}
        className="self-end pr-5 text-[150%] font-bold text-C_GreyBorder"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="h-full w-full overflow-y-scroll bg-[#bae9f8f5]">
        {followers?.map((follower) => {
          return (
            <Contact
              key={follower.id}
              user={{
                email: ' ',
                nickName: follower.login,
                photoURL: follower.avatar_url,
                uid: follower.id,
              }}
              isSelected={isActive === follower.id}
              onClick={() => handleContactClick(follower.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Search;
