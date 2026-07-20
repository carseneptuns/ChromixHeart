const bcrypt = require("bcrypt");
const Auth = require("../models/authModel");

// login
const login = async (req, res) => {

    try {

        console.log("===== LOGIN =====");
        console.log("Body :", req.body);

        const { username, password } = req.body;

        const [users] = await Auth.getUserByUsername(username);

        console.log("User ditemukan :", users);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Username tidak ditemukan"
            });
        }

        const user = users[0];

        console.log("Password DB :", user.password);

        // cek password
        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password Match :", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password salah"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login berhasil",
            data: {
                id: user.id,
                username: user.username,
                nama_lengkap: user.nama_lengkap,
                role: user.role
            }
        });

    } catch (error) {

        console.log("LOGIN ERROR");
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// register
const register = async (req, res) => {

    try {

        console.log("===== REGISTER =====");
        console.log("Body :", req.body);

        const {
            username,
            password,
            nama_lengkap
        } = req.body;

        const [users] = await Auth.getUserByUsername(username);

        console.log("Cek Username :", users);

        if (users.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Username sudah digunakan"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Password Hash :", hashedPassword);

        const result = await Auth.createUser({
            username,
            password: hashedPassword,
            nama_lengkap,
            role: "customer"
        });

        console.log("INSERT RESULT :", result);

        res.status(201).json({
            success: true,
            message: "Register berhasil"
        });

    } catch (error) {

        console.log("REGISTER ERROR");
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    login,
    register
};