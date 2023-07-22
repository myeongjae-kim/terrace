import React from 'react';
import clsx from 'clsx';

type Props = React.ComponentProps<'input'> & {
  label?: string;
  wrapperAdditionalClassName?: string;
  inputAdditionalClassName?: string;
};

const Input = (
  { label, wrapperAdditionalClassName, inputAdditionalClassName, ...props }: Props,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  return (
    <div className={clsx('w-full', wrapperAdditionalClassName)}>
      {label && (
        <label
          htmlFor={props.id}
          className={clsx('mb-2 block text-sm font-medium text-gray-900 dark:text-white')}
        >
          {label}
        </label>
      )}
      <input
        ref={forwardedRef}
        type="text"
        className={clsx(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          inputAdditionalClassName,
        )}
        {...props}
      />
    </div>
  );
};

export default React.forwardRef(Input);
