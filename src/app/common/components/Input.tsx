import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = React.ComponentProps<'input'> & {
  label?: string;
  wrapperAdditionalClassName?: string;
  inputAdditionalClassName?: string;
  error?: string;
};

const Input = (
  { label, wrapperAdditionalClassName, inputAdditionalClassName, error, ...props }: Props,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  return (
    <div className={twMerge('w-full', wrapperAdditionalClassName)}>
      {label && (
        <label
          htmlFor={props.id}
          className={'mb-2 block text-sm font-medium text-gray-900 dark:text-white'}
        >
          {label}
        </label>
      )}
      <input
        ref={forwardedRef}
        type="text"
        className={twMerge(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          inputAdditionalClassName,
        )}
        {...props}
      />
      {error && <p className={'mt-2 text-sm text-red-600 dark:text-red-500'}>{error}</p>}
    </div>
  );
};

export default React.forwardRef(Input);
