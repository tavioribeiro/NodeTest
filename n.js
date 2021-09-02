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
        if(result[0].senha === b)
          {
            console.log(result[0]);

            var resultado = 
            {
              nome:result[0].nome,
              id:result[0].id.toString()
            }
            res.send(resultado);
          }
      }
      else
      {
        res.send('1');
      }
    }
  })
})



app.post("/api/create", (req, res)  =>
{
  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;
  var d = Math.floor(Math.random() * 999999);
  
  console.log("---------------- " + a);

  var stm = "INSERT INTO usuario (login, senha, nome, id) VALUES (?, ?, ?, ?)";
  db.query(stm, [ a, b, c, d], (err, result) =>
  {
    //console.log(result);

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
      var stm2 = "SELECT * FROM usuario where login = ?";
      db.query(stm2, [ a ], (err, result) =>
      {
        if (err)
        {
          console.log(err);
          res.send('0');
        } 
        else if (result.length==0)
        {
          console.log(err);
          res.send('0'); //this is what you are missing
        }
        else
        {
          if(result[0].senha === b)
          {
            console.log(result[0]);
            var resultado = 
            {
              a:result[0].nome,
              b:result[0].id.toString()
            }
            res.send(resultado);
          }
          else
          {
            res.send('1');
          }
        }
      })
    }
  })
})




app.post("/api/postuserdata", (req, res)  =>
{
  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;
  var d = req.body.d;
  var e = req.body.e;
  var f = req.body.f;
  var g = req.body.g;
  var h = req.body.h;
  var i = req.body.i;
  var j = req.body.j;
  var k = req.body.k;
  


  console.log("---------------- " + req.body.d );


  var stm = "INSERT INTO dadosUsuario (idUsuario, nome, idade, sexo, peso, altura, abdomem, pescoco, quadril, nivelatividade, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(stm, [ a, b, c, d, e, f, g, h, i, j, k], (err, result) =>
  {
    if (err)
    {
      console.log(err);
      res.send('0');
    } 
    else if (result.length == 0)
    {
      console.log(result[0]);
      res.send('0'); //this is what you are missing
    }
    else
    {
      console.log(result[0]);
      res.send("SUCESSO");
    }
  })
})





app.post("/api/updateuserdata", (req, res)  =>
{
  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;
  var d = req.body.d;
  var e = req.body.e;
  var f = req.body.f;
  var g = req.body.g;
  var h = req.body.h;
  var i = req.body.i;
  var j = req.body.j;
  var k = req.body.k;
  


  console.log("---------------- " + req.body.d );

  //db.query(stm, [ a, b, c, d, e, f, i, j, k, l, m, n ]
  //var stm = "INSERT INTO dadosUsuario (id, idUsuario, nome, idade, sexo, peso, altura, abdomem, pescoco, quadril, nivelatividade, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //db.query(stm, [ a, d, c, c, c, c, c, c, c, c, c, c], (err, result) =>
  
  var stm = "UPDATE dadosUsuario SET nome=?, idade=?, sexo=?, peso=?, altura=?, abdomem=?, pescoco=?, quadril=?, nivelatividade=?, objetivo=? WHERE idUsuario=?";
  db.query(stm, [ b, c, d, e, f, g, h, i, j, k, a], (err, result) =>
  {
    if (err)
    {
      console.log(err);
      res.send('0');
    } 
    else if (result.length == 0)
    {
      res.send('0'); //this is what you are missing
    }
    else
    {
      var stm2 = "SELECT * FROM dadosUsuario WHERE idUsuario=?";
      db.query(stm2, [ a ], (err, result) =>
      {
        res.send(result[0]);
      })
    }
  })
})






app.post("/api/getuserdata", (req, res)  =>
{
  var a = req.body.a;

  var stm2 = "SELECT * FROM dadosUsuario WHERE idUsuario=?";
  db.query(stm2, [ a ], (err, result) =>
  {
    if (err)
    {
      console.log(err);
      res.send('0');
    } 
    else if (result.length == 0)
    {
      res.send('0'); //this is what you are missing
    }
    else
    {
      res.send(result[0]);
    }
  })
})


app.post("/api/postvalues", (req, res)  =>
{
  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;
  var d = req.body.d;

  var stm = "INSERT INTO dados (idUsuario, data, imc, gc ) VALUES (?, ?, ?, ?)";
  db.query(stm, [ a, b, c, d], (err, result) =>
  {
    if (err)
    {
      console.log(err);
      res.send('0');
    } 
    else if (result.length == 0)
    {
      res.send('1'); //this is what you are missing
    }
    else
    {
      res.send(result[0]);
    }
  })
})




app.post("/api/getvalues", (req, res)  =>
{
  var a = req.body.a;

  var stm2 = "SELECT * FROM dados WHERE idUsuario=?";
  db.query(stm2, [ a ], (err, result) =>
  {
    if (err)
    {
      console.log(err);
      res.send('0');
    } 
    else if (result.length == 0)
    {
      res.send('1'); //this is what you are missing
    }
    else
    {/*
      var label = new Array();
      var data = new Array();

      for(var i = 0; i<result.length; i++)
      {
        label.push(result[i].data);
        data.push(result[i].imc);
      }

      var resultado = 
      
        [
          {
          a:label,
          b:data
        }
        ]
      */
      res.send(result);
    }
  })
})








app.listen(process.env.PORT || port, () =>
{
  //console.clear();
  console.log("================================================================================");
});
