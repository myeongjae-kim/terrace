import React, { type JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'rounded-lg bg-blue-700 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300',
  ],
  {
    variants: {
      size: {
        xs: 'px-3 py-2 text-xs',
        base: 'px-5 py-2.5 text-sm',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
);

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    additionalClassName?: string;
  };

const Button = ({ size, additionalClassName, ...props }: Props): JSX.Element => {
  return (
    <button
      type="button"
      className={twMerge(buttonVariants({ size }), additionalClassName)}
      {...props}
    />
  );
};

export default Button;
