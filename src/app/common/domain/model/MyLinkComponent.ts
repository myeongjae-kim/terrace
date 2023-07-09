import React, { RefAttributes } from 'react';
import { UrlObject } from 'url';

// LegacyRef<HTMLAnchorElement> | undefined' is not assignable to type 'Ref<HTMLAnchorElement> | undefined
export type Href = string | UrlObject;
export type MyLinkComponent = React.ComponentType<
  Omit<React.ComponentProps<'a'>, 'href' | 'ref'> &
    RefAttributes<HTMLAnchorElement> & {
      href: Href;
    }
>;
