import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import GoogleLoginButtonContainer from '@/app/login/containers/GoogleLoginButtonContainer';
import { redirectIfLoggedIn } from '@/app/login/actions';

const Page = async (props: PageProps): Promise<JSX.Element> => {
  const redirectUri = String(props.searchParams?.['redirectUri'] || '/');
  await redirectIfLoggedIn(redirectUri);

  return (
    <div>
      <GoogleLoginButtonContainer redirectUri={redirectUri} />
    </div>
  );
};

export default Page;
