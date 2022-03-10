import * as React from "react";

interface Props {
  url: string;
}

const Profile = ({ url }: Props) => <img width={200} height={200} src={url} />;

export default Profile;
