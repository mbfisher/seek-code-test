const app = express();

express.use(bodyParser.json());

express.post("/checkout", (req, res) => {
  const products = req.body.products;

  const checkout = new Checkout();
  checkout.addAll(products);

  return res.json(checkout);
});
