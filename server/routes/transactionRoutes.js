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
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});


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
    (req, res, next) => {
        console.log("ROUTE MASUK");
        next();
    },
    (req, res, next) => {
        upload.single("proof_payment")(req, res, function (err) {

            if (err) {
                console.log("MULTER ERROR");
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            next();
        });
    },
    transactionController.confirmPayment
);
router.get(
    "/user/:user_id",
    transactionController.getUserTransactions
);

module.exports = router;