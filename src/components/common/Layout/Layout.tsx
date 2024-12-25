// src/components/common/Layout/Layout.tsx

import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Button/Button";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/dashboard" className="flex items-center">
                <span className="text-3xl font-bold text-green-600">
                  aadat.net
                </span>
              </Link>
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600 hover:text-xl"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tasks"
                  className="text-gray-700 hover:text-green-600 hover:text-xl"
                >
                  Tasks
                </Link>
                <Link
                  to="/habits"
                  className="text-gray-700 hover:text-green-600 hover:text-xl"
                >
                  Habits
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.email}</span>
              <Button variant="secondary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
