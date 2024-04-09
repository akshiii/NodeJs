require("dotenv").config({ path: "../../.env" });
const users = require("../MOCK_DATA.json");
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));

//Custom middleware
app.use((req, res, next) => {
  console.log("Reached middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Reached middleware 2");
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()} :  ${req.ip} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(process.env.PORT, () => {
  console.log("Server connected at ", process.env.PORT);
});
