import gsap from "gsap";

import { calculate, split } from "../utils/text";

import Animation from "../classes/Animation";

export default class Paragraph extends Animation {
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
        autoAlpha: 0,
        y: "100%",
      },
      {
        autoAlpha: 1,
        y: "0%",
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      duration: 0.01,
      stagger: 0,
      autoAlpha: 0,
    });
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans);
  }
}
