const express = require('express');
const router = express.Router();
const { getOrders, changeStatus } = require('../controllers/orderController');

router.get('/', getOrders);
router.put('/:id/status', changeStatus); // atau router.patch('/:id/status', changeStatus);

module.exports = router;