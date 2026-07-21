import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        nama_lengkap: "",
        alamat:"",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSignup = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password dan Confirm Password tidak sama!");
            return;
        }

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username: formData.username,
                    nama_lengkap: formData.nama_lengkap,
                    alamat: formData.alamat,
                    password: formData.password
                }
            );

            alert(res.data.message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Register gagal"
            );

        }

    };

    return (

        <div className="auth-page">

            <div className="auth-card">

                <span className="auth-subtitle">
                    JOIN THE COVEN
                </span>

                <h1>
                    Create Account
                </h1>

                <form onSubmit={handleSignup}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="nama_lengkap"
                        placeholder="Full Name"
                        value={formData.nama_lengkap}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="alamat"
                        placeholder="Alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Sign Up
                    </button>

                </form>

                <p>

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Signup;