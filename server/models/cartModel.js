const db = require("../config/db");

// ADD TO CART
const addToCart = async (user_id, produk_id, quantity) => {

    console.log("============================");
    console.log("ADD TO CART MODEL");
    console.log({
        user_id,
        produk_id,
        quantity
    });

    const [cart] = await db.query(
        `
        SELECT *
        FROM tbl_cart
        WHERE user_id = ?
        AND produk_id = ?
        `,
        [user_id, produk_id]
    );

    console.log("Data cart ditemukan :", cart);

    if (cart.length > 0) {

        console.log("Produk sudah ada di cart -> UPDATE");

        const [result] = await db.query(
            `
            UPDATE tbl_cart
            SET quantity = quantity + ?
            WHERE id = ?
            `,
            [
                quantity,
                cart[0].id
            ]
        );

        console.log("UPDATE RESULT :", result);

        return;
    }

    console.log("Produk belum ada -> INSERT");

    const [result] = await db.query(
        `
        INSERT INTO tbl_cart
        (
            user_id,
            produk_id,
            quantity
        )
        VALUES
        (?,?,?)
        `,
        [
            user_id,
            produk_id,
            quantity
        ]
    );

    console.log("INSERT RESULT :", result);
    console.log("INSERT ID :", result.insertId);
    console.log("==================================");
};

// GET CART
const getCart = async (user_id) => {

    console.log("GET CART USER :", user_id);

    const [rows] = await db.query(
        `
        SELECT

            tbl_cart.id,
            tbl_cart.quantity,

            tbl_produk.id AS produk_id,
            tbl_produk.nama_produk,
            tbl_produk.harga,
            tbl_produk.gambar,
            tbl_produk.kategori

        FROM tbl_cart

        JOIN tbl_produk
        ON tbl_cart.produk_id = tbl_produk.id

        WHERE tbl_cart.user_id = ?
        `,
        [user_id]
    );

    console.log("ISI CART :", rows);

    return rows;
};

// update quantity

const updateQuantity = async (id, quantity) => {

    console.log("UPDATE QUANTITY");
    console.log({
        id,
        quantity
    });

    const [result] = await db.query(
        `
        UPDATE tbl_cart
        SET quantity = ?
        WHERE id = ?
        `,
        [
            quantity,
            id
        ]
    );

    console.log(result);

};

// delete cart

const deleteCart = async (id) => {

    console.log("DELETE CART :", id);

    const [result] = await db.query(
        `
        DELETE FROM tbl_cart
        WHERE id = ?
        `,
        [id]
    );

    console.log(result);

};

module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    deleteCart
};