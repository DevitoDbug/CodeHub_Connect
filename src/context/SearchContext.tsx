import React, { FC, createContext, useState } from "react";

export interface SearchContextProviderValues {
  children: React.ReactNode;
}
export interface SearchContextValues {
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextValues>({
  searchOpen: false,
  setSearchOpen: () => {},
});

const SearchContextProvider: FC<SearchContextProviderValues> = ({
  children,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContextValues: SearchContextValues = {
    searchOpen,
    setSearchOpen,
  };
  return (
    <SearchContext.Provider value={searchContextValues}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
