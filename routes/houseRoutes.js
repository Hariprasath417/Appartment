const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/',authenticate, authorizeRoles('manager'), houseController.createHouse);
router.get('/', authenticate, authorizeRoles('manager'), houseController.getAllHouses);
router.get('/:id', authenticate, authorizeRoles('manager'), houseController.getHouseById);

module.exports = router;