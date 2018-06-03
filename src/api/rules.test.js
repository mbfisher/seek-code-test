import _ from "lodash";
import { nForM } from "./rules";

describe("nForM", () => {
  const total = nForM(3, 2, 5);

  test("1 item", () => expect(total(1)).toEqual(5));
  test("2 items", () => expect(total(2)).toEqual(10));
  test("3 items", () => expect(total(3)).toEqual(10));
  test("4 items", () => expect(total(4)).toEqual(15));
  test("5 items", () => expect(total(5)).toEqual(20));
  test("6 items", () => expect(total(6)).toEqual(20));
});
