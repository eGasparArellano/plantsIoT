'use strict';

const router = require('express').Router();
const PlantController = require('../controllers/plant.controller');

router.route('/')
    .get(PlantController.getPlants)
    .post(PlantController.addPlant)
    .delete(PlantController.killAlljobs)

router.route("/:id")
    .get(PlantController.getPlantById)
    .delete(PlantController.deletePlant)

module.exports = router;
