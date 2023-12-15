import { createContext, useState } from 'react';
import React from 'react';

export const CurrentPageContext = createContext();

const CurrentPageContexProvider = ({ children }) => {
  const [homePage, setHomePage] = useState(true);
  const [currentPage, setCurrentPage] = useState('');
  return (
    <CurrentPageContext.Provider
      value={{ homePage, setHomePage, currentPage, setCurrentPage }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
};

export default CurrentPageContexProvider;
