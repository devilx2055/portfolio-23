import Page from "../../classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        navigation: document.querySelector(".navigation"),
        button: ".home__about__wrpper--info--about--text--link",
        button2: ".home__intro__wrapper__info--paras-a",
      },
    });
  }
}
