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
// Routers
// =================================
const plantRouter = require('./routes/plant.route');

// =================================
// Middlewares
// =================================
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/dist/plantsIoT/'));

app.use('/api/plants', plantRouter);

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
