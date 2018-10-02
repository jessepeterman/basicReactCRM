var config = require("../config.js");
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var pgp = require("pg-promise")();
var db = pgp(config);

// app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);

var port = process.env.PORT || 8080;

router.use((req, res, next) => {
  console.log("Something is happening.");
  next();
});

router.get("/", (req, res) => {
  return res.json({ message: "hoooray...api here" });
});

router.get("/users", (req, res) => {
  db.query("SELECT * FROM users")
    .then(users => res.json(users))
    .catch(error => console.log(error));
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.one(`SELECT * FROM users WHERE id=${id}`)
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

router.post("/users", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  db.query(
    `INSERT INTO users(firstname, lastname, email) VALUES('${firstName}', '${lastName}', '${email}')`
  )
    .then(response => response.json())
    .catch(err => console.log(err));

  // console.log("created new user");
  // res.json({ Response: "User created!" });
});

router.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query(`DELETE FROM users WHERE id = ${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

router.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  console.log(id, firstName, lastName, email);

  db.none(
    //     `UPDATE users SET firstname=${firstName} lastname=${lastName} email=${email}
    // WHERE id=${id}`
    `update users set firstname=$1, lastname=$2, email=$3 where id=${id}`,
    [firstName, lastName, email]
  )
    .then(res => res)
    .catch(err => console.log(err));
});

// add delete user route/functionality
// add edit user details form
//

// router.get("/users/:user_id", (req, res) => {});

app.listen(port);
console.log("Magic happens on port " + port);
