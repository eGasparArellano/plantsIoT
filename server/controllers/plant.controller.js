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
}

const plantController = new PlantController();
module.exports = plantController;
