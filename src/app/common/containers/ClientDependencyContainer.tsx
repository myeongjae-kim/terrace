'use client';

import React, { PropsWithChildren } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ENV } from '@/app/common/env';
import IsLoggedInProvider from '@/app/auth/domain/application/IsLoggedInProvider';
import { Toaster } from 'react-hot-toast';

const ClientDependencyContainer = (props: PropsWithChildren): JSX.Element => {
  return (
    <>
      <GoogleOAuthProvider clientId={ENV.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}>
        <IsLoggedInProvider>{props.children}</IsLoggedInProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            position: 'top-center',
            style: {
              border: '1px solid #1A56DB',
              color: '#1A56DB',
              userSelect: 'none',
              paddingLeft: '16px',
            },
            iconTheme: {
              primary: '#1A56DB',
              secondary: '#FFFAEE',
            },
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default ClientDependencyContainer;
