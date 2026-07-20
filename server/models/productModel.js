const db = require("../config/db");

// mengambil semua produk
const getAllProducts = () => {
    return db.query("SELECT * FROM tbl_produk ORDER BY id DESC");
};

// mengambil produk berdasarkan id
const getProductById = (id) => {
    return db.query(
        "SELECT * FROM tbl_produk WHERE id = ?",
        [id]
    );
};

// menambah produk
const createProduct = (data) => {
    return db.query(
        `INSERT INTO tbl_produk
        (kode_produk,nama_produk,kategori,harga,stok,gambar,deskripsi)
        VALUES (?,?,?,?,?,?,?)`,
        [
            data.kode_produk,
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok,
            data.gambar,
            data.deskripsi
        ]
    );
};

// mengupdate produk
const updateProduct = (id, data) => {
    return db.query(
        `UPDATE tbl_produk SET
        kode_produk=?,
        nama_produk=?,
        kategori=?,
        harga=?,
        stok=?,
        gambar=?,
        deskripsi=?
        WHERE id=?`,
        [
            data.kode_produk,
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok,
            data.gambar,
            data.deskripsi,
            id
        ]
    );
};

// menhapus produk
const deleteProduct = (id) => {
    return db.query(
        "DELETE FROM tbl_produk WHERE id=?",
        [id]
    );
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};