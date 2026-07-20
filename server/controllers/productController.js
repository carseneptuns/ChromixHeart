const Product = require("../models/productModel");

// get all
exports.index = async (req, res) => {

    try {

        const [rows] = await Product.getAllProducts();

        res.json({
            success: true,
            data: rows
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// get detail
exports.show = async (req, res) => {

    try {

        const [rows] = await Product.getProductById(req.params.id);

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// create
exports.store = async (req, res) => {

    console.log("========== CREATE PRODUCT ==========");
    console.log("BODY :", req.body);
    console.log("FILE :", req.file);

    try {

        const gambar = req.file ? req.file.filename : "";

        await Product.createProduct({
            ...req.body,
            gambar
        });

        res.json({
            success: true,
            message: "Produk berhasil ditambahkan"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// update
exports.update = async (req, res) => {

    try {

        const gambar = req.file
            ? req.file.filename
            : req.body.gambar;

        await Product.updateProduct(

            req.params.id,

            {
                ...req.body,
                gambar
            }

        );

        res.json({

            success: true,
            message: "Produk berhasil diupdate"

        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// delete
exports.destroy = async (req, res) => {

    try {

        await Product.deleteProduct(req.params.id);

        res.json({

            success: true,
            message: "Produk berhasil dihapus"

        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};