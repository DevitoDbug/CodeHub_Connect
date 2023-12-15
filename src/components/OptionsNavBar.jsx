import {
  faMessage,
  faSearch,
  faStar,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { CurrentPageContext } from '../context/CurrentPageContex';
import { NavContext } from '../pages/Home';

const OptionsNavBar = () => {
  const { currentPage, setCurrentPage } = useContext(
    CurrentPageContext,
  );
  const { scrollToMessageSection } = useContext(NavContext);
  const [, setSearchOpen] = useContext(SearchContext);
  const handleOpenSearch = () => {
    setSearchOpen(true);
    setCurrentPage('searchPage');
  };

  return (
    <div className="flex w-full flex-row items-center justify-center gap-1 border-t-2 border-C_BorderLightBlue p-2">
      <div className="ml-2 flex flex-col items-center justify-center">
        <button>
          <FontAwesomeIcon
            icon={faStar}
            className="text-xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == 'starPage'
              ? 'bg-C_DarkBlue'
              : 'bg-transparent'
          }`}
        ></div>
      </div>

      <div className=" flex flex-col items-center justify-center">
        <button>
          <FontAwesomeIcon
            icon={faUserGroup}
            className="  text-xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == 'groupPage'
              ? 'bg-C_DarkBlue'
              : 'bg-transparent'
          }`}
        ></div>
      </div>

      <div className="ml-2 flex flex-col items-center justify-center">
        <button onClick={handleOpenSearch}>
          <FontAwesomeIcon
            icon={faSearch}
            className="text-xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == 'searchPage'
              ? 'bg-C_DarkBlue'
              : 'bg-transparent'
          }`}
        ></div>
      </div>

      <div className="ml-2 flex flex-col items-center justify-center">
        <button onClick={scrollToMessageSection}>
          <FontAwesomeIcon
            icon={faMessage}
            className=" text-xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == 'contactPage'
              ? 'bg-C_DarkBlue'
              : 'bg-transparent'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default OptionsNavBar;
