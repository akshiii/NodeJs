require("dotenv").config({ path: "../../.env" });
const users = require("./MOCK_DATA.json");
const express = require("express");

const app = express();

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

//Create new user
app.post("/api/users", (req, res) => {
  return res.json({ status: "pending" });
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
