import request from "supertest";
import api from "../";

describe("POST /checkout", () => {
  test("accepts products are returns a total", async () => {
    const response = await request(api).post("/checkout");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});
