const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post(
    "/checkout",
    transactionController.checkout
);

router.post(
    "/",
    transactionController.createTransaction
);

router.get(
    "/:id",
    transactionController.getTransaction
);

router.put(
    "/:id/payment",
    transactionController.confirmPayment
);

router.get(
    "/user/:user_id",
    transactionController.getUserTransactions
);

module.exports = router;