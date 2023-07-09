import React from 'react';

type Props = {
  children: string;
};

const PageHeader = (props: Props): JSX.Element => {
  return <div className={'my-6 text-[1.7rem] font-extralight'}>{props.children}</div>;
};

export default PageHeader;
