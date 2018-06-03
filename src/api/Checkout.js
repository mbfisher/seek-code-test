export default class Checkout {
  items = [];

  constructor() {
    this.id = new Date().getTime();
  }

  addAll(items) {
    this.items = items || [];
    this.update();
  }

  update() {}
}
