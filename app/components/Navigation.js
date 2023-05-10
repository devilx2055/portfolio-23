import { each } from "lodash";
import Component from "../classes/Component";

export default class Navigation extends Component {
  constructor() {
    super({
      element: ".navigation",
      elements: {
        wrapperOne: ".navigation__wrapper",
        wrapperTwo: ".navigation__wrapper-2",
        navLinkTwo: ".navigation__link-2",
        hamBtn: ".ham__btn",
        allLinks: ".hamburger__menu__list__link",
      },
    });

    this.createNavigation();
  }

  createNavigation() {
    this.elements.navLinkTwo.addEventListener(
      "click",
      this.addAnimation.bind(this)
    );

    this.elements.hamBtn.addEventListener(
      "click",
      this.removeAnimation.bind(this)
    );

    each(this.elements.allLinks, (element) => {
      element.addEventListener("click", this.removeAnimation.bind(this));
    });
  }

  addAnimation() {
    this.element.classList.add("navigation--active");
    this.elements.wrapperTwo.classList.add("navigation__wrapper-2--active");
  }

  removeAnimation() {
    this.element.classList.remove("navigation--active");
    this.elements.wrapperTwo.classList.remove("navigation__wrapper-2--active");
  }
}
