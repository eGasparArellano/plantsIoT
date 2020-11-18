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

    async addPlant(req, res) {
        try {
            let plant = req.body;
            // Generate random ID
            plant.id = parseInt((Math.random() * 1000000));
            
            // Save
            const docs = await Plant.add(plant);
            const addedPlant = JSON.parse(JSON.stringify(docs));

            // Schedule job
            const irrigationChannel = 'ITESO/iot/greenlife/1/regar';
            req.schedule.scheduleJob('*/' + addedPlant.irrigationPeriod + ' * * * * *', function(){
                req.mqttClient.publish(
                    irrigationChannel, 
                    'Regando a ' + addedPlant.name + ' cada ' + addedPlant.irrigationPeriod + 's'
                );

                console.log('Regando a ' + addedPlant.name + ' cada ' + addedPlant.irrigationPeriod + 's');
            });
            
            res.json(addedPlant);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

const plantController = new PlantController();
module.exports = plantController;
