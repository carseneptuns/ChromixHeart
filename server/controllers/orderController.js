const db = require("../config/db");

const getOrders = async (req, res) => {
    try {
        const [orders] = await db.query(`
            SELECT
                id,
                customer_id,
                customer_name,
                payment_method,
                total,
                status,
                alamat,
                proof_payment, -- Pastikan baris ini ada!
                created_at
            FROM orders
            ORDER BY id DESC
        `);

        res.json(orders);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ===============================
// CHANGE STATUS
// ===============================
const changeStatus = async (req, res) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const { id } = req.params;
        const { status } = req.body;

        // ============================
        // Ambil Order
        // ============================
        const [order] = await connection.query(
            `
            SELECT *
            FROM orders
            WHERE id = ?
            `,
            [id]
        );

        if (order.length === 0) {
            throw new Error("Order tidak ditemukan.");
        }

        const currentStatus = order[0].status;

        // ============================
        // Status final
        // ============================
        if (
            currentStatus === "Rejected" ||
            currentStatus === "Completed"
        ) {
            throw new Error("Order sudah selesai.");
        }

        // ============================
        // Validasi Perpindahan Status
        // ============================
        if (
            (currentStatus === "Waiting Verification" || currentStatus === "Pending") &&
            status !== "Paid" &&
            status !== "Rejected"
        ) {
            throw new Error("Status tidak valid.");
        }

        if (
            currentStatus === "Paid" &&
            status !== "Shipped"
        ) {
            throw new Error("Status tidak valid.");
        }

        if (
            currentStatus === "Shipped" &&
            status !== "Completed"
        ) {
            throw new Error("Status tidak valid.");
        }

        // =====================================================
        // 1. PROSES BERDASARKAN STATUS BARU
        // =====================================================

        if (status === "Paid") {
            // Validasi wajib ada bukti pembayaran jika metodenya bukan COD
            if (!order[0].proof_payment && order[0].payment_method !== "Cash On Delivery") {
                throw new Error("Customer belum mengupload bukti pembayaran, tidak bisa di-approve.");
            }

            const [trx] = await connection.query(
                `
                SELECT id
                FROM tbl_transaksi
                WHERE
                    user_id = ?
                    AND total = ?
                    AND alamat = ?
                    AND payment_method = ?
                ORDER BY id DESC
                LIMIT 1
                `,
                [
                    order[0].customer_id,
                    order[0].total,
                    order[0].alamat,
                    order[0].payment_method
                ]
            );

            if (trx.length === 0) {
                throw new Error("Transaksi tidak ditemukan.");
            }

            const transaksiId = trx[0].id;

            const [items] = await connection.query(
                `
                SELECT
                    produk_id,
                    quantity
                FROM detail_transaksi
                WHERE transaksi_id = ?
                `,
                [transaksiId]
            );

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
                    throw new Error("Produk tidak ditemukan.");
                }

                if (product[0].stok < item.quantity) {
                    throw new Error("Stok produk tidak mencukupi.");
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

            // Update status di tbl_transaksi
            await connection.query(
                `
                UPDATE tbl_transaksi
                SET status = 'Paid'
                WHERE id = ?
                `,
                [transaksiId]
            );
        } 
        else if (status === "Rejected" || status === "Shipped" || status === "Completed") {
            // Update status di tbl_transaksi untuk status selain Paid (Rejected, Shipped, Completed)
            await connection.query(
                `
                UPDATE tbl_transaksi
                SET status = ?
                WHERE
                    user_id = ?
                    AND total = ?
                    AND alamat = ?
                    AND payment_method = ?
                ORDER BY id DESC
                LIMIT 1
                `,
                [
                    status,
                    order[0].customer_id,
                    order[0].total,
                    order[0].alamat,
                    order[0].payment_method
                ]
            );
        }

        // =====================================================
        // 2. UPDATE STATUS DI TABEL ORDERS (UTAMA)
        // =====================================================
        await connection.query(
            `
            UPDATE orders
            SET status = ?
            WHERE id = ?
            `,
            [status, id]
        );

        await connection.commit();

        res.json({
            success: true,
            message: "Status berhasil diubah."
        });

    } catch (err) {
        await connection.rollback();
        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    } finally {
        connection.release();
    }
};

module.exports = {
    getOrders,
    changeStatus
};