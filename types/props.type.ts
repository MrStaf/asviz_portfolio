import Art from "./art.type";
import Category from "./category.type";
import AboutMe from "./about_me.type";
import Social from "./social.type";
import Asviz_art_directus_files from "./images.type";

interface Props {
  art: Art[];
  categories: Category[];
  aboutMe: AboutMe[];
  socials: Social[];
  asviz_art_directus_files: Asviz_art_directus_files[];
}

export default Props;
