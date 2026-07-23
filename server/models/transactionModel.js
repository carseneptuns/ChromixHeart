const db = require("../config/db");

// ==========================================
// BUY NOW
// ==========================================
const createTransaction = async (
    user_id,
    produk_id,
    quantity,
    alamat,
    latitude,
    longitude
) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [product] = await connection.query(
            `
            SELECT *
            FROM tbl_produk
            WHERE id = ?
            `,
            [produk_id]
        );

        if (product.length === 0) {
            throw new Error("Produk tidak ditemukan");
        }

        if (quantity > product[0].stok) {
            throw new Error("Stok tidak mencukupi");
        }

        const total = product[0].harga * quantity;

        const [trx] = await connection.query(
            `
            INSERT INTO tbl_transaksi
            (
                user_id,
                tanggal,
                total,
                status,
                alamat,
                latitude,
                longitude
            )
            VALUES
            (?, NOW(), ?, 'Pending', ?, ?, ?)
            `,
            [
                user_id,
                total,
                alamat,
                latitude,
                longitude
            ]
        );

        const transactionId = trx.insertId;

        await connection.query(
            `
            INSERT INTO detail_transaksi
            (
                transaksi_id,
                produk_id,
                quantity,
                harga,
                subtotal
            )
            VALUES (?,?,?,?,?)
            `,
            [
                transactionId,
                produk_id,
                quantity,
                product[0].harga,
                total
            ]
        );

        await connection.commit();

        return {
            transaction_id: transactionId
        };

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

};
// ==========================================
// CHECKOUT CART
// ==========================================
const checkoutCart = async (user_id, alamat, latitude, longitude) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [cart] = await connection.query(
            `
            SELECT
                c.produk_id,
                c.quantity,
                p.harga,
                p.stok

            FROM tbl_cart c

            JOIN tbl_produk p
            ON c.produk_id = p.id

            WHERE c.user_id = ?
            `,
            [user_id]
        );

        console.log("Cart :", cart);

        if (cart.length === 0) {
            throw new Error("Keranjang kosong");
        }

        let total = 0;

        for (const item of cart) {

            if (item.quantity > item.stok) {
                throw new Error(
                    `Stok produk ${item.produk_id} tidak cukup`
                );
            }

            total += Number(item.harga) * item.quantity;
        }

        const [trx] = await connection.query(
            `
            INSERT INTO tbl_transaksi
            (
                user_id,
                tanggal,
                total,
                status,
                alamat,
                latitude,
                longitude
            )
            VALUES
            (?, NOW(), ?, 'Pending', ?, ?, ?)
            `,
            [
                user_id,
                total,
                alamat,
                latitude,
                longitude
            ]
        );

        console.log("Transaksi dibuat :", trx.insertId);

        const transactionId = trx.insertId;

        for (const item of cart) {

            await connection.query(
                `
                INSERT INTO detail_transaksi
                (
                    transaksi_id,
                    produk_id,
                    quantity,
                    harga,
                    subtotal
                )
                VALUES (?,?,?,?,?)
                `,
                [
                    transactionId,
                    item.produk_id,
                    item.quantity,
                    item.harga,
                    Number(item.harga) * item.quantity
                ]
            );

        }

        await connection.query(
            `
            DELETE FROM tbl_cart
            WHERE user_id = ?
            `,
            [user_id]
        );

        await connection.commit();

        console.log("Commit berhasil");

        return {
            transaction_id: transactionId
        };

    } catch (err) {

        console.log("=================================");
        console.log("CHECKOUT ERROR");
        console.log(err);
        console.log(err.code);
        console.log(err.sqlMessage);
        console.log(err.sql);
        console.log("=================================");

        await connection.rollback();

        throw err;

    } finally {

        connection.release();

    }

};

