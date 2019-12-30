import { createStyles, makeStyles, Theme } from '@material-ui/core';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

type NextComposedProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & NextLinkProps;

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>((props, ref) => {
  const { as, href, replace, scroll, passHref, shallow, prefetch, ...other } = props;

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
});

interface LinkPropsBase {
  activeClassName?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
  naked?: boolean;
}

type LinkProps = LinkPropsBase & NextComposedProps & Omit<MuiLinkProps, 'ref'>;

const useStyles = makeStyles((theme: Theme) => createStyles({
  hover: {
    transition: "color 1s ease-out",
    "&:hover": {
      color: theme.palette.primary.light
    }
  }
}))

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function RouterLink(props: LinkProps) {
  const classes = useStyles();
  const router = useRouter();
  const {
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    underline,
    color,
    ...other
  } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return <MuiLink
    component={NextComposed}
    className={clsx(className, classes.hover)}
    ref={innerRef}
    underline={underline || 'none'}
    color={color}
    {...other} />;
}

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink {...props} innerRef={ref} />
));
