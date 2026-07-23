const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// TRUST PROXY (Penting untuk Railway/Heroku)
// ======================
app.set("trust proxy", 1);

// ======================
// MIDDLEWARE (Harus di Atas Sebelum Route)
// ======================

app.use(
    cors({
        origin: [
            "http://localhost:5173", 
            "https://chromixheart-production-6072.up.railway.app" // Tambahkan domain jika frontend/backend digabung
            // Masukkan URL frontend production Anda di sini nanti (misal: Vercel/Netlify)
        ],
        credentials: true
    })
);

app.use(express.json());

app.use(
    session({
        secret: "chromixheart_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production", // true jika sudah HTTPS di production
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" // "none" wajib jika frontend & backend beda domain (cross-site)
        }
    })
);

// ======================
// ROUTES
// ======================

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");

// ======================
<<<<<<< HEAD
=======
// MIDDLEWARE
// ======================

app.use(
    cors({
        origin: "https://chromixheart-production.up.railway.app",
        credentials: true
    })
);

// WAJIB sebelum semua route
app.use(express.json());

app.use(
    session({
        secret: "chromixheart_secret",
        resave: false,
        saveUninitialized: false
    })
);

// ======================
>>>>>>> 4a5f90977a817f6e5f3f7fa728a4a673a9bc83bc
// STATIC FOLDER
// ======================

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// ======================
// DEBUG
// ======================

console.log("Server Directory :", __dirname);
console.log("Uploads Folder   :", path.join(__dirname, "uploads"));
console.log("Products Folder  :", path.join(__dirname, "uploads", "products"));

// ======================
// API ROUTES
// ======================

app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/orders", orderRoutes);

// ======================
// TEST
// ======================

app.get("/", (req, res) => {
    res.send("Welcome to ChromixHeart API");
});

app.get("/test", (req, res) => {
    res.send("Server OK");
});

app.get("/test-image", (req, res) => {
    res.sendFile(
        path.join(__dirname, "uploads", "products", "test.jpg")
    );
});

// ======================
// CEK DATABASE
// ======================

app.get("/cekdb", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT *
            FROM tbl_transaksi
            ORDER BY id DESC
            LIMIT 20
        `);

        res.json({
            database: "ecommerce_mini",
            totalData: rows.length,
            data: rows
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// ======================
// START SERVER
// ======================

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
