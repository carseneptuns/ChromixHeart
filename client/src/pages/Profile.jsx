import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiShield, FiPackage, FiLogOut, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import "../styles/profile.css";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
            return;
        }

        const userData = JSON.parse(storedUser);
        setUser(userData);

        if (userData.role === "customer" && userData.id) {
            fetchUserOrders(userData.id);
        }
    }, [navigate]);

    const fetchUserOrders = async (userId) => {
        try {
            const res = await axios.get(`https://chromixheart-production-6072.up.railway.app/api/transactions/user/${userId}`);
            const orderList = Array.isArray(res.data) ? res.data : (res.data.data || []);
            const uniqueOrders = Array.from(new Set(orderList.map(item => item.id)));
            setOrderCount(uniqueOrders.length);
        } catch (err) {
            console.error("Gagal mengambil data pesanan:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="profile-container">
            <div className="profile-card">
                
                {/* Tombol Kembali (Diposisikan absolute relatif terhadap profile-card) */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Kembali
                </button>

                {/* Header Profil */}
                <div className="profile-header">
                    <div className="avatar-wrapper">
                        <div className="avatar">
                            {user.nama_lengkap ? user.nama_lengkap.charAt(0).toUpperCase() : "U"}
                        </div>
                    </div>
                    <h2>{user.nama_lengkap || user.username || "User"}</h2>
                    <span className="role-badge">{user.role || "Customer"}</span>
                </div>

                {/* Ringkasan Statistik (Khusus Customer) */}
                {user.role === "customer" && (
                    <div className="profile-stats">
                        <div className="stat-item">
                            <FiPackage className="stat-icon" />
                            <div className="stat-info">
                                <h3>{orderCount}</h3>
                                <p>Total Pesanan</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Detail Informasi Akun */}
                <div className="profile-info">
                    <h3>Informasi Akun</h3>
                    
                    <div className="info-group">
                        <div className="info-icon">
                            <FiUser />
                        </div>
                        <div className="info-text">
                            <label>Nama Lengkap</label>
                            <p>{user.nama_lengkap || "-"}</p>
                        </div>
                    </div>

                    <div className="info-group">
                        <div className="info-icon">
                            <FiMail />
                        </div>
                        <div className="info-text">
                            <label>Username / Email</label>
                            <p>{user.username || user.email || "-"}</p>
                        </div>
                    </div>

                    <div className="info-group">
                        <div className="info-icon">
                            <FiShield />
                        </div>
                        <div className="info-text">
                            <label>Hak Akses / Role</label>
                            <p className="role-text">{user.role || "Customer"}</p>
                        </div>
                    </div>
                </div>

                {/* Navigasi / Aksi */}
                <div className="profile-actions">
                    {user.role === "customer" && (
                        <Link to="/my-orders" className="btn-orders">
                            <FiPackage /> Lihat Pesanan Saya
                        </Link>
                    )}
                    <button onClick={handleLogout} className="btn-logout">
                        <FiLogOut /> Logout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Profile;
