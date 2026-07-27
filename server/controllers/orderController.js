const db = require("../config/db");

// Ambil semua data order untuk halaman Order Management Admin
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
                proof_payment,
                created_at
            FROM orders
            ORDER BY id DESC
        `);
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Ubah status order (Approve, Reject, Ship, Complete)
const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db.query(
            `UPDATE orders SET status = ? WHERE id = ?`,
            [status, id]
        );

        res.json({ success: true, message: "Status order berhasil diubah" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    getOrders,
    changeStatus
};