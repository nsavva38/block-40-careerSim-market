require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(require("morgan")("dev"));
app.use(express.json());

app.use(require("./routes/auth").router);
app.use("/orders", require("./routes/orders"));
app.use("/products", require("./routes/products"));

app.use((req, res, next) => {
  next({
    status: 404,
    message: `Endpoint not found.`,
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.send(err.message ?? "Sorry, something broke.");
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});