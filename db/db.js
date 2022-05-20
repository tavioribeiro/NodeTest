const Sequelize = require('sequelize');
var ip = require('ip');


/* const sequelize = new Sequelize('tJYxYSEq2i', 'tJYxYSEq2i', 'gu3Dvm6lIj', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  port: '3306',
});

 */
//get 3 first char of ip
var ip_3 = ip.address().substr(0,10);




if(ip.address() === '192.168.212.157')
{
  console.log("potter");
  var sequelize = new Sequelize('laffe', 'tavio', 'qwert', {
    host: ip.address(),
    dialect: 'mariadb',
    port: '3306',
  });
}
else
{
  console.log("remote");
  var sequelize = new Sequelize('tJYxYSEq2i', 'tJYxYSEq2i', 'gu3Dvm6lIj', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    port: '3306',
  });
}

module.exports = sequelize;


/* Created!
You have successfully created a new database. The details are below.

Username: tJYxYSEq2i

Database name: tJYxYSEq2i

Password: gu3Dvm6lIj

Server: remotemysql.com

Port: 3306 */