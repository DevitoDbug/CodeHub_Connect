import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import Contact from './Contact';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { LoginContext } from '../context/AuthContext';

const Search = () => {
  const { currentUser } = useContext(LoginContext);
  const [, setSearchOpen] = useContext(SearchContext);
  const [searchedUserName, setSearchedUserName] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [isActive, setIsActive] = useState(null);
  const [allContacts, setAllContacts] = useState([]); // [ {uid: , userInfo: {firstName: , lastName: , email: , photoURL: }}, ...

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchResult({});
  };

  const handleContactClick = (id) => {
    setIsActive(id);
  };

  const handleSelectByEnterKey = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('firstName', '==', searchedUserName),
    );

    try {
      //Searching for a user from firebase
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchResult(doc.data());
      });
    } catch (e) {
      console.log('Fetching data from firestore error: ', e);
    }
  };

  const handleGetAllContacts = async () => {
    const q = query(collection(db, 'users'));
    setAllContacts([]);
    try {
      //Searching for a user from firebase
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAllContacts((prevState) => [
          ...prevState,
          { uid: doc.id, userInfo: doc.data() },
        ]);
      });
    } catch (e) {
      console.log('Fetching data from firestore error: ', e);
    }
  };

  useEffect(() => {
    handleGetAllContacts();
  }, []);
  return (
    <div className="absolute left-[10%] top-[10%] flex h-[30%] w-[80%] flex-col items-center rounded-lg bg-[#bae9f8] px-1 py-2 shadow-lg md:left-[30%] md:w-[50%] lg:left-[30%] lg:top-[20%] lg:w-[40%] ">
      <button
        onClick={handleCloseSearch}
        className="self-end pr-1 text-[110%] font-bold text-C_GreyBorder"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className=" flex flex-row items-center justify-between border-b-2 border-gray-300">
        <input
          onKeyDown={handleSelectByEnterKey}
          onChange={(e) => {
            setSearchedUserName(e.target.value);
            setSearchResult({});
          }}
          className="w-[95%]  bg-transparent p-3 text-[110%] outline-none"
          type="text"
          placeholder="Search name..."
          value={searchedUserName}
          name="searchName"
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon
            icon={faSearch}
            className="ml-2 self-center text-[130%] font-bold text-C_GreyBorder"
          />
        </button>
      </div>
      {Object.keys(searchResult).length == 0 ? (
        <span className="mb-7 mt-7">
          No matching results from search{':)'}
        </span>
      ) : (
        <div className="w-full overflow-y-scroll px-1 py-4">
          <Contact
            user={searchResult}
            isSelected={isActive === searchResult.uid}
            onClick={() => handleContactClick(searchResult.uid)}
          />
        </div>
      )}
      <div className=" w-full overflow-scroll border-t-2 border-gray-300 bg-[#bae9f8f5]">
        {allContacts.map(
          (contact) =>
            contact.uid !== currentUser.uid && (
              <Contact
                key={contact.uid}
                user={contact.userInfo}
                isSelected={isActive === contact.uid}
                onClick={() => handleContactClick(contact.uid)}
              />
            ),
        )}
      </div>
    </div>
  );
};
export default Search;
