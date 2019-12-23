import * as React from 'react';

interface Props {
  url: string
}

const Profile: React.FC<Props> = ({ url }) => {
  return <img width={200} height={200} src={url} style={{
    borderRadius: "5%",
    boxShadow: "2px 2px 15px #ccc"
  }} />;
}

export default Profile;