// Require Statements
const path = require('path');
const http = require('http');
const fs = require('fs');
//const uuid = require('uuid');
//const myUUID = uuid.v4();
var cors = require('cors');
const Handlebars = require("handlebars");

// Express Setup
const express = require('express');
const app = express()
app.listen(8081)

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Route for Home ('/')
app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('index.html', options)
})