const express = require('express');
const app = express();
const AuthRoute=require('./route/AuthRoute');
const bodyParser = require('body-parser');
const UserRoute = require('./route/UserRoute');
const SertifikatRoute = require('./route/SertifikatRoute');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/sertifikat',SertifikatRoute)


module.exports = app;