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
router.delete('/tasks', function(req, res){
    var postData  = req.body;
    pool.query('DELETE FROM tasks WHERE ?', postData, function(err, results){
      if (err) throw err;
        console.log('Success"');
        console.log(results);
          res.send(results);
     });  
  });
  router.delete('/patients', function(req, res){
    var postData  = req.body;
    pool.query('DELETE FROM patients WHERE ?', postData, function(err, results){
      if (err) throw err;
        console.log('Success"');
        console.log(results);
          res.send(results);
     });
    });
     router.delete('/appointments', function(req, res){
        var postData  = req.body;
        pool.query('DELETE FROM appointments WHERE ?', postData, function(err, results){
          if (err) throw err;
            console.log('Success"');
            console.log(results);
              res.send(results);
         });
        });
  module.exports = router;