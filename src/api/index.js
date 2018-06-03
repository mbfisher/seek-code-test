import express from "express";
import bodyParser from "body-parser";

import Checkout from "./Checkout";

const app = express();

app.use(bodyParser.json());

app.post("/checkout", (req, res) => {
  const items = req.body.items;

  const checkout = new Checkout();
  checkout.addAll(items);

  return res.json(checkout);
});

export default app;
