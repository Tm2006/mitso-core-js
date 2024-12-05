/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = function () {
    return this.width * this.height;
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"width":10,"height":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}

/**
 * CSS selectors builder
 */
class Selector {
  constructor() {
    this.result = '';
    this.order = [];
  }

  checkOrder(type) {
    const orderMap = ['element', 'id', 'class', 'attr', 'pseudoClass', 'pseudoElement'];
    const currentIndex = orderMap.indexOf(type);

    if (this.order.includes(type)) {
      if (['element', 'id', 'pseudoElement'].includes(type)) {
        throw new Error('Element, id and pseudo-element should not occur more than once inside the selector');
      }
    }

    if (this.order.length && Math.max(...this.order.map((o) => orderMap.indexOf(o))) > currentIndex) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    this.order.push(type);
  }

  element(value) {
    this.checkOrder('element');
    this.result += value;
    return this;
  }

  id(value) {
    this.checkOrder('id');
    this.result += `#${value}`;
    return this;
  }

  class(value) {
    this.checkOrder('class');
    this.result += `.${value}`;
    return this;
  }

  attr(value) {
    this.checkOrder('attr');
    this.result += `[${value}]`;
    return this;
  }

  pseudoClass(value) {
    this.checkOrder('pseudoClass');
    this.result += `:${value}`;
    return this;
  }

  pseudoElement(value) {
    this.checkOrder('pseudoElement');
    this.result += `::${value}`;
    return this;
  }

  stringify() {
    return this.result;
  }

  combine(selector1, combinator, selector2) {
    this.result = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  }
}

const cssSelectorBuilder = {
  answer: '',
  element(value) {
    this.error(1);
    const obj = Object.create(cssSelectorBuilder);
    obj.i = 1;
    obj.answer = `${this.answer}${value}`;
    return obj;
  },

  id(value) {
    this.error(2);
    const obj = Object.create(cssSelectorBuilder);
    obj.i = 2;
    obj.answer = `${this.answer}#${value}`;
    return obj;
  },

  class(value) {
    this.error(3);
    const obj = Object.create(cssSelectorBuilder);
    obj.i = 3;
    obj.answer = `${this.answer}.${value}`;
    return obj;
  },

  attr(value) {
    this.error(4);
    const obj = Object.create(cssSelectorBuilder);
    obj.i = 4;
    obj.answer = `${this.answer}[${value}]`;
    return obj;
  },

  pseudoClass(value) {
    this.error(5);
    const obj = Object.create(cssSelectorBuilder);
    obj.i = 5;
    obj.answer = `${this.answer}:${value}`;
    return obj;
  },

  pseudoElement(value) {
    this.error(6);
    const obj = Object.create(cssSelectorBuilder);
    obj.i = 6;
    obj.answer = `${this.answer}::${value}`;
    return obj;
  },

  combine(selector1, combinator, selector2) {
    const obj = Object.create(cssSelectorBuilder);
    obj.answer = `${selector1.answer} ${combinator} ${selector2.answer}`;
    return obj;
  },

  stringify() {
    return this.answer;
  },

  error(newIndex) {
    if (this.i > newIndex) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    if (this.i === newIndex && (newIndex === 1 || newIndex === 2 || newIndex === 6)) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
