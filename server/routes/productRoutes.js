const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const upload = require("../middleware/uploadProduct");

// GET
router.get("/", productController.index);

// DETAIL
router.get("/:id", productController.show);

// CREATE
router.post(
    "/",
    upload.single("gambar"),
    productController.store
);

// UPDATE
router.put(
    "/:id",
    upload.single("gambar"),
    productController.update
);

// DELETE
router.delete(
    "/:id",
    productController.destroy
);

module.exports = router;