// ==========================================
// GET TRANSACTION
// ==========================================
const getTransaction = async (id) => {

    const [rows] = await db.query(
        `
        SELECT

            tt.id,
            tt.user_id,
            tt.tanggal,
            tt.total,
            tt.status,
            tt.payment_method,
            tt.alamat,
            tt.latitude,
            tt.longitude,

            dt.produk_id,
            dt.quantity,
            dt.harga,
            dt.subtotal,

            p.nama_produk,
            p.gambar,
            p.kategori

        FROM tbl_transaksi tt

        JOIN detail_transaksi dt
        ON tt.id = dt.transaksi_id

        JOIN tbl_produk p
        ON dt.produk_id = p.id

        WHERE tt.id = ?
        `,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return {

        id: rows[0].id,
        user_id: rows[0].user_id,
        tanggal: rows[0].tanggal,
        total: rows[0].total,
        status: rows[0].status,
        payment_method: rows[0].payment_method,
        alamat: rows[0].alamat,
        latitude: rows[0].latitude,
        longitude: rows[0].longitude,

        items: rows.map(item => ({
            produk_id: item.produk_id,
            nama_produk: item.nama_produk,
            gambar: item.gambar,
            kategori: item.kategori,
            quantity: item.quantity,
            harga: item.harga,
            subtotal: item.subtotal
        }))

    };

};

// ==========================================
// CONFIRM PAYMENT
// ==========================================
const confirmPayment = async (id, payment_method, proof_payment) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Cek transaksi
        const [trx] = await connection.query(
            `
            SELECT
                tt.id,
                tt.user_id,
                tt.total,
                tt.status,
                tt.alamat,
                tt.latitude,
                tt.longitude,
                u.nama_lengkap
            FROM tbl_transaksi tt
            JOIN tbl_login u
            ON tt.user_id = u.id
            WHERE tt.id = ?
            `,
            [id]
        );

        if (trx.length === 0) {
            throw new Error("Transaksi tidak ditemukan");
        }

        if (trx[0].status === "Paid") {
            throw new Error("Transaksi sudah dibayar");
        }

        // Ambil semua item transaksi
        const [items] = await connection.query(
            `
            SELECT
                produk_id,
                quantity
            FROM detail_transaksi
            WHERE transaksi_id = ?
            `,
            [id]
        );

        // Kurangi stok
        for (const item of items) {
            const [product] = await connection.query(
                `
                SELECT stok
                FROM tbl_produk
                WHERE id = ?
                `,
                [item.produk_id]
            );

            if (product.length === 0) {
                throw new Error("Produk tidak ditemukan");
            }

            if (product[0].stok < item.quantity) {
                throw new Error("Stok tidak mencukupi");
            }

            await connection.query(
                `
                UPDATE tbl_produk
                SET stok = stok - ?
                WHERE id = ?
                `,
                [
                    item.quantity,
                    item.produk_id
                ]
            );
        }

        // Update transaksi (Menyimpan payment_method, proof_payment, dan status)
        await connection.query(
            `
           UPDATE tbl_transaksi
           SET
             payment_method = ?,
             proof_payment = ?,
             status = 'Paid'
            WHERE id = ?
            `,
            [
                payment_method,
                proof_payment,
                id
            ]
        );

        // Simpan ke tabel orders (untuk OrderManagement admin)
        await connection.query(
            `
            INSERT INTO orders
            (
                customer_id,
                customer_name,
                payment_method,
                total,
                status,
                alamat,
                latitude,
                longitude,
                proof_payment
            )
            VALUES (?,?,?,?,?,?,?,?,?)
            `,
            [
                trx[0].user_id,
                trx[0].nama_lengkap,
                payment_method,
                trx[0].total,
                "Paid",
                trx[0].alamat,
                trx[0].latitude,
                trx[0].longitude,
                proof_payment
            ]
        );

        await connection.commit();
        return { success: true };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};
const getUserTransactions = async (user_id) => {

    const [rows] = await db.query(

        `
       SELECT
            tt.id,
            tt.tanggal,
            tt.total,
            tt.status,
            tt.payment_method,

            dt.quantity,
            dt.harga,
            dt.subtotal,

            p.nama_produk,
            p.gambar,
            p.kategori

        FROM tbl_transaksi tt

        JOIN detail_transaksi dt
        ON tt.id = dt.transaksi_id

        JOIN tbl_produk p
        ON dt.produk_id = p.id

        WHERE tt.user_id = ?

        ORDER BY tt.id DESC
        `,

        [user_id]

    );

    return rows;

};

const getUserRole = async (user_id) => {

    const [rows] = await db.query(
        `
        SELECT role
        FROM tbl_login
        WHERE id = ?
        `,
        [user_id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0].role;

};

module.exports = {
    createTransaction,
    checkoutCart,
    getTransaction,
    getUserTransactions,
    confirmPayment,
    getUserRole
};