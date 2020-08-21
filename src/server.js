const express = require('express');
const myDbConnection = require('./db/database');
const app = express();


// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = require('./routes/routes');

app.use('/api/1', router);

module.exports = app;