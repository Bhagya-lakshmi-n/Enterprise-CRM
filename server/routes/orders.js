const express = require("express");

const router = express.Router();

const db = require("../database");

// Get all orders
router.get("/", (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get orders error:", err);
      return res.status(500).json({
        error: "Failed to get orders",
      });
    }

    res.json(results);
  });
});

// Add order
router.post("/", (req, res) => {
  const { customer, product, quantity, total_amount, status } = req.body;

  if (!customer || !product || !quantity || !total_amount) {
    return res.status(400).json({
      error: "Please fill all order details",
    });
  }

  const sql = `
    INSERT INTO orders
    (customer, product, quantity, total, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer,
      product,
      Number(quantity),
      Number(total_amount),
      status || "Pending",
    ],
    (err, result) => {
      if (err) {
        console.error("Add order error:", err);

        return res.status(500).json({
          error: "Failed to add order",
          details: err.message,
        });
      }

      res.json({
        message: "Order added successfully",
        id: result.insertId,
      });
    }
  );
});

// Delete order
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM orders WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error("Delete order error:", err);

        return res.status(500).json({
          error: "Failed to delete order",
        });
      }

      res.json({
        message: "Order deleted successfully",
      });
    }
  );
});

module.exports = router;