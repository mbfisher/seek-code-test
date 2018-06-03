import request from "supertest";
import api from "../";

describe("POST /checkout", () => {
  test("accepts items and returns a total", async () => {
    const checkout = await invokeApi({
      customer: "default",
      items: ["classic"]
    });

    expect(checkout.id).not.toBeNull();
    expect(checkout.customer).toEqual("default");
    expect(checkout.items).toEqual(["classic"]);
  });

  describe("privileged customers", () => {
    test("default", async () =>
      expect(
        invokeApi({
          customer: "default",
          items: ["classic", "standout", "premium"]
        }).total
      ).toEqual(987.97));
    test("unilever", async () =>
      expect(
        invokeApi({
          customer: "unilever",
          items: ["classic", "classic", "classic", "premium"]
        }).total
      ).toEqual(934.97));
    test("apple", async () =>
      expect(
        invokeApi({
          customer: "apple",
          items: ["standout", "standout", "standout", "premium"]
        }).total
      ).toEqual(1294.96));
    test("nike", async () =>
      expect(
        invokeApi({
          customer: "nike",
          items: ["premium", "premium", "premium", "premium"]
        }).total
      ).toEqual(1519.96));
  });
});

const invokeApi = async ({ customer, items }) => {
  const response = await request(api)
    .post("/checkout")
    .send({
      customer,
      items
    });

  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toEqual(
    "application/json; charset=utf-8"
  );

  console.info(response.body);
  return response.body;
};
