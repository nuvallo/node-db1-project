const express = require("express");
const accountsRouter = require("../accounts/accountsRouter");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

server.use("/api/accounts", accountsRouter);

module.exports = server;
