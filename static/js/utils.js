// Based on utils from https://blog.garstasio.com/you-dont-need-jquery/utils/
const data = window.WeakMap ? new WeakMap() : (function () {
  let lastId = 0,
    store = {};

  return {
    set: function (element, info) {
      let id;
      if (element.myCustomDataTag === undefined) {
        id = lastId++;
        element.myCustomDataTag = id;
      }
      store[id] = info;
    },
    get: function (element) {
      return store[element.myCustomDataTag];
    }
  };
}());

export function getData(el) {
  return data.get(el);
}

export function setData(el, obj) {
  data.set(el, obj);
}

export function findComponent(componentClass) {
  return getData(document.querySelector(`[data-component="${componentClass.componentName}"]`)).component;
};

export class Timer {
  constructor(callback, delay) {
    let timerId, start, remaining = delay;

    this.pause = function () {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    let resume = function () {
      start = new Date();
      timerId = window.setTimeout(function () {
        remaining = delay;
        resume();
        callback();
      }, remaining);
    };
    this.resume = resume;

    this.reset = function () {
      remaining = delay;
    };

    this.resume();
  }
};
