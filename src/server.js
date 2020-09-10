import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";

const conn = mysql.createConnection({
  host: "lambda-rds-786.cyyzubtzjssq.ap-southeast-1.rds.amazonaws.com",
  user: "zeeshan",
  password: "Zeeshan786",
  database: "invoices",
});

const app = express();

app.use(bodyParser.json());

app.get("/invoiceList", (req, res) => {
  conn.query("SELECT * FROM invoices LIMIT 20", (error, results) => {
    if (error)
      res.status(200).json({ message: "something went wrong!", error });
    res.status(200).json({ message: "success", data: results });
  });
});

app.get("/", function (req, res) {
  res.status(200).json({ message: "Ok" });
});

app.listen(8090, (err) => {
  if (err) console.log(err);
  console.log("Server is running on Port: http://localhost:8090");
});
