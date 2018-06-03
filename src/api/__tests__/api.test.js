import request from "supertest";
import api from "../";

describe("POST /checkout", () => {
  test("accepts products are returns a total", async () => {
    const customer = "default";
    const items = ["classic"];

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

    const checkout = response.body;
    console.info(checkout);

    expect(checkout.id).not.toBeNull();
    expect(checkout.customer).toEqual(customer);
    expect(checkout.items).toEqual(items);
  });
});
