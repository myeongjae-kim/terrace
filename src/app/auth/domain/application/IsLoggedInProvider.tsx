import React, { createContext, PropsWithChildren, useContext } from 'react';

export const IsLoggedInContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn(arg: boolean): void;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ isLoggedIn: false, setIsLoggedIn: (_: boolean) => {} });

const Provider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

const useIsLoggedIn = () => useContext(IsLoggedInContext);

export const IsLoggedInProvider = {
  Provider,
  useIsLoggedIn,
};
