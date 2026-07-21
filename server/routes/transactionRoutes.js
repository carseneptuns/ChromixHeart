const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const transactionController = require("../controllers/transactionController");

// Konfigurasi Multer untuk menyimpan bukti pembayaran
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Pastikan folder 'uploads' sudah ada di root server Anda
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

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

// Pasang middleware upload.single("proof_payment") di sini
router.put(
    "/:id/pay",
    upload.single("proof_payment"),
    transactionController.confirmPayment
);

router.get(
    "/user/:user_id",
    transactionController.getUserTransactions
);

module.exports = router;