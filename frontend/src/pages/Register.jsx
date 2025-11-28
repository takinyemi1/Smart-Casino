import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from "react-router";
import sclogo from "../assets/blackjack.gif"
import {CountryDropdown} from 'react-country-region-selector';

const Login = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const [selectedValue, setSelectedValue] = useState("default");
    const [country, setCountry] = useState("Not Selected");

    const selectedCountry = (val) => setCountry(val);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "profileImage") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else if (name === "gender") {
            setSelectedValue(value);
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
            console.log(key, formData[key]);
        });

        formDataObj.append('country', country);
        formDataObj.append('gender', selectedValue);

        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', formDataObj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                console.log("Registration successful: ", response.data);
                navigate('/login');
            }

        } catch (error) {
            setError("Registration failed. Please try again.");
            console.error("Registration error: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="p-6" style={{backgroundColor: "#c21919", fontFamily: "JosefinSans", height: "auto"}}>
                <div className="container py-2 h-50" style={{height: "100vh"}}>
                    <div className="row g-0">
                        <div className="card" style={{borderRadius: "1rem", backgroundColor: "#c57c7cff"}}>
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

                                            <h2 className="fw-normal mb-0 me-3" style={{letterSpacing: "2px"}}>New Player? Sign up for a new account</h2>

                                            {/* Error Message */}
                                            {error && <p className="text-red-500">{error}</p>}

                                            {/* Username */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor = "username" className="form-label d-flex">Username</label>
                                                <input type = "username" 
                                                    placeholder = "Enter username" 
                                                    name="username"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required 
                                                />
                                            </div>

                                            {/* First Name */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor = "firstName" className="form-label d-flex">First Name</label>
                                                <input type = "firstName" 
                                                    placeholder = "Enter First Name" 
                                                    name="firstName"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required 
                                                />
                                            </div>

                                            {/* Last Name */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor = "lastName" className="form-label d-flex">Last Name</label>
                                                <input type = "lastName" 
                                                    placeholder = "Enter Last Name" 
                                                    name="lastName"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required 
                                                />
                                            </div>

                                            {/* Gender */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor="gender" className="form-label d-flex">Gender</label>
                                                <select className="bg-gray-200 w-100 p-3 rounded" id="gender" name="gender" value={selectedValue} onChange={handleChange}>
                                                    <option value="default">Not Selected</option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                    <option value="undefined">Undefined</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            {/* Email */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor="email" className="form-label d-flex">Email</label>
                                                <input type="email"
                                                    placeholder="example@email.com"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Age */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor="age" className="form-label d-flex">Age</label>
                                                <input type="date"
                                                    placeholder="Enter Birthday"
                                                    name="age"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Profession */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor="profession" className="form-label d-flex">Profession</label>
                                                <input type="text"
                                                    placeholder="Enter Profession"
                                                    name="profession"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Password Input */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor="password" className="form-label d-flex">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter Password"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required />
                                            </div>

                                            {/* Confirm Password Input */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor="confirmPassword" className="form-label d-flex">Confirm Password</label>
                                                <input type="password"
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Country */}
                                            <div data-bs-input-init className="form-outline mt-4">
                                                <label htmlFor="country" className="form-label d-flex">Country</label>
                                                <CountryDropdown
                                                    className="bg-gray-200 w-100 p-3 rounded"
                                                    value={country}
                                                    onChange={(val) => selectedCountry(val)}
                                                />
                                            </div>

                                            {/* Profile Image */}
                                            <div>
                                                <label htmlFor="profileImage" className="form-label d-flex mt-4">Profile Image</label>
                                                <input type="file"
                                                    name="profileImage"
                                                    style={{ backgroundColor: "white" }}
                                                    placeholder="Upload Image"
                                                    className="mt-1 p-2 block w-full border border-gray-700 hover:bg-gray-300 rounded-md"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="d-flex justify-between mt-4">
                                                <p>I agree to the <a href="https://www.websitepolicies.com/blog/sample-terms-of-use-template" className="small text-muted">Terms and Conditions</a></p>
                                            </div>

                                            {/* Register Button */}
                                            <div className="pt-3 mb-4">
                                                <button data-bs-button-init className="btn text-white" type="submit" style={{ backgroundColor: "#d12020ff", border: "none" }}>
                                                    {loading ? "Loading..." : "Sign Up"}
                                                </button>
                                            </div>

                                            <p className="mb-3 pb-lg-2" style={{ color: "#702626ff" }}>Frequent player? <Link to={'/login'} style={{ color: "#702626ff" }}>Login here</Link></p>
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