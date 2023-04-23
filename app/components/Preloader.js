import gsap from "gsap";
import each from "lodash/each";

import Component from "../classes/Component";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        preloaderText: ".preloader__text",
        number: ".preloader__number",
        images: document.querySelectorAll("img"),
      },
    });

    this.length = 0;

    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, (element) => {
      element.onload = () => this.onAssetLoaded(element);
      element.src = element.getAttribute("data-src");
    });
  }

  onAssetLoaded(image) {
    this.length += 1;

    const percent = this.length / this.elements.images.length;

    this.elements.number.style.bottom = `${percent * (100 - 15)}%`;
    this.elements.number.innerHTML = `${Math.round(percent * 100)}`;

    if (percent === 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = gsap.timeline({
        delay: 2,
      });

      this.animateOut.to(
        this.elements.number,
        {
          autoAlpha: 0,
        },
        "-0.7"
      );

      this.animateOut.to(this.elements.preloaderText, {
        autoAlpha: 0,
        duration: 1,
      });

      this.animateOut.to(this.element, {
        scaleY: 0,
        duration: 1.5,
        ease: "expo.out",
        transformOrigin: "0 0",
      });

      this.animateOut.call(() => {
        this.emit("completed");
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
