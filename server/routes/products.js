const express = require("express");

const router = express.Router();

const db = require("../database");

// Get all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Failed to get products",
      });
    }

    res.json(results);
  });
});

// Add product
router.post("/", (req, res) => {
  const { name, category, price, stock, status } = req.body;

  const sql = `
    INSERT INTO products
    (name, category, price, stock, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      category,
      price,
      stock || 0,
      status || "In Stock",
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Failed to add product",
        });
      }

      res.json({
        message: "Product added successfully",
        id: result.insertId,
      });
    }
  );
});

// Delete product
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM products WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Failed to delete product",
        });
      }

      res.json({
        message: "Product deleted successfully",
      });
    }
  );
});

module.exports = router;