import Social from "./social.type";

interface AboutMe {
  id: number;
  about_me: string;
  background_image: string;
  drawer_image: string;
  social: Social[];
  cv: string;
  contact_pro: string;
  light: boolean;
  title: string;
}

export default AboutMe;
