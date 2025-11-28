import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import sclogo from "../assets/sclogo.gif"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', 
                {username, password}
            );
            console.log(response.data);

            if (response.data.success) {
                await login(response.data.user, response.data.token);
                console.log(response.data.user);

                if (response.data.user.role === 'admin') {
                    // navigate('/admin/dashboard');
                    alert("Admin logged in");
                } else {
                    navigate('/players-path/dashboard');
                    // alert("Player")
                }
            } else {
                alert(response.data.error);
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
                console.log(error);
            } else {
                setError("[ERROR] Server error");
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="p-6" style={{backgroundColor: "#c21919", fontFamily: "JosefinSans", height: "auto"}}>
                <div className="container py-2 h-50" style={{height: "100vh"}}>
                    <div className="row g-0">
                        <div className="card" style={{borderRadius: "1rem", backgroundColor: "#f3bbbbff"}}>
                            <div className="d-flex flex-row items-center justify-center">
                                <div className="card-body p-4 text-black align-center items-center text-center">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <div className="d-flex align-items-center justify-content-center items-center">
                                                <img src={sclogo} alt="Smart Casino Logo" className="img-fluid w-100" style={{borderRadius: "40px"}} />
                                            </div>

                                            <div className="d-flex align-items-center justify-center mb-3 pb-1 mt-5">
                                                <a href="/"><i className="bi bi-suit-spade-fill me-3" style={{color: "#c21919"}}></i></a>
                                                <span className="h1 fw-bold mb-0">Smart Casino</span>
                                            </div>

                                            <h2 className="fw-normal mb-0 me-3" style={{letterSpacing: "2px"}}>Frequent Player? Sign into your account</h2>

                                            {/* Error Message */}
                                            {error && <p className="text-white">{error}</p>}

                                            {/* Username */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor = "username" className="form-label d-flex">Username</label>
                                                <input type = "username" 
                                                    placeholder = "Enter username" 
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required 
                                                />
                                            </div>

                                            {/* Password Input */}
                                            <div className="mt-4">
                                                <label htmlFor = "password" className="form-label d-flex">Password</label>
                                                <input 
                                                    type = "password" 
                                                    placeholder = "********" 
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required />
                                            </div>

                                            <div className="d-flex justify-between mt-4">
                                                {/* Privacy Policy */}
                                                <a href="https://www.websitepolicies.com/blog/sample-terms-of-use-template" className="small text-muted"> Terms of Use</a>
                                                <a href="https://termify.io/privacy-policy-generator?msclkid=fef10b8a9aa01c0572c06320d32a1880&utm_source=bing&utm_medium=cpc&utm_campaign=Termify&utm_term=generic%20privacy%20policy&utm_content=Privacy%20Policy" className="small text-muted">Privacy Policy</a>
                                            </div>

                                            <div className="d-flex justify-between">
                                                <a className="small text-muted" href="#">Forgot Password?</a>
                                            </div>

                                            {/* Login Button */}
                                            <div className="pt-3 mb-4">
                                                <button data-bs-button-init className="btn text-white" type="submit" style={{backgroundColor: "#c21919", border: "none"}}>
                                                    {loading ? "Loading..." : "Login"}
                                                </button>
                                                <br /><br />
                                                <p className="mb-3 pb-lg-2" style={{color: "#5c2323ff"}}>New player? <Link to={'/register'} style={{color: "#5c2323ff"}}>Register here</Link></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;