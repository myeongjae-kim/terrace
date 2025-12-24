'use client';

import React, { type JSX } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoginLogoutButton from '@/app/auth/logout/components/LoginLogoutButton';
import { useIsLoggedIn } from '@/app/auth/domain/application/useIsLoggedIn';

const LoginLogoutButtonContainer = (): JSX.Element => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  React.useEffect(() => {
    void fetch('/auth/is-logged-in')
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
