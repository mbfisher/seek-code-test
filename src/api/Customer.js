import _ from "lodash";
import loadRules from "./rules";

export default class Customer {
  name = "";
  rules = {};

  static create(name) {
    return new Customer(name, loadRules(name));
  }

  constructor(name, rules) {
    this.name = name;
    this.rules = rules;
  }

  total(items) {
    return _(items)
      .countBy()
      .mapValues((numItems, type) => this.rules[type](numItems))
      .values()
      .sum();
  }
}
