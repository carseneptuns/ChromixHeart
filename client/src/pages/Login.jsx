import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import LoginIntro from "../components/LoginIntro";

function Login() {

    const navigate = useNavigate();

    const [showIntro, setShowIntro] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "https://chromixheart-production-6072.up.railway.app/api/auth/login",
                formData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.data)
            );

            // Tampilkan animasi
            setShowIntro(true);

        } catch (error) {

            alert(
                error.response?.data?.message || "Login gagal"
            );

        }

    };
    return (
        <>

            {!showIntro && (

                <div className="auth-page">

                    <div className="auth-card">

                        <span className="auth-subtitle">
                            WELCOME BACK
                        </span>

                        <h1>
                            Enter The Darkness
                        </h1>

                        <form onSubmit={handleLogin}>

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
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

                            <button type="submit">
                                Login
                            </button>

                        </form>

                        <p>
                            Don't have an account?{" "}
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </p>

                    </div>

                </div>

            )}

            {showIntro && (

                <LoginIntro
                    show={showIntro}
                    onFinish={() => {
                        navigate("/");
                    }}
                />

            )}

        </>
    );

}

export default Login;
