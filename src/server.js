const express = require('express');

const app = express();


// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = require('./routes/routes');

app.use(function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/1', router);

module.exports = app;
