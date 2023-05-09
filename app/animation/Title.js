import gsap from "gsap";

import { calculate, split } from "../utils/text";

import Animation from "../classes/Animation";

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({ element, elements });

    split({ element: this.element, append: true });
    split({ element: this.element, append: true });

    this.elementLinesSpans = this.element.querySelectorAll("span span");
  }

  animateIn() {
    gsap.set(this.element, {
      autoAlpha: 1,
    });

    gsap.fromTo(
      this.elementLines,
      {
        y: "100%",
      },
      {
        y: "0%",
        stagger: 0.05,
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0,
    });
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans);
  }
}
