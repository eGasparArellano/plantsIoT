'use strict';

// =================================
// Imports
// =================================
const express = require('express');
const cors = require ('cors');
const path = require ('path');
const config = require('./config/config');

const app = express();
const port = config.port;

// =================================
// Middlewares
// =================================
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/dist/plantsIoT/'));

// =================================
// Serve root route
// =================================
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/plantsIoT/index.html'));
});

// =================================
// =================================
app.listen(port, () => console.log("http://localhost:" + port));

module.exports = app;
