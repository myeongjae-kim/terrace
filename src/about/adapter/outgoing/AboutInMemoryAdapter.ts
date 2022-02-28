import {AboutLoadPort} from "../../application/port/outgoing/AboutLoadPort";
import {About} from "../../domain/About";

export class AboutInMemoryAdapter implements AboutLoadPort {
  public get = (): Promise<About> => Promise.resolve({
    profile: "https://s.gravatar.com/avatar/4e9916981adb804e1db438874e3789c6?s=400#shadow#round",
    name: {
      en: "Myeongjae Kim",
      kr: "김명재"
    },
    descriptions: [{
      icon: "EmojiPeople",
      label: "Programmer",
      href: ""
    }, {
      icon: "Room",
      label: "Seoul, Korea",
      href: "/places"
    }, {
      icon: "DeveloperBoard",
      label: "Résumé",
      href: ""
    }, {
      icon: "Code",
      label: "github/myeongjae-kim",
      href: "https://github.com/myeongjae-kim"
    }, {
      icon: "Email",
      label: "dev@myeongjae.kim",
      href: "mailto:dev@myeongjae.kim"
    }, {
      icon: "Create",
      label: "blog.myeongjae.kim",
      href: "https://blog.myeongjae.kim"
    },]
  });
}
