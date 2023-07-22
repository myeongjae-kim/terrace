'use client';

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleLoginResponse } from '@/app/auth/domain/model/GoogleLoginResponse';
import { IsLoggedInProvider } from '@/app/auth/domain/application/IsLoggedInProvider';
import { useRouter } from 'next/navigation';

const responseGoogle = (response: GoogleLoginResponse) => {
  return fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(response),
  });
};

const GoogleLoginButtonContainer = ({ redirectUri }: { redirectUri: string }): JSX.Element => {
  const { setIsLoggedIn } = IsLoggedInProvider.useIsLoggedIn();
  const router = useRouter();

  return (
    <div className={'flex h-full w-full items-center justify-center'}>
      <GoogleLogin
        auto_select={true}
        shape={'pill'}
        useOneTap={true}
        onSuccess={(e) => {
          const clientId = e.clientId;
          const credential = e.credential;

          if (clientId && credential) {
            responseGoogle({ clientId, credential }).then(() => {
              setIsLoggedIn(true);
              router.push(redirectUri);
            });
          } else {
            alert('clientId or credential is undefined');
          }
        }}
      />
    </div>
  );
};

export default GoogleLoginButtonContainer;
