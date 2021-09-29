/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    // eslint-disable-next-line no-param-reassign
    if (object && Object.prototype.hasOwnProperty.call(object, key)) obj[key] = object[key];

    return obj;
  }, {});
};

export default pick;
