const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/',authenticate, authorizeRoles('manager'), houseController.createHouse);
router.get('/', authenticate, authorizeRoles('manager','tenant','owner'), houseController.getAllHouses);
router.get('/:id', authenticate, authorizeRoles('manager','tenant','owner'), houseController.getHouseById);

module.exports = router;