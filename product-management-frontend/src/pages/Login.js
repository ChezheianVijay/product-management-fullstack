import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

export default function Login() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleUsername = (event) => {
        const value = event.target.value;
        setUserName(value);

        if (!value.trim()) {
            setError("Username is required");
        } else {
            setError("");
        }
    }

    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);

        if (!value) {
            setError("Password is required");
        } else if (value.length < 6) {
            setError("Password length must contain minimum 6 letters");
        } else {
            setError("");
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username) return setError("Username is required");
        if (!password) return setError("Password is required");
        if (password.length < 6) return setError("Password length must contain minimum 6 letters");

        try {
            await api.get("/auth/check", {
                auth: {
                    username: username,
                    password: password
                }
            });

            // localStorage.setItem("user", "admin");
            // localStorage.setItem("password", "admin123");

            localStorage.setItem("user", username);
            localStorage.setItem("password", password);

            navigate("/products");
        } catch (err) {
            setError("Invalid username or password");
        }

    }

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow p-4" style={{ width: "400px" }}>

                <div className="text-center mb-4">
                    <h2 className="fw-bold">
                        Product Management
                    </h2>
                    <p className="text-muted mb-2">Login to your account</p>
                    {error && <div className="alert alert-danger py-2">{error}</div>}
                </div>

                <form onSubmit={handleLogin} noValidate>

                    <div className="mb-3">
                        <label className="form-label">
                            UserName <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" placeholder="Enter Username" value={username} onChange={handleUsername} />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Password <span className="text-danger">*</span>
                        </label>
                        <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={handlePassword} />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

            </div>


        </div>
    )
}