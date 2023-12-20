import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import Contact from './Contact';
import { LoginContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GithubAuthProvider } from '@firebase/auth';

const Search = () => {
  const { currentUser } = useContext(LoginContext);
  const { accessToken } = useContext(LoginContext);

  const [, setSearchOpen] = useContext(SearchContext);
  const [isActive, setIsActive] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleContactClick = (id) => {
    setIsActive(id);
  };

  // Fetch followers
  const {
    data: followersData,
    isLoading: followersLoading,
    isError: followersError,
  } = useQuery({
    queryKey: ['GithubContacts', 'followers'],
    queryFn: () =>
      axios(
        `https://api.github.com/users/${currentUser.displayName}/followers`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
  });

  // Fetch following
  const {
    data: followingData,
    isLoading: followingLoading,
    isError: followingError,
  } = useQuery({
    queryKey: ['GithubContacts', 'following'],
    queryFn: () =>
      axios(
        `https://api.github.com/users/${currentUser.displayName}/following`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
  });

  useEffect(() => {
    if (
      followersData &&
      followersData.data &&
      Array.isArray(followersData.data)
    ) {
      setFollowers(followersData.data);
    }
  }, [followersData]);

  useEffect(() => {
    if (
      followingData &&
      followingData.data &&
      Array.isArray(followingData.data.data)
    ) {
      setFollowing(followingData.data.data);
    }
  }, [followingData]);

  console.log(followers);
  console.log(following);

  return (
    <div className="absolute left-[10%] top-[10%] flex h-[40%] w-[80%] flex-col items-center rounded-lg bg-[#bae9f8] px-1 py-2 shadow-lg md:left-[30%] md:w-[50%] lg:left-[30%] lg:top-[20%] lg:h-[50%] lg:w-[40%] ">
      <button
        onClick={handleCloseSearch}
        className="self-end pr-5 text-[150%] font-bold text-C_GreyBorder"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="h-full w-full overflow-y-scroll bg-[#bae9f8f5]">
        {/* <Contact
                key={contact.uid}
                user={contact.userInfo}
                isSelected={isActive === contact.uid}
                onClick={() => handleContactClick(contact.uid)}
              /> */}
      </div>
    </div>
  );
};
export default Search;
