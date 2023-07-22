'use client';

import React, { PropsWithChildren } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ENV } from '@/app/common/env';
import { IsLoggedInProvider } from '@/app/auth/domain/application/IsLoggedInProvider';

const ClientDependencyContainer = (props: PropsWithChildren): JSX.Element => {
  return (
    <GoogleOAuthProvider clientId={ENV.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}>
      <IsLoggedInProvider.Provider>{props.children}</IsLoggedInProvider.Provider>
    </GoogleOAuthProvider>
  );
};

export default ClientDependencyContainer;
