export function component(name) {
  return function (target) {
    target.componentName = name;
  }
}
