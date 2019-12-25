import * as React from 'react';

interface Props {
  from: string
}

const From: React.FC<Props> = ({ from }) => {
  return <p style={{ fontSize: '0.9em' }}>- {from}</p>;
}

export default From;