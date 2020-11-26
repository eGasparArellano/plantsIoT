'use strict';

const axios = require('axios').default;
const Plant = require('../models/plant.model');

class PlantController {
    async getPlants(req, res) {
        let query = {}          // Search by some criteria
        let projection = "";    // Which fields are wanted
        let options = {}        // Page or limit
        
        const docs = await Plant.getPlants(query, projection, options);
        const plants = JSON.parse(JSON.stringify(docs));

        res.json(plants);
    }

    async getPlantById(req, res) {
        let query = {}          // Search by some criteria
        let projection = "";    // Which fields are wanted
        let options = {}        // Page or limit
        
        const id = req.params.id;
        const docs = await Plant.getPlantById(id, projection, options);
        const plant = JSON.parse(JSON.stringify(docs));

        res.json(plant);
    }

    async addPlant(req, res) {
        try {
            let plant = req.body;
            // Generate random ID
            plant.id = parseInt((Math.random() * 1000000));
            
            // Save
            const docs = await Plant.add(plant);
            const addedPlant = JSON.parse(JSON.stringify(docs));

            // Schedule job
            const jobName = '' + plant.id;
            const rule = '*/' + 10 + ' * * * * *'; // 5 seconds
            
            req.schedule.scheduleJob(jobName, rule, async function(){
                // Get information from ThingSpeak
                const tsChannelId = 1233836; // Test id
                const thingSpeakUrl = `https://api.thingspeak.com/channels/${tsChannelId}/fields/${addedPlant.plantNumber}/last.json`;
                const plantInfo = await axios.get(thingSpeakUrl);
                const humidity = parseInt(plantInfo['data']['field' + addedPlant.plantNumber]);

                if (humidity < addedPlant.humidity) {
                    // Send signal to water the plant
                    const irrigationChannel = 'ITESO/IoT/GreenLife/' + addedPlant.plantNumber;
                    req.mqttClient.publish(
                        irrigationChannel, 
                        '1'
                    );
                }
            });
            
            res.json(addedPlant);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    async deletePlant(req, res) {
        try {
            const id = req.params.id;

            // Delete
            const docs = await Plant.delete(id);
            const deletedPlant = JSON.parse(JSON.stringify(docs));
            req.schedule.cancelJob(id);

            res.json(JSON.stringify(deletedPlant));
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    async killAlljobs(req, res) {
        const jobs = req.schedule.scheduledJobs;
        for (let job in jobs) {
            req.schedule.cancelJob(job);
        }
        res.send('All jobs were killed...'); 
    }
}

const plantController = new PlantController();
module.exports = plantController;
