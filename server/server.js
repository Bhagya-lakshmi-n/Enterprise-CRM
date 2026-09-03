const express = require("express");
const cors = require("cors");
require("dotenv").config();

const customersRouter = require("./routes/customers");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Enterprise CRM Backend is Running!",
    database: "Connected"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend and database are working"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Database connected successfully.");
});