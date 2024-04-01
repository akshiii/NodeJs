require("dotenv").config({ path: "../../.env" });
const users = require("../MOCK_DATA.json");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

//Custom middleware
app.use((req, res, next) => {
  console.log("Reached middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Reached middleware 2");
  //   res.end("hey");
  next();
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(process.env.PORT, () => {
  console.log("Server connected at ", process.env.PORT);
});
