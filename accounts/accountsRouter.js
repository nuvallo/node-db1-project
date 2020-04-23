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
      if (account) {
        res.status(200).json(account);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Error finding account with that ID" });
      }
    })
    .catch((error) => {
      console.log("Error: ", err);
      res.status(500).json({ errorMessage: "Error retrieving account" });
    });
});

// POST new account

router.post("/", (req, res) => {
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
router.post("/", (req, res) => {
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

module.exports = router;
