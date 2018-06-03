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
