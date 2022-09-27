const express = require("express");
const mysql = require("mysql");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 5001;

// Creating Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "phpmyadmin",
  password: "sam@1999",
  database: "timeline",
});
//bhsh
// connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

app.get("/", (req, res) => {
  res.send("Hello World h!");
});

// craete table
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE groups(id int AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
  res.send("table craeted");
});

// insert group data
app.post("/insertgroup", (req, res) => {
  const { title } = req.body;
  let sql = "INSERT INTO groups SET ? ";
  let query = db.query(sql, { title }, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
  res.send("group inserted");
});

// select groups
app.get("/getgroups", (req, res) => {
  let sql = "SELECT * FROM groups";
  let query = db.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

// select group by id
app.get("/getgroup/:id", (req, res) => {
  let sql = `SELECT * FROM groups WHERE id = ${req.params.id}`;
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// update group by id
app.put("/updategroup/:id", (req, res) => {
  let newTitle = req.body.title;
  let sql = `UPDATE groups SET title='${newTitle}'WHERE id = ${req.params.id}`;
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  res.send("Updated Successfully!");
});

// delete group by id
app.delete("/deletegroup/:id", (req, res) => {
  let sql = `DELETE FROM groups WHERE id = ${req.params.id}`;
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  res.send("Deleted Successfully!");
});

// insert item data
app.post("/insertitem", (req, res) => {
  let group = {
    group_id: req.body.group_id,
    title: req.body.title,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };
  let sql = "INSERT INTO items SET ? ";
  let query = db.query(sql, group, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
  res.send("item inserted");
});

// select items
app.get("/getitems", (req, res) => {
  let sql = "SELECT * FROM items";
  let query = db.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

// select item by id
app.get("/getitem/:id", (req, res) => {
  let sql = `SELECT * FROM items WHERE id = ${req.params.id}`;
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// update item by id
app.put("/updateitem/:id", (req, res) => {
  console.log(req.body[0]);
  let newTitle = req.body[0].title;
  let newGroup = req.body[0].group_id;
  let newStart = req.body[0].start_time;
  let newEnd = req.body[0].end_time;
  let sql = `UPDATE items SET title='${newTitle}', start_time='${newStart}', end_time='${newEnd}', group_id=${newGroup} WHERE id = ${req.params.id}`;
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  res.send("Updated Successfully!");
});

// delete item by id
app.delete("/deleteitem/:id", (req, res) => {
  let sql = `DELETE FROM items WHERE id = ${req.params.id}`;
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  res.send("Deleted Successfully!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
