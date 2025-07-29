const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticate, authorizeRoles('owner', 'tenant'), issueController.createIssue);
router.get('/house/:houseId', authenticate, authorizeRoles('manager', 'owner', 'tenant'), issueController.getIssuesByHouse);
router.put('/:issueId/status', authenticate, authorizeRoles('manager'), issueController.updateIssueStatus);


module.exports = router;