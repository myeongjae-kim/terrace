import * as React from 'react';

export default ({ children, test, shallow }: React.PropsWithChildren<{ test: any, shallow?: boolean }>) => {
  if (shallow) {
    return <div hidden={!test}>{children}</div>
  }

  return <>{test && children}</>
}