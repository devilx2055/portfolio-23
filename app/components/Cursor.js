import gsap from "gsap";
import Detection from "classes/Detection";

export default class Cursor {
  constructor() {
    this.cursor = document.querySelector(".cursor");
    this.texts = document.querySelectorAll('[data-cursor="true"]');

    this.mouse = {
      x: 0,
      y: 0,
    };

    if (Detection.isMobile() || window.innerWidth < 840) {
      null;
    } else {
      this.init();
    }

    this.addEventListener();
  }

  init() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      gsap.to(this.cursor, {
        x: this.mouse.x,
        y: this.mouse.y,
      });
    });
  }

  addEventListener() {
    this.texts.forEach((text) => {
      text.addEventListener("mouseenter", this.show.bind(this));
      text.addEventListener("mouseleave", this.hide.bind(this));
      text.addEventListener("mouseover", this.hide.bind(this));
    });
  }

  show() {
    this.cursor.classList.add("active");
  }

  hide() {
    this.cursor.classList.remove("active");
  }
}
