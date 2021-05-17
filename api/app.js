require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const utils = require('./utils');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var postRouter = require("./routes/post");
var postApptRouter = require("./routes/postAppt");
var getApptRouter = require("./routes/getAppt");
var deleteTaskRouter = require("./routes/deleteTask");

var getSpecUserRouter = require("./routes/getSpecUser");
var getSpecApptRouter = require("./routes/getSpecAppt");
var getSpecTaskRouter = require("./routes/getSpecTask");

var postTaskRouter = require("./routes/postTask");
var updatePatientRouter = require("./routes/updatePatient");
var updateAppointmentRouter = require("./routes/updateAppointment");
var updateTaskRouter = require("./routes/updateTask");

var AuthRouter = require("./Auth");

const { send } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/post", postRouter);
app.use('/postAppt', postApptRouter);
app.use('/getAppt', getApptRouter);

app.use('/getSpecUser', getSpecUserRouter);
app.use('/getSpecAppt', getSpecApptRouter);
app.use('/getSpecTask', getSpecTaskRouter);
app.use('/deleteTask', deleteTaskRouter);

app.use('/postTask', postTaskRouter);
app.use('/updatePatient', updatePatientRouter);
app.use('/updateAppointment', updateAppointmentRouter);
app.use('/updateTask', updateTaskRouter);

app.use('/Auth', AuthRouter);


var router = express.Router();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
