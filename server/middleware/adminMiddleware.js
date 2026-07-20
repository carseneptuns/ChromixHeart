exports.isAdmin = (req, res, next) => {

    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Akses ditolak"
        });
    }

    next();
};

exports.isCustomer = (req, res, next) => {

    if (!req.session.user || req.session.user.role !== "customer") {
        return res.status(403).json({
            success: false,
            message: "Akses ditolak"
        });
    }

    next();
};