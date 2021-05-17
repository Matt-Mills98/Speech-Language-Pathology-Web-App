
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
    pool.query("SELECT * FROM appointments WHERE AID = ?", getData, function (err, results, fields) {
      if (err) throw err;
      console.log(results);
        res.send(results);
      });
    });
  });

/*
pool.getConnection(function(err, results, next) {
  if (err) throw err;
  console.log("Connected!");
  router.post('', function(req, res, next) {
  var PID = req.body.PID;
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var DOB = req.body.DOB;
    pool.query("INSERT INTO patients (PID, FirstName, LastName, DOB) VALUES ('?','?', '?', '?','?')"),[PID,FirstName,LastName,DOB];
    if (err) throw err;
    connection.release();
    console.log("1 record inserted");
    
    });
  });
  
*/


module.exports = router;