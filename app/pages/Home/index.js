import Page from "../../classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        wrapper: ".home__wrapper",
        navigation: document.querySelector(".navigation"),
        link: ".home__about__wrpper--info--about--text--link",
        linkTwo: ".home__intro__wrapper__info--paras-a",
      },
    });
  }

  create() {
    super.create();

    this.elements.link.addEventListener("click", () => {
      console.log("Oh You Clicked Me");
    });
  }
}
