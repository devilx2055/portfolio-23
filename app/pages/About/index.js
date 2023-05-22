import { map } from "lodash";
import Page from "../../classes/Page";

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about__wrapper",
        service_btn: ".about__service__content__header__icon",
        service_content: ".about__service__content__body",
      },
    });

    this.create();
    this.createAnimation();
  }

  create() {
    super.create();
  }

  createAnimation() {
    map(this.elements.service_btn, (element, index) => {
      element.addEventListener("click", () => {
        this.elements.service_content[index].classList.toggle(
          "about__service__content__body--active"
        );
      });
    });
  }
}
