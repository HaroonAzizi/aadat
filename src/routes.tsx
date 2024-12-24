// src/routes.tsx

import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/common/Layout/Layout";
import TasksPage from "./pages/Tasks";
import HabitsPage from "./pages/Habits";

// We'll create these components next
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" />;
};
// src/routes.tsx (update the routes part)

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            {/* <Layout> */}
            <Outlet />
            {/* </Layout> */}
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="habits" element={<HabitsPage />} />
        <Route index element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
