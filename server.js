const express = require('express');
const http = require('http');
const Pool = require('pg').Pool;
const bodyParser = require('body-parser');

const pgConfig = require('./src/config/config').pgConfig;
const usersRouter = require('./src/routes/users');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 8080;

const pool = new Pool(pgConfig);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, X-Access-Token, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

app.use('/user', usersRouter);
app.listen(port);

exports.query = (text, values) => pool.query(text, values);

module.exports = app;
