import gsap from "gsap";
import Prefix from "prefix";
import each from "lodash/each";

import Scroll from "../components/Scroll";
import Parallax from "../animation/Parallax";
import Cursor from "../components/Cursor";
import Navigation from "../components/Navigation";

import AsyncLoad from "../classes/AsyncLoad";

import { mapEach } from "../utils/dom";

import Lable from "../animation/Lable";
import Paragraph from "../animation/Paragraph";
import Title from "../animation/Title";

import { forEach, map } from "lodash";

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsImage: '[data-parallax="parallax"]',
      animationsTitles: '[data-animation="title"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsLables: '[data-animation="lable"]',

      preloaders: "[data-src]",
    };

    this.scroll = null;
    this.id = id;
    this.transformPrefix = Prefix("transform");
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });

    this.createPreloader();
    this.initSmoothScroll();
    this.initParallax();
    this.initCursor();
    this.createNavigation();
    this.createAnimations();
  }

  createAnimations() {
    this.animations = [];

    this.animationsTitles = map(this.elements.animationsTitles, (element) => {
      return new Title({
        element,
      });
    });

    this.animations.push(...this.animationsTitles);

    this.animationsParagraphs = map(
      this.elements.animationsParagraphs,
      (element) => {
        return new Paragraph({
          element,
        });
      }
    );

    this.animations.push(...this.animationsParagraphs);

    this.animationsLables = map(this.elements.animationsLables, (element) => {
      return new Lable({
        element,
      });
    });

    this.animations.push(...this.animationsLables);
  }

  initSmoothScroll() {
    this.scroll = new Scroll(this.elements.wrapper);
  }

  initParallax() {
    this.parallax = mapEach(this.elements.animationsImage, (element) => {
      return new Parallax(element);
    });
  }

  initCursor() {
    this.cursor = new Cursor();
  }

  createPreloader() {
    this.preloader = mapEach(this.elements.preloaders, (element) => {
      return new AsyncLoad({ element });
    });
  }

  createNavigation() {
    this.navigation = new Navigation();
  }

  show() {
    return new Promise((resolve) => {
      this.animationIn = gsap.timeline();

      this.animationIn.fromTo(this.element, { autoAlpha: 0 }, { autoAlpha: 1 });

      this.animationIn.call(() => {
        this.addEventListeners();

        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners();

      this.animationOut = gsap.timeline();

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        duration: 1,
        onComplete: resolve,
      });
    });
  }

  onMouseWheel(event) {}

  onResize() {
    each(this.animations, (animation) => animation.onResize());
  }

  update() {}

  addEventListeners() {}

  removeEventListeners() {}
}
