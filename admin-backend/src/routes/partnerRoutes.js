const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

// POST /partners - Submit a new partner request
router.post('/', partnerController.createPartnerRequest);

// GET /partners - Get all partner requests
router.get('/', partnerController.getPartnerRequests);

// GET /partners/:id - Get a specific partner by ID
router.get('/:id', partnerController.getPartnerById);

module.exports = router;
