import { component } from "../decorators";

@component("body")
class Body {
  constructor(element) {
    let body = document.getElementsByTagName('body')[0];
    window.addEventListener("scroll", ev => {
      if (window.pageYOffset > 0) {
        body.classList.add("scrolling");
      } else {
        body.classList.remove("scrolling");
      }
    });
  }
}

export default Body;
