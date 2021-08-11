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


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));




/*
//FUNCIONANDOOOO===========================================================
app.post("/api/check", (req, res)  =>
{
  var a = req.body.a;
  var b = req.body.b;

  console.log("---------------- " + a);

  var stm = "SELECT * FROM usuario where login = ?";
  db.query(stm, [ a ], (err, result) =>
  {
    console.log(err);
    console.log(result[0].nome);
    res.send(result);
  });
})
//FUNCIONANDOOOO===========================================================
*/


app.post("/api/check", (req, res)  =>
{
  var a = req.body.a;
  var b = req.body.b;
  
  console.log("---------------- " + a);

  var stm = "SELECT * FROM usuario where login = ?";
  db.query(stm, [ a ], (err, result) =>
  {
    if (err)
    {
      res.send('0');
    } 
    else if (result.length==0)
    {
      res.send('0'); //this is what you are missing
    }
    else
    {
      if(result[0].senha === b)
      {
        res.send(result[0].nome);
      }
      else
      {
        res.send('1');
      }
    }
  })

})

app.listen(process.env.PORT || port, () =>
{
  //console.clear();
  console.log("================================================================================");
});

