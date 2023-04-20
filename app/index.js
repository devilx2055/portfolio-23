import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";

class App {
  constructor() {
    this.createContent();
    this.createPages();
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      home: new Home(),
      work: new Work(),
      about: new About(),
      contact: new Contact(),
    };

    this.page = this.pages[this.template];
    this.page.create();

    console.log(this.page);
  }
}

new App();
