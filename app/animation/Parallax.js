import Ukiyo from "ukiyojs";

export default class Parallax {
  constructor(element) {
    this.element = element;

    this.create();
  }

  create() {
    this.parallax = new Ukiyo(this.element, {
      speed: 2,
      scale: 1.2,
      wrapperClass: "parallax-container",
    });
  }

  reset() {
    this.parallax.reset();
  }

  destroy() {
    this.parallax.destroy();
  }
}
