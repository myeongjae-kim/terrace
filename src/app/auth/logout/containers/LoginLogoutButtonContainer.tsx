'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { IsLoggedInProvider } from '@/app/auth/domain/application/IsLoggedInProvider';
import LoginLogoutButton from '@/app/auth/logout/components/LoginLogoutButton';

const LoginLogoutButtonContainer = (): JSX.Element => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isLoggedIn, setIsLoggedIn } = IsLoggedInProvider.useIsLoggedIn();

  React.useEffect(() => {
    fetch('/auth/is-logged-in')
      .then((it) => it.json())
      .then((it) => setIsLoggedIn(it.isLoggedIn));
  }, [setIsLoggedIn]);

  const redirectUri = `redirectUri=${encodeURIComponent(
    pathname + (searchParams.toString() ? '?' + searchParams.toString() : searchParams.toString()),
  )}`;

  return (
    <LoginLogoutButton
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      redirectUri={redirectUri}
    />
  );
};

export default LoginLogoutButtonContainer;
