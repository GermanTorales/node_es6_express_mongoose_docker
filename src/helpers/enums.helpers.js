/**
 * With this function you can get one element from an array using dotnotation
 * @example
 * const anyArray = new Proxy(['first', 'second'], getProperty);
 * const element = anyArray.firts;
 * console.log(element) // 'firts';
 *
 * @returns {string} Array element
 */
export const getProperty = {
  get: (target, prop, arr) => {
    if (typeof prop === 'string') {
      const element = target.find(t => t?.toLowerCase() === prop.toLowerCase());

      return element || target[prop];
    }

    return Reflect.get(target, prop, arr);
  },
};
