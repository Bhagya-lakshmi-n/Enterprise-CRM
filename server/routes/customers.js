const express = require("express");
const router = express.Router();

const db = require("../database");

// Get all customers
router.get("/", (req, res) => {
  db.query("SELECT * FROM customers ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to get customers" });
    }

    res.json(results);
  });
});

// Add customer
router.post("/", (req, res) => {
  const { name, email, phone, company, status } = req.body;

  const sql = `
    INSERT INTO customers (name, email, phone, company, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, company, status || "Active"],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to add customer" });
      }

      res.json({
        message: "Customer added successfully",
        id: result.insertId
      });
    }
  );
});

// Delete customer
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM customers WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete customer" });
    }

    res.json({ message: "Customer deleted successfully" });
  });
});

module.exports = router;