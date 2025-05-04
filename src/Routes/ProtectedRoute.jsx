import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { addToast } from "@heroui/react";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    useEffect(() => {
        if (!isAuthenticated) {
            addToast({
                color: "danger",
                title: "Error",
                description: "Anda harus login terlebih dahulu!",
                duration: 3000,
            });
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;