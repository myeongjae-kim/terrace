import React, { createContext, PropsWithChildren } from 'react';

export const IsLoggedInContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn(arg: boolean): void;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
