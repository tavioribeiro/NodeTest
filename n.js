const express = require('express');
const app = express();
const port = 3001;
var ip = require('ip');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var path = require('path');
const fs = require('fs');
const multer  = require('multer');
//const sharp = require('sharp');
const { Op } = require("sequelize");

var CryptoJS = require("crypto-js");

const SECRET = "legpress";
var blackListJWT = [];

app.use(cors({oringin: '*'}));

app.use(express.static("public"));

app.use(express.json());



//== DB ===============================

const db = require('./db/db.js');

//== MODELS IMPORT ===============================

const Atendente = require('./db/models/atendente.js');
const Categoria = require('./db/models/categoria.js');
const ClienteFixo = require('./db/models/clienteFixo.js');
const ControleIDPedido = require('./db/models/controleIDPedido.js');
const ItemPedido = require('./db/models/itemPedido.js');
const Pedido = require('./db/models/pedido.js');
const Produto = require('./db/models/produto.js');
const Stock = require('./db/models/stock.js'); 



/*
O-O
Foo.hasOne(Bar);
Bar.belongsTo(Foo);


O-M
Team.hasMany(Player);
Player.belongsTo(Team);


M-M
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });
*/


//== RELACIONAMENTOS ===============================

 //1
Produto.belongsTo(Categoria);
//Categoria.hasMany(Produto);

//2
//Stock.hasMany(Produto);
Produto.belongsTo(Stock); 

//3
ItemPedido.belongsTo(Produto);
Produto.hasMany(ItemPedido);


///4
Pedido.hasMany(ItemPedido);
ItemPedido.belongsTo(Pedido);



//5
//Atendente.hasMany(Pedido);
//Pedido.belongsTo(Atendente); 




//BANCO DE DADOS =======================================================================================================================
app.get('/', (req, res) =>
{
  (async() =>
  {
    try
    {
      await db.authenticate();
      console.log('Connection has been established successfully.');
      return res.send('Connection has been established successfully.');
    } 
    catch (error)
    {
      console.error('Unable to connect to the database:', error);
      return res.send('Unable to connect to the database:', error);
    }
  })();
});



app.get('/criarADM', (req, res) =>
{
  (async() =>
  {
    try
    {
      //encrypt password
      


      const atendente = await Atendente.create({nome:"filo3", senha:password,telefone:"123456789", descricao:""});
      return res.json({auth: false, token: null, info: "✅ Atendente fe criado com sucesso!"});
    } 
    catch (error)
    {
      console.error('Unable to connect to the database:', error);
      return res.send('Unable to connect to the database:');
    }
  })();
});


app.get('/force', (req, res) =>
{
  (async() =>
  {
    try
    {
      //await db.sync();
      await db.sync({ force: true });
      console.log("All models were synchronized successfully.");
      return res.send("All models were synchronized successfully.");
    }
    catch (error)
    {
      console.error('Unable to force creation:', error);
      return res.send('Unable to force creation:', error);
    }
  })();
});


//== ROTAS ===============================================================================================================================

//== ROTAS DE PRODUTO ==//

//------------------------------ multer ------------------------------//

//var uploadProdutos = multer({dest:"uploads/images/produtos/"});


/* const storageProduto = multer.diskStorage(
{
  destination: function (req, file, callback)
  {
    callback(null, 'uploads/images/produtos');
  },
  filename: function (req, file, callback)
  {
    callback(null, file.originalname);
  }
});

const uploadProduto = multer({ storage: storageProduto }).single('file'); */



var storageProduto = multer.diskStorage(
{
  destination: function (req, file, callback)
  {
    callback(null, 'uploads/images/produtos');
  },
  filename: function (req, file, callback)
  {
    let r = (Math.random() + 1).toString(36).substring(7);
    let nome = r.toString() + file.originalname;
    callback(null, nome);
  }
})

var uploadProduto = multer({ storage: storageProduto });
//-------------------------------------------------------------------//

