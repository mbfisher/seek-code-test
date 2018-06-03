export default class Checkout {
  items = [];

  constructor(customer) {
    this.id = new Date().getTime();
    this.customer = customer;
  }

  addAll(items) {
    this.items = items || [];
    this.update();
  }

  update() {}
}
