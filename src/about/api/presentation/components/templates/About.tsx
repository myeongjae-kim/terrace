import * as React from 'react';

const data = {
  profile: "https://cdn.myeongjae.kim/res/profile.jpeg",
  name: {
    en: "Myeongjae Kim",
    kr: "김명재"
  },
  descriptions: [{
    icon: "",
    label: "",
    href: ""
  }]
}

const About: React.FC = () => {
  return <>{data}</>;
}

export default About;