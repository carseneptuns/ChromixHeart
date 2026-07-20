const transactionModel = require("../models/transactionModel");

// buy now
const createTransaction = async (req, res) => {

    try {

        const {
            user_id,
            produk_id,
            quantity
        } = req.body;

        if (!user_id || !produk_id || !quantity) {

            return res.status(400).json({

                success: false,
                message: "Data tidak lengkap"

            });

        }

        const result = await transactionModel.createTransaction(
            user_id,
            produk_id,
            quantity
        );

        res.status(201).json({

            success: true,
            message: "Checkout berhasil",
            transaction_id: result.transaction_id

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// CART CHECKOUT
const checkout = async (req, res) => {

    console.log("=== checkout===");
    console.log(req.body);
    try {

        const { user_id } = req.body;

        if (!user_id) {

            return res.status(400).json({

                success: false,
                message: "User tidak ditemukan"

            });

        }

        const result = await transactionModel.checkoutCart(
            user_id
        );

        res.json({

            success: true,
            transaction_id: result.transaction_id

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// GET TRANSACTION
const getTransaction = async (req, res) => {

    try {

        const transaction = await transactionModel.getTransaction(
            req.params.id
        );

        res.json({

            success: true,
            data: transaction

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// CONFIRM PAYMENT
const confirmPayment = async (req, res) => {

    try {

        const { payment_method } = req.body;

        await transactionModel.confirmPayment(
            req.params.id,
            payment_method
        );

        res.json({

            success: true,
            message: "Pembayaran berhasil"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

const getUserTransactions = async (req, res) => {

    try {

        const data =
            await transactionModel.getUserTransactions(
                req.params.user_id
            );

        res.json({

            success: true,
            data

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

module.exports = {

    createTransaction,
    checkout,
    getTransaction,
    getUserTransactions,
    confirmPayment

};