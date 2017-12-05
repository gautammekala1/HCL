var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var toDoRoutes = require('./routes/todo');
var loginRoutes = require('./routes/login');
var jwt    = require('jsonwebtoken');
var cors=require('./cors');

app.get('/',function(req,res){
     res.send('App Running');
 });

const sequelize = new Sequelize('postgres://sqwhvqvr:YeVJuHIUu0OsAMxkrLwdhxJ4FhNJZMK8@baasu.db.elephantsql.com:5432/sqwhvqvr');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(cors.permission)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/authenticate',loginRoutes);
app.use('/api/todo', toDoRoutes);

app.listen(3000, function(req,res){
    console.log('Server is running at port 3000');
});