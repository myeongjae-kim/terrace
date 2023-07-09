import React from 'react';
import clsx from 'clsx';

type Props = React.ComponentProps<'button'> & {
  active: boolean;
};

const HeaderButton = ({ className, active, ...props }: Props): JSX.Element => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        'rounded-lg px-2 py-1.5 text-sm font-medium capitalize text-gray-900 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700',
        {
          ['text-blue-700']: active,
        },
      )}
      {...props}
    />
  );
};

export default HeaderButton;