app.get('/api/admin/produto', (req, res) =>
{
  console.log(req.body);

  (async() =>
  {
    try
    {
      const produtos = await Produto.findAll();
      return res.send(produtos);
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});



app.get('/api/produto', (req, res) =>
{
  console.log(req.body);

  (async() =>
  {
    try
    {
      const produtos = await Produto.findAll({where: {quantidadeDisponivel: {[Op.gt]: 0}}});
      return res.send(produtos);
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});


app.post('/api/admin/produto/produtoImagem', (req,res) =>
{
    (async() =>
    {
      try
      {
        //return res.sendFile(__dirname + '/uploads/images/produtos/' + req.body.imagemName);
        return res.sendFile(path.join(__dirname, '/uploads/images/produtos/', req.body.imagemName));
      }
      catch (error)
      {
        console.log(error);
        return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
      }
    })(); 
});



app.post('/api/admin/produto/criarProduto', verifyJWT, uploadProduto.single("file"), (req,res) =>
{/* 
  (async() =>
  {

  sharp(path.join(__dirname, '/uploads/images/produtos/', req.file.filename))
  .resize(200, 200)
  .toFile(path.join(__dirname, '/uploads/images/produtos/', 'cut' + req.file.filename), (err) =>
  {

    if (err)
    {
      console.log(err);
    }
    else
    {
      console.log("Imagem redimensionada com sucesso!");
  

      fs.unlink(path.join(__dirname, '/uploads/images/produtos/', req.file.filename), (err) => {
        if (err) {
          console.error(err)
          return
        }

        //file removed
      })
    }
  });
  })(); 
 */

  //"sharp": "^0.30.4"


  (async() =>
  {
    console.log(req.body);
    
    let reqProduto = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      precoUnidade: req.body.precoUnidade,
      preco100ml: req.body.preco100ml,
      preco210ml: req.body.preco210ml,
      preco400ml: req.body.preco400ml,
      tipo: req.body.tipo,
      categoria: req.body.categoria,
      quantidadeDisponivel: req.body.quantidadeDisponivel,
      ingredientes: req.body.ingredientes,
      imagem: req.file.filename
    }
  
    try
    {
      const produto = await Produto.create(reqProduto);
      return res.json({auth: true, imagemName:produto.imagem, info: "✅ Produto criado com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  }
  )();
});


app.put('/api/admin/produto', verifyJWT, (req, res) =>
{
  console.log(req.body);

  (async() =>
  {
    try
    {
      const produto = await Produto.update(
      {
        precoUnidade: req.body.precoUnidade,
        preco100ml: req.body.preco100ml,
        preco210ml: req.body.preco210ml,
        preco400ml: req.body.preco400ml,
        quantidadeDisponivel: req.body.quantidadeDisponivel,
      },
      {
        where: {
          id: req.body.id
        }
      });
      return res.json({produto: produto, auth: true, info: "✅ Atendente criado com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});


app.delete('/api/admin/produto', verifyJWT, (req, res) =>
{
  console.log(req.body);

  (async() =>
  {
    try
    {
      const produto = await Produto.destroy({where: {id: req.body.id}});
      return res.json({ auth: true, info: "✅ Produto excluido com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
});




//== ROTAS DE ATENDENTE ==//


app.post('/api/admin/criarAtendente', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      let tempAtendente = req.body;
    
      let encrypted = CryptoJS.AES.encrypt(req.body.senha, "secrete_key").toString()
      var encoded = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);

      tempAtendente.senha = encoded;

      const atendente = Atendente.create(tempAtendente);
      return res.json({auth: true, info: "✅ Atendente criado com sucesso!"});
 
      
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    }
  })();  
}); 



//== ROTAS DE PEDIDO ==//

app.post('/api/admin/pedido/realizarPedido', (req, res) =>
{
  (async() =>
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    console.log(possible.length);

    for (var i = 0; i < 4; i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    try
    {
      console.log(req.body.pedido);
      let varPedido = {
        observacao: req.body.observacaoPedido,
        opcaoDeEntrega: req.body.opcaoDeEntrega,
        status: "Aberta",
        clienteFixo: "Não",
        tipoPagamento: req.body.tipoPagamento,
        valorTotal: req.body.totalPedido,
        valorDesconto: 0,
        valorFinal: 0,
        codigo:text
      }

      
      let pedidoCriado = await Pedido.create(varPedido);

      
      for (let i = 0; i < req.body.pedido.length; i++)
      {
        let produto = await Produto.findOne({where: {id: req.body.pedido[i].id}}); 

        let item = {
          nome: req.body.pedido[i].nome,
          observacao: req.body.pedido[i].observacao,
          quantidade: req.body.pedido[i].quantidade,
          variacao: req.body.pedido[i].variacao,
          total: req.body.pedido[i].total,
        }
        console.log(produto.quantidadeDisponivel);
        console.log(req.body.pedido[i].quantidade);
        produto.quantidadeDisponivel = produto.quantidadeDisponivel - req.body.pedido[i].quantidade;
        await produto.save();

        console.log(produto.quantidadeDisponivel);

        let itemzin = await ItemPedido.create(item);
        itemzin.setProduto(produto);
        itemzin.setPedido(pedidoCriado);
      }


      var tempPedido = await Pedido.findOne({where: {id: pedidoCriado.id}, raw: true});
      var tempItem = await ItemPedido.findAll({where: {PedidoId: tempPedido.id},include: [{model: Produto}], raw: true});


      let pedidoFeito =
      {
        pedido: tempPedido,
        itens : tempItem
      }

      return res.json({pedidoFeito:pedidoFeito, auth: false, info: "✅ Pedido feito com sucesso!"});
      
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    }
  })();  
}); 



app.get('/api/admin/pedidosAbertos', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      var arraypedidoEmAberto = [];
      var tempPedidos = await Pedido.findAll({where: {status: "Aberta"}});

      for (let i = 0; i < tempPedidos.length; i++)
      {
        var tempPedido = tempPedidos[i];
        var tempItem = await ItemPedido.findAll({where: {PedidoId: tempPedido.id}, include: Produto});


        let pedidoEmAberto =
        {
          pedido: tempPedido,
          itens : tempItem
        }

        arraypedidoEmAberto.push(pedidoEmAberto);
      }

      return res.json({arraypedidoEmAberto:arraypedidoEmAberto, auth: false, info: "✅ Pedido feito com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    } 
  })();  
}); 


app.post('/api/admin/pedido/finalizarPedido', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      var pedido = await Pedido.findOne({where: {codigo: req.body.codigo}});

      pedido.status = req.body.status;

      if(req.body.status === "Cancelado")
      {
        for(let i = 0; i < req.body.pedido.length; i++)
        {
          let produto = await Produto.findOne({where: {id: req.body.pedido[i].ProdutoId}});
          produto.quantidadeDisponivel = produto.quantidadeDisponivel + req.body.pedido[i].quantidade;
          await produto.save();
        }
      }

      await pedido.save();

      return res.json({ auth: false, info: "✅ Pedido feito com sucesso!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    } 
  })();  
}); 


//== ROTAS DE LOGIN ==//

/* app.post('/api/admin/logincriar', (req, res) =>
{
  console.log(req.body);

  (async() =>
  {
    try
    {
      const atendente = await Atendente.create(req.body);
      return res.send(atendente);
    }
    catch (error)
    {
      console.log(error);
      return res.send("❗️ Não foi possível entrar no sistema, por favor, tente novamente!");
    }
  })();  
}); */




app.post('/api/admin/login', (req, res) =>
{


  (async() =>
  {
    try
    { 
      

      const atendente = await Atendente.findOne({ where: { nome: req.body.nome, senha: req.body.senha }});

        console.log(atendente);
        
        if(atendente != null)
        {
          const token = jwt.sign({ id: atendente.id }, SECRET, { expiresIn: "1h" });
          return res.json({auth: true, token: token, info: "✅ Login realizado com sucesso!"});
        }
        else
        {
          return res.json({auth: false, token: null, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
        }
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, token: null, info: "❗️ Não foi possível entrar no sistema, por favor, tente novamente!"});
    }
  })();  
});


app.get('/api/admin/verificarAutenticao', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      return res.json({auth: true, info: "✅ Você está logado!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Você não está logado!"});
    }
  })();  
}); 




app.get('/api/admin/logout', verifyJWT, (req, res) =>
{
  (async() =>
  {
    try
    {
      blackListJWT.push(req.headers['authorization']);
      return res.json({auth: false, info: "✅ Você fez o logout!"});
    }
    catch (error)
    {
      console.log(error);
      return res.json({auth: false, info: "❗️ Você não está logado!"});
    }
  })();  
});



//JWT ===============================================================================================================================






function verifyJWT(req, res, next)
{
    /* const token = req.headers['authorization'];

    console.log(token);

    if(!token)
    {
      console.log("AAAAAAAAAA: ", token);
      return res.json({auth: false, token: null, info: "❗️ Você não fez o login!"});
    } 
    
    jwt.verify(token, SECRET, function(err, decoded)
    {
      if(err)
      {
        console.log("BBBBBB: " + err);
        return res.json({auth: false, token: null, info: "❗️ A autenticação falhou!"});
      }
      else
      {
        console.log("TTTTTTT: " + decoded);
        next();
      }
    }); */

    const token = req.headers['authorization'];
    const index = blackListJWT.indexOf(item => item === token);

    if(index != -1)
    {
      return res.json({auth: false, token: null, info: "❗️ Faça o login novamente!"});
    }

    if(!token)
    {
      return res.json({auth: false, token: null, info: "❗️ Você não fez o login!"});
    } 
    
    jwt.verify(token, SECRET, function(err, decoded)
    {
      if(err)
      {
        return res.json({auth: false, token: null, info: "❗️ A autenticação falhou!"});
      }
      else
      {
        console.log("TTTTTTT: " + decoded);
        next();
      }
    });
}















function check(x)
{
  if (x == "")
  {
    return "❗️ O campo está vazio!";
  }
  else if (isNaN(x))
  {
    return "❗️ O campo não é um número!";
  }
  else if (x>70)
  {
    return "❗️ O campo é muito alto!";
  }
  else if (x<16)
  {
    return "❗️ O campo é muito baixo!";
  }
  else
  {
    return "✅ Tudo certo!";
  }
}




app.post('/api/teste', (req, res) =>
{
  console.log(req.body);

  (async() =>
  {
    try
    {
      res.json({info: check(req.body.numero)});
    }
    catch (error)
    {
      console.log(error);
      return res.json({ info: "❗️ Tudo errado!"});
    }
  })();  
});










































//MAIN ===============================================================================================================================

app.listen(port, () =>
{
  console.log(__dirname)
  console.log('App rodando no ip ' + ip.address() + ' na porta ' + port);
  console.log('*************************************************************************************************************************************************************************************************************************************************************************************************************!');
})