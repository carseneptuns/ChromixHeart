const Profile = require("../models/profileModel");

// GET
const getProfile = async (req, res) => {

    try {

        const data = await Profile.getProfile(
            req.params.id
        );

        res.json({
            success: true,
            data
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// UPDATE
const updateProfile = async (req, res) => {

    try {

        const { alamat } = req.body;

        await Profile.updateProfile(
            req.params.id,
            alamat
        );

        res.json({
            success: true,
            message: "Profile Updated"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    getProfile,
    updateProfile
};