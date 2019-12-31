const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const connectionUrl = 'mongodb+srv://frocha:kEjc7c5d7rNEveB0@shop-1kekx.mongodb.net/test?retryWrites=true&w=majority';
const optionUrl = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(connectionUrl, optionUrl);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', err => {
  console.log(`Connection error. ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log("Connection has ended.");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoutes = require('./Routes/users');
const productsRoutes = require('./Routes/products');

app.use('/', indexRoute);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.listen(3000);

module.exports = app;
