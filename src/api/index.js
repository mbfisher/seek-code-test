import express from "express";
import bodyParser from "body-parser";

import Checkout from "./Checkout";

const app = express();

app.use(bodyParser.json());

app.post("/checkout", (req, res) => {
  const { customer, items } = req.body;
  const checkout = new Checkout(customer);
  checkout.addAll(items);

  return res.json(checkout);
});

export default app;
