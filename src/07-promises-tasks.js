/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 */
function willYouMarryMe(isPositiveAnswer) {
  return new Promise((resolve, reject) => {
    if (typeof isPositiveAnswer === 'boolean') {
      if (isPositiveAnswer) {
        resolve('Hooray!!! She said "Yes"!');
      } else {
        resolve('Oh no, she said "No".');
      }
    } else {
      reject(new Error('Wrong parameter is passed! Ask her again.'));
    }
  });
}

/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 */
function processAllPromises(array) {
  return Promise.all(array);
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 */
function getFastestPromise(array) {
  return Promise.race(array);
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 */
function chainPromises(array, action) {
  return array
    .reduce(
      (acc, promise) =>
        acc
          .then((res) => promise.then((val) => [...res, val]).catch(() => res))
          .catch(() => []),
      Promise.resolve([])
    )
    .then((results) => results.reduce(action));
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
