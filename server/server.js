// var config = require("../config.js");
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
require("dotenv").config();

// console.log(process.env);

// const pg = require("pg");
// var pgp = require("pg-promise")();
// var db = pgp(config);

const { Pool, Client } = require("pg");
const connectionString = process.env.REACT_APP_DATABASE_URL;

const db = new Client({
  connectionString: connectionString
});

// console.log(db)

db.connect();

// client.query("SELECT * from users", (err, res) => {
//   console.log(err, res);
//   client.end();
// });

app.use(bodyParser());
app.use(function(req, res, next) {
  // const corsURL =
  //   process.env.NODE_ENV === "development"
  //     ? "http://localhost:3000"
  //     : process.env.REACT_APP_CORSURL;
  const corsURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://objective-lalande-b7a1e9.netlify.com";

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);

var port = process.env.PORT || 8080;

router.use((req, res, next) => {
  console.log("Something is happening.");
  next();
});

//Create new DB if it doesn't exist
// db.query(`CREATE DATABASE mydb`)
//   .then(user => res.json(user))
//   .catch(err => console.log(err));

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
  db.query(`SELECT * FROM users WHERE id=${id}`)
    .then(user => res.json(user))
    .csatch(err => console.log(err));
});

router.post("/users", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  db.query(
    `INSERT INTO users(firstname, lastname, email) VALUES('${firstName}', '${lastName}', '${email}')`
  )
    .then(response => response)
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

  db.query(
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
