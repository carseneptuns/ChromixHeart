const db = require("../config/db");

const getUserByUsername = (username) => {
    return db.query(
        "SELECT * FROM tbl_login WHERE username = ?",
        [username]
    );
};

// Register user baru
const createUser = (data) => {

    return db.query(

        `
        INSERT INTO tbl_login
        (
            username,
            password,
            nama_lengkap,
            alamat,
            role
        )
        VALUES
        (?,?,?,?,?)
        `,

        [
            data.username,
            data.password,
            data.nama_lengkap,
            data.alamat,
            data.role
        ]

    );

};

module.exports = {
    getUserByUsername,
    createUser
};