require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const CollabServer = require('collab-react-components').Server;
const CollabCollection = require('collab-react-components').Collection;
mongoose.set('useFindAndModify', false);

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const indexRouter = require('./routes/index');

const app = express();

const options = {
	db: {
		type: 'mongo',
		url
	}
};

CollabServer.start(app, options);
app.use(express.json({limit: '50mb'}));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/', indexRouter);

// Create the collection that will hold the shared data.
const documents = new CollabCollection('documents');

// Create the shared form data
documents.createRichText('rich-editor1', 'My initial data');

module.exports = app;
