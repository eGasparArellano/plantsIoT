'use strict';

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
            const irrigationChannel = 'ITESO/IoT/GreenLife/' + plant.plantNumber;
            const jobName = '' + plant.id;
            const rule = '*/' + addedPlant.irrigationPeriod + ' * * * * *';
            req.schedule.scheduleJob(jobName, rule, function(){
                req.mqttClient.publish(
                    irrigationChannel, 
                    '1'
                );

                console.log('Regando a ' + addedPlant.name + ' cada ' + addedPlant.irrigationPeriod + 's');
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
