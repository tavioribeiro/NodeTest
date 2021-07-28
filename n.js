const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');




  var db = mysql.createPool({
    host: "remotemysql.com",
    user: "YY8kacoyrE",
    password: "DqD1RVOBJA",
    database: "YY8kacoyrE"
  });

/*
app.get("/", (req, res)  =>
{
  var stm = "INSERT INTO nodeTest (company, ticker, stockPrice, timeElapsed) VALUES ('Vale', 'VAL', '1520.79 USD', '19 sec ago');";
  db.query(stm, (err, result) =>
  {
    res.send("Query realizada!");
  });

  //res.send("Node Server ON!");
})
*/

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get("/api/get", (req, res)  =>
{
  console.clear();
  var stm = "SELECT * FROM nodeTest;";
  db.query(stm, (err, result) =>
  {
    res.send(result);
    //console.log(result);
    //console.log(err);
    //res.send("Query realizada!");
  });

  //res.send("Node Server ON!");
})



app.post("/api/insert", (req, res)  =>
{

  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;
  var d = req.body.d;

  var stm = "INSERT INTO nodeTest (company, ticker, stockPrice, timeElapsed) VALUES (?,?,?,?);";
  db.query(stm, [ a, b,c, d], (err, result) =>
  {
    console.log(err);
    res.send("Query realizada!");
  });

  //res.send("Node Server ON!");
})


app.post("/api/att", (req, res)  =>
{

  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;
  var d = req.body.d;

  var stm = "UPDATE nodeTest SET company=?, ticker=?, stockPrice=?, timeElapsed = ? WHERE ticker=?;";
  db.query(stm, [ a, b,c, d, b], (err, result) =>
  {
    console.log(err);
    res.send("Query realizada!");
  });

  //res.send("Node Server ON!");
})


app.post("/api/deleti", (req, res)  =>
{

  var b = req.body.b;


  var stm = "DELETE FROM nodeTest WHERE ticker=?;";
  db.query(stm, b, (err, result) =>
  {
    console.log(err);
    res.send("Query realizada!");
  });

  //res.send("Node Server ON!");
})


app.listen(process.env.PORT || port, () =>
{
  //console.clear();
  console.log("================================================================================");
});







/*INSERT INTO nodeTest (company, ticker, stockPrice, timeElapsed)
VALUES ("Shopify Inc", "SHOP", "341.79 USD", "3 sec ago");*/



/*var http = require('http');


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Testando!');
  


  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "YY8kacoyrE",
    password: "DqD1RVOBJA",
    database: "YY8kacoyrE"
  });

  con.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    con.query("SELECT * FROM Usuario", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.end(result);
    });
  });
}).listen(8080);
*/


/*
CREATE TABLE nodeTest
(
  company VARCHAR(45) NOT NULL,
  ticker VARCHAR(45) NOT NULL,
  stockPrice VARCHAR(45) NOT NULL,
  timeElapsed VARCHAR(45) NOT NULL,
  PRIMARY KEY  (ticker)
);*/