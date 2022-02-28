import * as React from "react";

interface Props {
  url: string;
}

const Profile: React.FC<Props> = ({ url }) => <img width={200} height={200} src={url} />;

export default Profile;
