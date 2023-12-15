import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <SearchContext.Provider value={[searchOpen, setSearchOpen]}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
