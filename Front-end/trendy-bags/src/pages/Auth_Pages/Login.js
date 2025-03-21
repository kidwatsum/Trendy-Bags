import { Button, TextField } from "@mui/material";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/trendy-transparent.png";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5161/api/auth/login", {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            console.log(decoded);

            if (decoded.role === 'admin') {
                navigate("/admin");
            } else {
                navigate("/");
            }

            alert("Logged in successfully!");

        } catch (error) {
            console.error("Error logging in", error);
            alert("Invalid credentials!");
        }
    };

    return (
        <>
            <div className="login-main">
                <div className="login-window">
                    <img src={logo} alt="logo-image" />
                    <TextField 
                        label="Username" 
                        id="email-input" 
                        onChange={(e) => setUsername(e.target.value)} 
                        variant="outlined" 
                        fullWidth
                    />
                    <TextField 
                        label="Password" 
                        id="password-input" 
                        onChange={(e) => setPassword(e.target.value)} 
                        variant="outlined" 
                        type="password"
                        fullWidth 
                    />
                    <div className="register-div">
                        <h5>Don't have an account?</h5>
                        <Link to="/register" id="register-btn-link">Register now!</Link>
                    </div>
                    <Button 
                        className="login-btn" 
                        onClick={handleLogin}
                        variant="contained"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </>
    );
}
