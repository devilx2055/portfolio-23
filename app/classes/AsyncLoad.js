import Component from "./Component";

export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({ element });

    this.element = element;

    this.createObserver();
  }

  createObserver() {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.element.src) {
            this.element.src = this.element.getAttribute("data-src");
          }
        }
      });
    });

    this.observer.observe(this.element);
  }
}
