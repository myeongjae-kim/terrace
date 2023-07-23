import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Props = React.ComponentProps<'button'> & {
  size?: 'xs' | 'base';
  additionalClassName?: string;
};

const Button = ({ size, additionalClassName, ...props }: Props): JSX.Element => {
  return (
    <button
      type="button"
      className={twMerge(
        'rounded-lg bg-blue-700 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        clsx({
          ['px-3 py-2 text-xs']: size === 'xs',
          ['px-5 py-2.5 text-sm']: size === 'base',
        }),
        additionalClassName,
      )}
      {...props}
    />
  );
};

export default Button;
