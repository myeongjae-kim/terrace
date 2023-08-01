import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = { isLoggedIn: boolean; setIsLoggedIn(arg: boolean): void; redirectUri: string };

const LoginLogoutButton = ({ isLoggedIn, setIsLoggedIn, redirectUri }: Props): JSX.Element => {
  const logoutPath = `/auth/logout?${redirectUri}`;
  const loginPath = `/login?${redirectUri}`;
  const router = useRouter();

  return isLoggedIn ? (
    <a
      href={logoutPath}
      onClick={(e) => {
        e.preventDefault();
        void fetch(logoutPath).then(() => {
          setIsLoggedIn(false);
          router.refresh();
        });
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
