const express = require("express");

const router = express.Router();

const {

    getOrders,

    changeStatus

} = require("../controllers/orderController");

router.get("/", getOrders);

router.put("/:id", changeStatus);

module.exports = router;