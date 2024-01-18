import { FC, createContext, useState } from "react";
import React from "react";

export interface CurrentPageContexProviderParams {
  children: React.ReactNode;
}
export interface CurrentPageContextValues {
  homePage: boolean;
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrentPageContext = createContext<CurrentPageContextValues>({
  homePage: true,
  setHomePage: () => {},
  currentPage: "",
  setCurrentPage: () => {},
});

const CurrentPageContexProvider: FC<CurrentPageContexProviderParams> = ({
  children,
}) => {
  const [homePage, setHomePage] = useState(true);
  const [currentPage, setCurrentPage] = useState("");
  const contextValues: CurrentPageContextValues = {
    homePage,
    setHomePage,
    currentPage,
    setCurrentPage,
  };
  return (
    <CurrentPageContext.Provider value={contextValues}>
      {children}
    </CurrentPageContext.Provider>
  );
};

export default CurrentPageContexProvider;
