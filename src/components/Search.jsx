import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import Contact from './Contact';
import { LoginContext } from '../context/AuthContext';
import { useFetchFollowers, useFetchFollowing } from '../api/hooks';

const Search = () => {
  const { currentUserBulk } = useContext(LoginContext);
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
  } = useFetchFollowers(currentUserBulk?.reloadUserInfo?.screenName);

  //Following data
  const {
    data: followingData,
    status: followingStatus,
    error: followingError,
  } = useFetchFollowing(currentUserBulk?.reloadUserInfo?.screenName);

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

  useEffect(() => {}, [followers, following]);
  return (
    <div className="absolute left-[10%] top-[10%] flex h-[40%] w-[80%] flex-col items-center rounded-lg bg-[#bae9f8] px-1 py-2 shadow-lg md:left-[30%] md:w-[50%] lg:left-[30%] lg:top-[20%] lg:h-[50%] lg:w-[40%]">
      <div className="flex w-full items-start justify-between ">
        <div className="flex gap-3 p-2">
          <button
            className={`text-C_TextBlackFade border-C_BorderBlackFade self-end rounded-xl border-2 px-2 py-1 text-[110%] font-bold transition-transform duration-300 ease-in-out first-letter:capitalize 
            ${
              toggleContactList
                ? 'scale-110 border-none bg-C_DarkBlue text-C_TextWhiteDull'
                : ''
            } `}
            onClick={() => setToggleContactList(true)}
          >
            Folowers
          </button>
          <button
            className={`text-C_TextBlackFade border-C_BorderBlackFade self-end rounded-xl border-2  p-1 text-[110%] font-bold transition-transform duration-300 ease-in-out first-letter:capitalize
            ${
              !toggleContactList
                ? 'scale-110 border-none bg-C_DarkBlue text-C_TextWhiteDull'
                : ''
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
          followersStatus === 'success' ? (
            followers?.map((follower) => {
              return (
                <Contact
                  key={follower.id}
                  userInfo={follower}
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
          ) : (
            <p>Loading followers...</p>
          )
        ) : followingStatus === 'success' ? (
          following?.map((follow) => (
            <Contact
              key={follow.id}
              userInfo={follow}
              userID={follow.id}
              isSelected={isActive === follow.id}
              onClick={() =>
                handleContactClick(follow.id, follow.login, follow.avatar_url)
              }
            />
          ))
        ) : (
          <p>Loading following...</p>
        )}
      </div>
    </div>
  );
};
export default Search;
