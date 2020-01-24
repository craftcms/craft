import "lazysizes";
import "lazysizes/plugins/unveilhooks/ls.unveilhooks";
import "lazysizes/plugins/object-fit/ls.object-fit";

import { getData, setData } from "./utils";

import Body from "./components/body";
import FadeCarousel from "./components/fade-carousel";
import FooterForm from "./components/footer-form";
import JoinForm from "./components/join-form";
import NavOverlay from "./components/nav-overlay";
import NavSidebar from "./components/nav-sidebar";
import NavTrigger from "./components/nav-trigger";
import StatesMap from "./components/states-map";


let App = {
  components: [
    Body,
    FadeCarousel,
    FooterForm,
    JoinForm,
    NavOverlay,
    NavSidebar,
    NavTrigger,
    StatesMap
  ]
};

(() => {
  // Bind components
  document.querySelectorAll("[data-component]").forEach(el => {
    let names = el.getAttribute("data-component").split(",");
    names.forEach(name => {
      let component = App.components.find(c => c.componentName === name);
      if (!component) {
        console.error(`[App] Component "${name}" is not defined`);
        return false;
      } else {
        let existing = getData(el) && getData(el).loadedComponents;
        if (!existing) {
          existing = [];
          setData(el, { loadedComponents: existing });
        }
        if (!(name in getData(el).loadedComponents)) {
          let options;
          try {
            options =
              eval("(" + el.getAttribute("data-component-options") + ")") || {};
          } catch (ex) {
            options = {};
          }
          let Constructor = component;
          let obj = new Constructor(el, options);
          existing.push(name);
          setData(el, { component: obj });
          console.debug(`[App] Component "${name}" loaded.`);
        } else {
          console.debug(`[App] Component "${name}" already loaded`);
        }
      }
    });
  });
})();
