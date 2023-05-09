import Page from "../../classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        wrapper: ".home__wrapper",
        pinSection: ".home__project--about--info--title--span",
        navigation: document.querySelector(".navigation"),
        link: ".home__about__wrpper--info--about--text--link",
        linkTwo: ".home__intro__wrapper__info--paras-a",
      },
    });
  }

  create() {
    super.create();
  }
}
