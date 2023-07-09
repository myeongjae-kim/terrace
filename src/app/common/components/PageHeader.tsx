import React from 'react';

type Props = {
  children: string;
};

const PageHeader = (props: Props): JSX.Element => {
  return (
    <div className={'my-6 cursor-default select-none text-[1.7rem] font-extralight'}>
      {props.children}
    </div>
  );
};

export default PageHeader;
