import React, { type JSX } from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageHeader = (props: Props): JSX.Element => {
  return (
    <div
      className={clsx(
        'my-6 cursor-default select-none text-[1.7rem] font-extralight tracking-tight',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

export default PageHeader;
