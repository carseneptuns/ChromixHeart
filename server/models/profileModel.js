const db = require("../config/db");

// GET PROFILE
const getProfile = async (id) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            username,
            nama_lengkap,
            alamat
        FROM tbl_login
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];

};

// UPDATE PROFILE
const updateProfile = async (id, alamat) => {

    await db.query(
        `
        UPDATE tbl_login
        SET alamat = ?
        WHERE id = ?
        `,
        [
            alamat,
            id
        ]
    );

};

module.exports = {
    getProfile,
    updateProfile
};