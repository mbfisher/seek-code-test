import Checkout from "./Checkout";
import Customer from "./Customer";
import _ from "lodash";

describe("Checkout", () => {
  describe("privileged customers", () => {
    test("default", async () =>
      expect(
        getTotal({
          customer: "default",
          items: {
            classic: 1,
            standout: 1,
            premium: 1
          }
        })
      ).toEqual(987.97));
    test("unilever", async () =>
      expect(
        getTotal({
          customer: "unilever",
          items: {
            classic: 3,
            premium: 1
          }
        })
      ).toEqual(934.97));
    test("apple", async () =>
      expect(
        getTotal({
          customer: "apple",
          items: {
            standout: 3,
            premium: 1
          }
        })
      ).toEqual(1294.96));
    test("nike", async () =>
      expect(
        getTotal({
          customer: "nike",
          items: {
            premium: 4
          }
        })
      ).toEqual(1519.96));
    test("ford", async () =>
      expect(
        getTotal({
          customer: "ford",
          items: {
            classic: 5,
            standout: 3,
            premium: 6
          }
        })
      ).toEqual(4349.87));
  });

  describe("jora local membership", () => {
    test("fixed price", () => {
      expect(
        getTotal({
          customer: "default",
          items: {
            membership: 1
          }
        })
      ).toEqual(99);
    });

    test("freebie", () => {
      expect(
        getTotal({
          customer: "default",
          items: {
            classic: 10,
            membership: 1
          }
        })
      ).toEqual(2699.9);
    });
  });
});

const getTotal = ({ customer, items }) => {
  const checkout = new Checkout(Customer.create(customer));
  checkout.addAll(
    _(items)
      .flatMap((v, k) => _.fill(Array(v), k))
      .value()
  );
  // console.log(checkout);
  return checkout.total();
};
