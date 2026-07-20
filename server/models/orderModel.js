const db = require("../config/db");

const getAllOrders = async () => {

    const sql = `
        SELECT *
        FROM orders
        ORDER BY created_at DESC
    `;

    const [rows] = await db.query(sql);

    return rows;

};

const updateStatus = async (id, status) => {

    const connection = await db.getConnection();

    try{

        await connection.beginTransaction();

        // update orders
        await connection.query(
            "UPDATE orders SET status=? WHERE id=?",
            [status,id]
        );

        // ambil transaksi yang sesuai
        const [order] = await connection.query(
            "SELECT customer_id,total FROM orders WHERE id=?",
            [id]
        );

        if(order.length){

            await connection.query(
                `
                UPDATE tbl_transaksi
                SET status=?
                WHERE user_id=?
                AND total=?
                ORDER BY id DESC
                LIMIT 1
                `,
                [
                    status,
                    order[0].customer_id,
                    order[0].total
                ]
            );

        }

        await connection.commit();

    }catch(err){

        await connection.rollback();
        throw err;

    }finally{

        connection.release();

    }

};

module.exports = {

    getAllOrders,
    updateStatus

};