
var express = require('express');
var router = express.Router();
const mysql = require('mysql');



var pool  = mysql.createPool({
    connectionLimit : 10, // default = 10
    host: 'localhost',
    user: 'root',
    password: 'q*kN!7h9QXQ*gUQ',
    database: 'appointments'
});

pool.getConnection(function (err, connection) {
  //connection.connect(function(err, results, next) {
    router.get('/', function(req, res, next) {
    if (err) throw err;
    pool.query("SELECT * FROM appointments", function (err, results, fields) {
      if (err) throw err;
      console.log(results);
        res.send(results);
        
      });
    });
  });

module.exports = router;