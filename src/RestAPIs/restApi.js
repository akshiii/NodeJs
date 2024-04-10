require("dotenv").config({ path: "../../.env" });
const users = require("../MOCK_DATA.json");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

//Gives all users list and sends back data in JSON format,bcz it is /api/
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//Gives all users list and sends back data in HTML format
app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

//Create new user and send back status as 201(when something is created )
app.post("/api/users", (req, res) => {
  let body = req.body;
  console.log(body.first_name);
  if (!body.first_name || !body.last_name) {
    //Sending back 400 and error detail if required data is not there..
    return res
      .status(400)
      .json({ status: "wrong request, please send first_name and last_name" });
  }
  return res.status(201).json({ status: "done" });
});

//Common route for get/patch/delete
app
  .route("/api/users/:id")
  .get((req, res) => {
    //Finds the user which has id = :id and send back data in json type
    console.log(" id = ", req.params.id);
    const user = users.filter((user) => {
      return user.id === Number(req.params.id);
    });
    console.log(" user = ", user);
    return res.json(user);
  })
  .patch((req, res) => {
    //Edit the user which has id = :id and send back data in json type
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //Delete user with id = :id and send back data in json type(bcz it is /api/)
    return res.json({ status: "pending" });
  });

app.listen(process.env.PORT, () => {
  console.log("Server connected at ", process.env.PORT);
});
