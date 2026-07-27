const transactionModel = require("../models/transactionModel");

// ==========================================
// BUY NOW
// ==========================================
const createTransaction = async (req, res) => {

    try {

        const {
            user_id,
            produk_id,
            quantity,
            alamat
        } = req.body;

        if (!user_id || !produk_id || !quantity) {

            return res.status(400).json({
                success: false,
                message: "Data tidak lengkap"
            });

        }

        const role = await transactionModel.getUserRole(user_id);

        if (!role) {

            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });

        }

        if (role === "admin") {

            return res.status(403).json({
                success: false,
                message: "Admin tidak diperbolehkan melakukan pembelian"
            });

        }

        const result = await transactionModel.createTransaction(
            user_id,
            produk_id,
            quantity,
            alamat
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

// ==========================================
// CHECKOUT CART
// ==========================================
const checkout = async (req, res) => {

    try {

        const {
            user_id,
            alamat
        } = req.body;

        if (!user_id) {

            return res.status(400).json({
                success: false,
                message: "User tidak ditemukan"
            });

        }

        const role = await transactionModel.getUserRole(user_id);

        if (!role) {

            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });

        }

        if (role === "admin") {

            return res.status(403).json({
                success: false,
                message: "Admin tidak diperbolehkan melakukan checkout"
            });

        }

        const result = await transactionModel.checkoutCart(
            user_id,
            alamat
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

// ==========================================
// GET TRANSACTION
// ==========================================
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

// ==========================================
// CONFIRM PAYMENT
// ==========================================
const confirmPayment = async (req, res) => {

    try {

        const { payment_method } = req.body;
        
        // Ambil nama file dari multer jika ada yang di-upload
        const proof_payment = req.file ? req.file.filename : null;

        if (!payment_method) {

            return res.status(400).json({
                success: false,
                message: "Metode pembayaran harus dipilih"
            });

        }

        await transactionModel.confirmPayment(
            req.params.id,
            payment_method,
            proof_payment // <-- Masukkan variabel file di sini
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

// ==========================================
// GET USER TRANSACTIONS
// ==========================================
const getUserTransactions = async (req, res) => {

    try {

        const data = await transactionModel.getUserTransactions(
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
    confirmPayment,
    getUserTransactions

};