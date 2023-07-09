import React from 'react';
import clsx from 'clsx';

type Props = {
  children: string;
  className?: string;
};

const PageHeader = (props: Props): JSX.Element => {
  return (
    <div
      className={clsx(
        'my-6 cursor-default select-none text-[1.7rem] font-extralight',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

export default PageHeader;
