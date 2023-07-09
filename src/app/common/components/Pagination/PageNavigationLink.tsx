import React from 'react';
import { MyLinkComponent } from '@/app/common/domain/model/MyLinkComponent';
import clsx from 'clsx';
import { match } from 'ts-pattern';

const PageNavigationLink = ({
  Link,
  disabled,
  ...props
}: React.ComponentProps<MyLinkComponent> & {
  Link: MyLinkComponent;
  disabled?: boolean;
}) => {
  const className = clsx(
    'flex h-8 items-center justify-center rounded-r-lg bg-white px-3 leading-tight text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    {
      ['hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white']:
        !disabled,
      ['cursor-default opacity-10']: disabled,
    },
  );
  const style = { color: disabled ? 'initial' : undefined };

  return match(disabled)
    .with(true, () => (
      <div className={className} style={style}>
        {props.children}
      </div>
    ))
    .otherwise(() => <Link className={className} style={style} {...props} />);
};

export default PageNavigationLink;
