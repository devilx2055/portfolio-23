import { forEach, map } from "lodash";
import gsap from "gsap";
import each from "lodash/each";
import Prefix from "prefix";
import NormalizeWheel from "normalize-wheel";

import Scroll from "../components/Scroll";
import Parallax from "../animation/Parallax";
import Cursor from "../components/Cursor";
import Navigation from "../components/Navigation";

import AsyncLoad from "../classes/AsyncLoad";

import { mapEach } from "../utils/dom";

import Lable from "../animation/Lable";
import Paragraph from "../animation/Paragraph";
import Title from "../animation/Title";

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

    this.scroll = {
      current: 0,
      target: 0,
      limit: 0,
      last: 0,
    };

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

    this.createAnimations();
    this.createPreloader();
    // this.initSmoothScroll();
    this.initParallax();
    this.initCursor();
    this.createNavigation();
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

  createPreloader() {
    this.preloader = mapEach(this.elements.preloaders, (element) => {
      return new AsyncLoad({ element });
    });
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

  createNavigation() {
    this.navigation = new Navigation();
  }

  show() {
    return new Promise((resolve) => {
      this.onResize();
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

  onMouseWheel({ pixelY }) {
    this.scroll.target += pixelY;
  }

  onResize() {
    if (this.elements.wrapper) {
      //   this.scroll.update();

      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight;
    }

    each(this.animations, (animation) => animation.onResize());
  }

  update() {
    this.scroll.target = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }

  addEventListeners() {}

  removeEventListeners() {}
}
