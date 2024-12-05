/* *********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                                *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions                     *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures                            *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * Returns the functions composition of two specified functions f(x) and g(x).
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 */
function getComposition(f, g) {
  return function (x) {
    return f(g(x));
  };
}

/**
 * Returns the math power function with the specified exponent.
 * @param {number} exponent
 * @return {Function}
 */
function getPowerFunction(exponent) {
  return function (x) {
    return x ** exponent;
  };
}

/**
 * Returns the polynomial function of one argument based on specified coefficients.
 * @param {integer} [a=0] Coefficient for x^2
 * @param {integer} [b=0] Coefficient for x
 * @param {integer} [c=0] Constant term
 * @return {Function|null}
 */
function getPolynom(...coeffs) {
  if (coeffs.length === 0) return null;
  return function polynom(x) {
    return coeffs.reduce((acc, coeff, index) => {
      const power = coeffs.length - 1 - index;
      return acc + coeff * x ** power; // Разделили длинную строку
    }, 0);
  };
}

/**
 * Memoizes a passed function and returns a function that caches the result.
 * @param {Function} func
 * @return {Function}
 */
function memoize(func) {
  let cache;
  let isCached = false;

  return function () {
    if (!isCached) {
      cache = func();
      isCached = true;
    }
    return cache;
  };
}

/**
 * Returns a function that retries the passed function a specified number of times.
 * @param {Function} func
 * @param {number} attempts
 * @return {Function}
 */
function retry(func, attempts) {
  return function () {
    let lastError;
    for (let i = 0; i < attempts; i++) {
      try {
        return func();
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  };
}

/**
 * Returns the logging wrapper for the specified method.
 * @param {Function} func
 * @param {Function} logFunc
 * @return {Function}
 */
function logger(func, logFunc) {
  return function (...args) {
    const argString = args.map((arg) => JSON.stringify(arg)).join(',');
    logFunc(`${func.name}(${argString}) starts`);
    const result = func(...args);
    logFunc(`${func.name}(${argString}) ends`);
    return result;
  };
}

/**
 * Returns a function with partially applied arguments.
 * @param {Function} fn
 * @param {...*} args1
 * @return {Function}
 */
function partialUsingArguments(fn, ...args1) {
  return function (...args2) {
    return fn(...args1, ...args2);
  };
}

/**
 * Returns an ID generator function that generates the next integer starting from a given number.
 * @param {number} startFrom
 * @return {Function}
 */
function getIdGeneratorFunction(startFrom) {
  let current = startFrom;
  return function () {
    return current++;
  };
}

module.exports = {
  getComposition,
  getPowerFunction,
  getPolynom,
  memoize,
  retry,
  logger,
  partialUsingArguments,
  getIdGeneratorFunction,
};
