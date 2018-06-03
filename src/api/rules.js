const fixedPrice = price => numItems => numItems * price;

const rules = {
  default: {
    classic: fixedPrice(269.99),
    standout: fixedPrice(322.99),
    premium: fixedPrice(394.99)
  }
};

const loadRules = customer => ({
  ...rules.default,
  ...rules[customer]
});

export default loadRules;
