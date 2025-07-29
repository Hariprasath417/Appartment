const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');


router.post('/flat', authenticate, authorizeRoles('manager'), managerController.createFlat);
router.get('/flats', authenticate, authorizeRoles('manager'), managerController.getAllFlats);
router.put('/assign/:houseId', authenticate, authorizeRoles('manager', 'Owner'), managerController.assignOwnerTenant);
router.get('/flat/:flatId/houses', authenticate, authorizeRoles('manager'), managerController.getHousesByFlat);
// router.post('/house/:houseId/owner', authenticate, authorizeRoles('manager','owner'), managerController.updateOwner);
// router.post('/house/:houseId/tenant', authenticate, authorizeRoles('manager', 'owner'), managerController.updateTenant);

module.exports = router;