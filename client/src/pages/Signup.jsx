import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import "../styles/login.css";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        nama_lengkap: "",
        alamat: "",
        password: "",
        confirmPassword: ""
    });
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        const updatedForm = {
            ...formData,
            [name]: value
        };

        setFormData(updatedForm);

        // Validasi realtime
        if (
            name === "password" ||
            name === "confirmPassword"
        ) {

            if (
                updatedForm.confirmPassword &&
                updatedForm.password !== updatedForm.confirmPassword
            ) {

                setPasswordError("Password dan Confirm Password tidak sama");

            } else {

                setPasswordError("");

            }

        }

    };

    const handleSignup = async (e) => {

        e.preventDefault();

        if (passwordError) {
            return;
        }

        if (formData.password !== formData.confirmPassword) {

            setPasswordError("Password dan Confirm Password tidak sama");
            return;

        }

        try {

            const res = await axios.post(
                "https://chromixheart-copy-production.up.railway.app/api/auth/register",
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

                    {passwordError && (
                        <p className="password-error">
                            {passwordError}
                        </p>
                    )}
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

                    <div className="password-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    <div className="password-group">

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>

                    </div>

                    {passwordError && (
                        <p className="password-error">
                            {passwordError}
                        </p>
                    )}

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
