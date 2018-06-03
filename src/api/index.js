import express from "express";
import bodyParser from "body-parser";

import Checkout from "./Checkout";

const app = express();

app.use(bodyParser.json());

app.post("/checkout", (req, res) => {
  const customer = Customer.create(req.body.customer);

  const checkout = new Checkout(customer);
  checkout.addAll(items);

  return res.json({
    ...checkout,
    total: checkout.total()
  });
});

export default app;
