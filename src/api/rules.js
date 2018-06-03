import _ from "lodash";

export const fixedPrice = price => numItems => numItems * price;

export const nForM = (n, m, price) => numItems =>
  numItems * price - Math.floor(numItems / n) * (n - m) * price;

export const bulkDiscount = (
  threshold,
  discountedPrice,
  defaultPrice
) => numItems =>
  numItems >= threshold ? numItems * discountedPrice : numItems * defaultPrice;

const defaults = {
  classic: 269.99,
  standout: 322.99,
  premium: 394.99
};

const rules = {
  default: {
    classic: fixedPrice(defaults.classic),
    standout: fixedPrice(defaults.standout),
    premium: fixedPrice(defaults.premium)
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

const loadRules = customer => ({
  ...rules.default,
  ...rules[customer]
});

export default loadRules;
