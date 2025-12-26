import clsx from 'clsx';
import React from 'react';

type Props = React.ComponentProps<'button'> & {
  active: boolean;
};

const HeaderButton = ({ className, active, ...props }: Props) => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        'rounded-lg px-2 py-1.5 text-sm font-medium capitalize tracking-tight hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700',
        {
          ['text-blue-700']: active,
          ['text-gray-900']: !active,
        },
      )}
      {...props}
    />
  );
};

export default HeaderButton;
