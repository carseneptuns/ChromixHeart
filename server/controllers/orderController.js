const Order = require("../models/orderModel");

// =========================
// GET ALL ORDERS
// =========================
const getOrders = async (req, res) => {

    try {

        const result = await Order.getAllOrders();

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// =========================
// UPDATE STATUS
// =========================
const changeStatus = async (req, res) => {

    console.log(req.body);

    try {

        const { id } = req.params;
        const { status } = req.body;

        await Order.updateStatus(id, status);

        res.json({
            message: "Status Updated"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};
module.exports = {
    getOrders,
    changeStatus
};