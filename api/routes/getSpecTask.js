
var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
  }))
router.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 100000
  }))
  
router.use(express.json());

var pool  = mysql.createPool({
    connectionLimit : 10, // default = 10
    host: 'localhost',
    user: 'root',
    password: 'q*kN!7h9QXQ*gUQ',
    database: 'appointments'
});

pool.getConnection(function (err, connection) {
  //connection.connect(function(err, results, next) {
    router.get('/:AID', function(req, res, next) {
    var getData  = req.params.AID;
    if (err) throw err;
    pool.query("SELECT * FROM tasks WHERE AID = ?", getData, function (err, results, fields) {
      if (err) throw err;
      console.log(results);
        res.send(results);
      });
    });
  });
  module.exports = router;