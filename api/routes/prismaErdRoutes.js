const express = require('express');
const router = express.Router();
const prismaErdController = require('../controllers/prismaErdController');

router.post('/generate', prismaErdController.generatePrismaErd);

module.exports = router;
