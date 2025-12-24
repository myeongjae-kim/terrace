import React, { createContext, PropsWithChildren, type JSX } from 'react';

export const IsLoggedInContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn(arg: boolean): void;
}>({ isLoggedIn: false, setIsLoggedIn: (_: boolean) => {} });

const IsLoggedInProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInProvider;
