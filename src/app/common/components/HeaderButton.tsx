import React from 'react';
import clsx from 'clsx';

const HeaderButton = ({ className, ...props }: React.ComponentProps<'button'>): JSX.Element => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        'rounded-lg px-5 py-2.5 text-sm font-medium text-gray-900 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700',
      )}
      {...props}
    />
  );
};

export default HeaderButton;
