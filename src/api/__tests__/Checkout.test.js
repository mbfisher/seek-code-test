import Checkout from "../Checkout";
import Customer from "../Customer";

describe("Checkout", () => {
  describe("privileged customers", () => {
    test("default", async () =>
      expect(
        getTotal({
          customer: "default",
          items: ["classic", "standout", "premium"]
        })
      ).toEqual(987.97));
    test("unilever", async () =>
      expect(
        getTotal({
          customer: "unilever",
          items: ["classic", "classic", "classic", "premium"]
        })
      ).toEqual(934.97));
    test("apple", async () =>
      expect(
        getTotal({
          customer: "apple",
          items: ["standout", "standout", "standout", "premium"]
        })
      ).toEqual(1294.96));
    test("nike", async () =>
      expect(
        getTotal({
          customer: "nike",
          items: ["premium", "premium", "premium", "premium"]
        })
      ).toEqual(1519.96));
  });
});

const getTotal = ({ customer, items }) => {
  const checkout = new Checkout(Customer.create(customer));
  checkout.addAll(items);
  return checkout.total();
};
