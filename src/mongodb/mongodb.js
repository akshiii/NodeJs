require("dotenv").config({ path: "../../.env" });
// const users = require("../MOCK_DATA.json");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: false }));

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-db-basics")
  .then(() => {
    console.log("DB connected!!");
  })
  .catch((err) => {
    console.error("Error with Db connection", err);
  });

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

//Model
const User = mongoose.model("user", userSchema);

app.post("/api/users", async (req, res) => {
  let body = req.body;
  console.log(body.first_name);
  if (!body.first_name || !body.last_name) {
    //Sending back 400 and error detail if required data is not there..
    return res
      .status(400)
      .json({ status: "wrong request, please send first_name and last_name" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
  });
  console.log(result);
  return res.status(201).json({ msg: "success" });
});

app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find();
  console.log("All users from db = ", allDBUsers);
  res.setHeader("X-myName", "Akshii");
  return res.json(allDBUsers);
});

app.listen(process.env.PORT, () => {
  console.log("Server connected at ", process.env.PORT);
});
