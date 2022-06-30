import Art from "./art.type";
import Category from "./category.type";
import AboutMe from "./about_me.type";
import Social from "./social.type";

interface Props {
  art: Art[];
  categories: Category[];
  aboutMe: AboutMe[];
  socials: Social[];
}

export default Props;
