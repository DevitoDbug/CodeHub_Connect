import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import Contact from './Contact';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { LoginContext } from '../context/AuthContext';
import { useFetchFollowers, useFetchFollowing } from '../api/hooks';

const Search = () => {
 
  const { currentUser } = useContext(LoginContext);
  const [, setSearchOpen] = useContext(SearchContext);
  const [isActive, setIsActive] = useState(null);
  const [allContacts, setAllContacts] = useState([]); // [ {uid: , userInfo: {firstName: , lastName: , email: , photoURL: }}, ...
const [followers,setFollowers]=React.useState([]) 
const [following,setFollowing]=React.useState([])
const {data,isError,isLoading,error,status}=useFetchFollowers(currentUser?.reloadUserInfo?.screenName)
const {data:followingData,status:followingStatus, error:followingError}=useFetchFollowing(currentUser?.reloadUserInfo?.screenName)
useEffect(()=>{
if(followingStatus==='success'){
  console.log(followingData)
}
if(followingStatus==="error"){
  console.log(followingError)
}
},[status])
  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleContactClick = (id) => {
    setIsActive(id);
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
    <div className="absolute left-[10%] top-[10%] flex h-[40%] w-[80%] flex-col items-center rounded-lg bg-[#bae9f8] px-1 py-2 shadow-lg md:left-[30%] md:w-[50%] lg:left-[30%] lg:top-[20%] lg:h-[50%] lg:w-[40%] ">
      <button
        onClick={handleCloseSearch}
        className="self-end pr-5 text-[150%] font-bold text-C_GreyBorder"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="h-full w-full overflow-y-scroll bg-[#bae9f8f5]">
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
