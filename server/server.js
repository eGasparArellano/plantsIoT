'use strict';

// =================================
// Imports
// =================================
const express = require('express');
const cors = require ('cors');
const path = require ('path');
const schedule = require('node-schedule');
const config = require('./config/config');
const mqtt = require('mqtt')
const mqttClient  = mqtt.connect('mqtt://broker.hivemq.com')

const app = express();
const port = config.port;

// =================================
// MQTT
// =================================
mqttClient.on('connect', function () {
    console.log('Connected to MQTT');
});

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
// Share scheduler and mqtt with all routes
app.all('*', (req, res, next) => {
    req.schedule = schedule;
    req.mqttClient = mqttClient;
    next();
});

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
