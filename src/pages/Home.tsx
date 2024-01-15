import { ContactChats } from "../components/ContactChats";
import { MessageSection } from "../components/MessageSection";
import { Search } from "../components/Search";
import { useContext, createContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { CurrentPageContext } from "../context/CurrentPageContex";

export interface NavContextValues {
  scrollToMessageSection: () => void;
  scrollToContactSection: () => void;
}

export const NavContext = createContext<NavContextValues>({
  scrollToMessageSection: () => {},
  scrollToContactSection: () => {},
});

const Home = () => {
  const { searchOpen } = useContext(SearchContext);
  const { homePage, setHomePage } = useContext(CurrentPageContext);

  const scrollToMessageSection = () => {
    setHomePage(false);
  };

  const scrollToContactSection = () => {
    setHomePage(true);
  };

  return (
    <NavContext.Provider
      value={{ scrollToMessageSection, scrollToContactSection }}
    >
      <div className="mb-1 mt-1 h-[100svh] w-screen ">
        <div className="relative flex h-[100svh] w-full flex-row ">
          <div
            className={`${
              homePage ? "block" : " hidden"
            } h-full w-full md:block md:w-2/6`}
          >
            <ContactChats />
          </div>

          <div
            className={`${
              homePage ? "hidden" : "block"
            } h-full w-full md:block md:w-4/6 `}
          >
            <MessageSection />
          </div>
        </div>
        {searchOpen && <Search />}
      </div>
    </NavContext.Provider>
  );
};

export default Home;
