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

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    console.log(" id = ", req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.status(200).json(user);
  })
  .patch(async (req, res) => {
    //Edit the user which has id = :id and send back data in json type
    await User.findByIdAndUpdate(req.params.id, { firstName: "Changed" });
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    //Delete user with id = :id and send back data in json type(bcz it is /api/)
    return res.json({ status: "success" });
  });

app.listen(process.env.PORT, () => {
  console.log("Server connected at ", process.env.PORT);
});
