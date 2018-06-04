import _ from "lodash";
import loadRules from "./rules";

export default class Customer {
  name = "";
  rules = {};

  static create(name) {
    return new Customer(name, loadRules(name));
  }

  /**
   * Create a Customer with some pricing rules.
   *
   * `rules` should be an object, having a key for each of the item types
   * 'classic', 'standout' and 'premium', and the value being a function
   * that takes a single argument of number of items of that type in the cart,
   * and returns a sub-total for those items.
   */
  constructor(name, rules) {
    this.name = name;
    this.rules = rules;
  }

  /**
   * Apply customer specific pricing rules to compute a total.
   */
  total(items) {
    return Number(
      _(items)
        // Get an object of item type to frequency.
        .countBy()
        // Apply each rule to get an object of item type to sub-total.
        .mapValues((numItems, type) => this.rules[type](numItems))
        // Take the values,
        .values()
        // sum them,
        .sum()
        // and round.
        .toFixed(2)
    );
  }
}
