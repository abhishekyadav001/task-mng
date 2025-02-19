import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";

const Login = lazy(() => import("../Pages/Login"));
const Signup = lazy(() => import("../Pages/Signup")); // Fixed typo
const Task = lazy(() => import("../Pages/Task"));
const PrivateRoute = lazy(() => import("../Components/PrivateRoutes"));

const MainRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}> {/* Display a loading indicator */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <PrivateRoute>
                            <Task />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={
                    <NotFound />
                } />
            </Routes>
        </Suspense>
    );
};

export default MainRoutes;
