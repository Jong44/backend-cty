const express = require('express');
const app = express();
const AuthRoute=require('./route/AuthRoute');
const bodyParser = require('body-parser');
const UserRoute = require('./route/UserRoute');
const AktifitasRoute = require('./route/AktifitasRoute');
const NodeRoute = require('./route/NodeRoute');
const NotifRoute = require('./route/NotifRoute');
const SertifikatRoute = require('./route/SertifikatRoute');

const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/aktifitas', AktifitasRoute);
app.use('/node',NodeRoute)
app.use('/notif',NotifRoute)
app.use('/sertifikat',SertifikatRoute)


module.exports = app;