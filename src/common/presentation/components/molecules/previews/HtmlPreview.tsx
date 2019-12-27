import * as React from 'react';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  __html: string
}

export default (props: Props) => {
  const { __html } = props;
  return <div {...props} dangerouslySetInnerHTML={{ __html }} />
}