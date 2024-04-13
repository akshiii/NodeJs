require("dotenv").config({ path: "../../.env" });
const users = require("../MOCK_DATA.json");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log("Server connected at ", process.env.PORT);
});
