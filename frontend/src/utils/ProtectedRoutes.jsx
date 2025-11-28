import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router";

const ProtectedRoutes = ({children, requiredRole}) => {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!requiredRole.includes(user.role)) {
            navigate('/unauthorized');
            return;
        }
    }, [user, navigate, requiredRole]);

    if (!user) return null;

    if (!requiredRole.includes(user.role)) return null;

    return children;
}

export default ProtectedRoutes;