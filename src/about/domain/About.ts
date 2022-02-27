import {Description} from "./Description";

export interface About {
  profile: string;
  name: {
    en: string;
    kr: string;
  }
  descriptions: Description[]
}
