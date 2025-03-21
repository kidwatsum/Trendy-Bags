import { Button, TextField } from "@mui/material";
import "./Register.css";
import logo from "../../assets/trendy-transparent.png";
import { useState } from "react";
import axios from "axios";

export default function Register(){

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleRegistration = async () => {
        try {
            const response = await axios.post("http://localhost:5161/api/auth/register", {
                fullName, 
                username,
                email,
                password,
                role: "user",
            });

            console.log("User registered:", response.data);
            alert("Registration successful!");
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            setError(err.response?.data || "Registration failed");
        }
    };

    return (
        <>
            <div className="register-main">
                <div className="register-window">
                    <img src={logo} alt="logo-image"/>
                    <TextField label="Full name" id="fullname-input" onChange={(e)=>setFullName(e.target.value)}/>
                    <TextField label="username" id="username-input" onChange={(e)=>setUsername(e.target.value)}/>
                    <TextField label="Email" id="email-input" onChange={(e)=>setEmail(e.target.value)} />
                    <TextField label="Password" id="password-input" onChange={(e)=>setPassword(e.target.value)} />
                    <div className="register-div">
                        <h5>Already have an account?</h5>
                        <a href="/login" id="login-btn-link">Login now!</a>
                    </div>
                    <Button className="register-btn" onClick={handleRegistration} >Register</Button>
                </div>
            </div>
        </>
    )
}