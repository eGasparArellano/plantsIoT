'use strict';

const router = require('express').Router();
const PlantController = require('../controllers/plant.controller');

router.route('/')
    .get(PlantController.getPlants)
    .post(PlantController.addPlant)

module.exports = router;