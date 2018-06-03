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
    const total = this.customer.total(this.items);
    // console.info({ customer: this.customer.name, items: this.items, total });
    return total;
  }
}
