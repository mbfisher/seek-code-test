import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.post("/checkout", (req, res) => {
  //   const products = req.body.products;

  //   const checkout = new Checkout();
  //   checkout.addAll(products);

  return res.json();
});

export default app;
