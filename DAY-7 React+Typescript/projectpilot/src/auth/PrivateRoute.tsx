import { Navigate } from "react-router";
import { useAuth } from './useAuth';
import type { JSX } from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to={"/login"} />;
}