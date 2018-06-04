/**
 * Simple facade around a Customer object, which contains the pricing rules.
 */
export default class Checkout {
  items = [];

  constructor(customer) {
    this.id = new Date().getTime();
    this.customer = customer;
  }

  addAll(items) {
    this.items = items || [];
  }

  total() {
    return this.customer.total(this.items);
  }
}
