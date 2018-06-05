import _ from "lodash";

/* * * * * * * * Rule Helpers * * * * * * * */

/**
 * Create a function that computes a fixed price.
 */
export const fixedPrice = price => numItems => numItems * price;

/**
 * Create a function that computes a "3 for the price of 2" deal.
 */
export const nForM = (n, m, price) => numItems =>
  numItems * price - Math.floor(numItems / n) * (n - m) * price;

/**
 * Create a function that computes a bulk discount deal where a discounted
 * price is used if the number of items is above a threshold.
 */
export const bulkDiscount = (
  threshold,
  discountedPrice,
  defaultPrice
) => numItems =>
  numItems >= threshold ? numItems * discountedPrice : numItems * defaultPrice;

export const introductionOffer = (threshold, discountedPrice, defaultPrice) => (
  numItems,
  items
) =>
  Object.values(items).reduce((total, n) => total + n, 0) >= threshold
    ? numItems * discountedPrice
    : numItems * defaultPrice;

/* * * * * * * * Rule Definitions * * * * * * */

const defaults = {
  classic: 269.99,
  standout: 322.99,
  premium: 394.99,
  membership: 99
};

/*
 * Define default rules and override item types for each customer.
 * `loadRules` will provide the default rules for types that aren't
 * overridden.
 */
const rules = {
  default: {
    classic: fixedPrice(defaults.classic),
    standout: fixedPrice(defaults.standout),
    premium: fixedPrice(defaults.premium),
    membership: introductionOffer(10, 0, defaults.membership)
  },
  unilever: {
    classic: nForM(3, 2, defaults.classic)
  },
  apple: {
    standout: fixedPrice(299.99)
  },
  nike: {
    premium: bulkDiscount(4, 379.99, defaults.premium)
  },
  ford: {
    classic: nForM(5, 4, defaults.classic),
    standout: fixedPrice(309.99),
    premium: bulkDiscount(3, 389.99, defaults.premium)
  }
};

// Utility function to expose rules without exposing simplistic object interface.
const loadRules = customer => ({
  ...rules.default,
  ...rules[customer]
});

export default loadRules;
