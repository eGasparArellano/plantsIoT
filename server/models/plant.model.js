'use strict';

const mongoose = require('../db/mongodb-connection')
const DataBaseWrapper = require('../db/DataBaseWrapper');

class Plant extends DataBaseWrapper {
    //_schema;

    constructor() {
        super();
        
        this._schema = new mongoose.Schema({
            id: {
                type: Number,
                required: true,
                unique: true
            },
            quantity: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            irrigationPeriod: {
                type: Number,
                required: true
            },
            plantNumber: {
                type: Number,
                required: true
            }
        });
        
        this._model = mongoose.model('plants', this._schema);
    }
    
    async add(document) {
        return await super.add(document);
    }

    async getPlantById(id, projection = "", options = {}) {
        const plantId = { id };
        return await super.queryOne(plantId, projection, options);
    }

    async getPlants(query = {}, projection = "", options = {}) {
        return await super.query(query, projection, options);
    }

    async update(query, data) {
        return await super.update(query, data);
    }
}
const plant = new Plant();
// let info = {
//     id: 1,
//     quantity: 10,
//     name: 'Suculentas',
//     description: 'Plantas chiquitas',
//     irrigationPeriod: 3,
//     plantNumber:1
// };

// plant.add(info).then((value) => console.log(value));
// plant.getPlants().then((value) => console.log(value));

module.exports = plant;
