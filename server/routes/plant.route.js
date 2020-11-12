'use strict';

const router = require('express').Router();
const PlantController = require('../controllers/plant.controller');

router.route('/')
    .get(PlantController.getPlants)

module.exports = router;
