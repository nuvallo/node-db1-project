const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

// GET accounts
router.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.status(200).json({ accounts });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

// Get specific account with ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .first()
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ errorMessage: "Error retrieving account" });
    });
});

// POST new account

router.post("/", validateAccountBody(), (req, res) => {
  const accountData = req.body;

  db("accounts")
    .insert(accountData)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ errorMessage: "Error adding account" });
    });
});

// PUT Update existing account
router.put("/:id", validateAccountBody(), (req, res) => {
  const { id } = req.params;
  const accountData = req.body;

  db("accounts")
    .where({ id })
    .update(accountData)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ errorMessage: "Error adding account" });
    });
});

// DELETE existing account
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .del()
    .then(() => {
      res.status(200).json({ message: "Account Removed!" });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ errorMessage: "Error removing account" });
    });
});

function validateAccountBody() {
  return (req, res, next) => {
    const { name, budget } = req.body;
    if (!name || !budget) {
      res.status(400).json({ errorMessage: "Name and budget required" });
    }
    next();
  };
}

module.exports = router;
