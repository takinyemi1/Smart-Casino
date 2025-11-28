import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

const Root = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            // check if user is authenticated and redirect afterwards
            if (user.role === "admin") {
                // navigate('/admin/dashboard');
                alert("Admin")
            } else if (user.role === "player") {
                navigate('/players-path/dashboard');
                // alert("Player")
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    return null;
}

export default Root;