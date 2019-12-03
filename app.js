require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/', indexRouter);

module.exports = app;
