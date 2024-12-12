const express = require('express');
const app = express();
const AuthRoute=require('./route/AuthRoute');
const bodyParser = require('body-parser');
const UserRoute = require('./route/UserRoute');
const AktifitasRoute = require('./route/AktifitasRoute');
const cors = require('cors');

app.use(cors());
const NodeRoute = require('./route/NodeRoute');
const NotifRoute = require('./route/NotifRoute');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/aktifitas', AktifitasRoute);

app.use('/auth',AuthRoute)
app.use('/node',NodeRoute)
app.use('/notif',NotifRoute)


module.exports = app;