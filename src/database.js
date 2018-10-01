var pgp = require("pg-promise")();

var cn = {
  host: "localhost",
  port: 5432,
  database: "mydb",
  user: "jessepeterman",
  password: "jesus"
};

var db = pgp(cn);

db.query("SELECT * FROM users")
  .then(users => {
    users.forEach(user => {
      console.log(`${user.id}: ${user.firstname} ${user.lastname}`);
    });
  })
  .catch(error => {
    console.log(error);
  });

// db.query(
//   "INSERT INTO users VALUES(${this:id}, ${this:firstname}, ${this:lastname}",
//   {
//     id: 3,
//     firstname: "Bill",
//     lastname: "Johnson"
//   }
// )
// .then(res => {
//   console.log(res);
// })
// .catch(error => {
//   console.log(error);
// });

// const { Pool, Client } = require("pg");

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   database: "mydb",
//   user: "jessepeterman",
//   password: "jesus"
// });

// async function get(query => {
//   const res = await pool.query(query);
//   return res.rows;
// })

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// const client = new Client({
//   host: "localhost",
//   port: 5432,
//   database: "mydb",
//   user: "jessepeterman",
//   password: "jesus"
// });

// client.connect(() => {
//   if (err) {
//     return console.error("could not connect to postgres", err);
//   }
//   console.log("database connected");
// });

// client.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   client.end();
// });
