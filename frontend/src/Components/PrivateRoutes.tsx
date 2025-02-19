import React, { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../Redux/store";

interface PrivateRouteProps {
    children: JSX.Element; // Define the type of children prop
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { token } = useSelector((state: RootState) => state.auth); // Type the state

    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;