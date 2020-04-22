const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

router.use("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.status(200).json({ accounts });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

module.exports = router;
