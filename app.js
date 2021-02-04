require('dotenv').config();
const express = require('express');
var path = require('path');
var mongo=require('./mongodbconnection');
bodyParser = require('body-parser');
cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
mongo.connectDatabase()
let refreshtokens = [];
var User=require('./routes/User')
var Post=require('./routes/Post')
app.use('/User',User)
app.use('/Post',Post)
module.exports=app
