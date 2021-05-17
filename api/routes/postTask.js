var express = require('express');
var router = express.Router();
const mysql = require('mysql');
global.bodyParser = require('body-parser');


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

/* GET home page. */
var pool  = mysql.createPool({
  connectionLimit : 10, // default = 10
  host: 'localhost',
  user: 'root',
  password: 'q*kN!7h9QXQ*gUQ',
  database: 'appointments'
});

pool.getConnection(function(err, connection) {
  if (err) throw err;
  router.post('/:AID', function(req, res, next) {
    var postData  = req.body;
    console.log(postData)
    pool.query('INSERT INTO tasks SET ?', postData, (error, results, fields) => {
         if (error) throw error;
         res.send(JSON.stringify(results));
         console.log("1 record inserted");    
    });
  });
    
    
    });

  
module.exports = router;
