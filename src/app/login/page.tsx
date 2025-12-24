import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import GoogleLoginButtonContainer from '@/app/login/containers/GoogleLoginButtonContainer';

const Page = async (props: PageProps): Promise<JSX.Element> => {
  const redirectUri = String(props.searchParams?.['redirectUri'] || '/');

  return (
    <div>
      <GoogleLoginButtonContainer redirectUri={redirectUri} />
    </div>
  );
};

export default Page;
