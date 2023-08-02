require('dotenv').config();
require("./models/connection");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var marquesRouter = require('./routes/marques')

const fileUpload = require('express-fileupload');


var app = express();

const fetch = require('node-fetch');
const cors = require('cors');

app.use(fileUpload());
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/marques', marquesRouter)

module.exports = app;
