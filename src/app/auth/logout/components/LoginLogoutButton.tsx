import React from 'react';
import Link from 'next/link';

type Props = { isLoggedIn: boolean; setIsLoggedIn(arg: boolean): void; redirectUri: string };

const LoginLogoutButton = ({ isLoggedIn, setIsLoggedIn, redirectUri }: Props): JSX.Element => {
  const logoutPath = `/auth/logout?${redirectUri}`;
  const loginPath = `/login?${redirectUri}`;

  return isLoggedIn ? (
    <a
      href={logoutPath}
      onClick={(e) => {
        e.preventDefault();
        fetch(logoutPath).then(() => setIsLoggedIn(false));
      }}
    >
      <button>로그아웃</button>
    </a>
  ) : (
    <Link href={loginPath} className={'opacity-0'}>
      <button>로</button>
    </Link>
  );
};

export default LoginLogoutButton;
