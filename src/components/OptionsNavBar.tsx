import {
  faMessage,
  faSearch,
  faStar,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { CurrentPageContext } from "../context/CurrentPageContex";
import { NavContext } from "../pages/Home";

const OptionsNavBar: FC = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { scrollToMessageSection } = useContext(NavContext);
  const { setSearchOpen } = useContext(SearchContext);
  const handleOpenSearch = () => {
    setSearchOpen(true);
    setCurrentPage("searchPage");
  };

  return (
    <div className="flex w-full flex-row items-center justify-around gap-1 border-t-2 border-C_BorderLightBlue p-3">
      <div className="ml-2 flex flex-col items-center justify-center">
        <button>
          <FontAwesomeIcon
            icon={faStar}
            className="text-2xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == "starPage" ? "bg-C_DarkBlue" : "bg-transparent"
          }`}
        ></div>
      </div>

      <div className="ml-2 flex flex-col items-center justify-center">
        <button onClick={handleOpenSearch}>
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-2xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == "searchPage" ? "bg-C_DarkBlue" : "bg-transparent"
          }`}
        ></div>
      </div>

      <div className=" flex flex-col items-center justify-center">
        <button>
          <FontAwesomeIcon
            icon={faSearch}
            className="  text-2xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == "groupPage" ? "bg-C_DarkBlue" : "bg-transparent"
          }`}
        ></div>
      </div>

      <div className="ml-2 flex flex-col items-center justify-center">
        <button
          onClick={() => {
            setSearchOpen(false);
            scrollToMessageSection();
          }}
        >
          <FontAwesomeIcon
            icon={faMessage}
            className=" text-2xl text-C_UserDullBlack"
          />
        </button>
        <div
          className={`h-1 w-[75%] rounded-xl  ${
            currentPage == "contactPage" ? "bg-C_DarkBlue" : "bg-transparent"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default OptionsNavBar;
