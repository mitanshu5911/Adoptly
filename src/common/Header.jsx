import React from "react";
import { PawPrint } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Wrapper for protected routes
  const getProtectedLink = (route) => {
    return isAuthenticated ? route : "/login";
  };

  return (
    <header className="h-18 w-full bg-green-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <div
          onClick={() =>
            navigate(isAuthenticated ? "/dashboard" : "/login")
          }
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="text-2xl font-bold tracking-wide">Adoplty</span>
          <PawPrint className="h-7 w-7 text-teal-300" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <NavLink
            to={getProtectedLink("/postpet")}
            className={({ isActive }) =>
              `transition hover:text-teal-400 ${
                isActive&&isAuthenticated ? "text-teal-400 font-semibold border-b-2 border-teal-400" : ""
              }`
            }
          >
            Post
          </NavLink>
          <NavLink
            to={getProtectedLink("/requests")}
            className={({ isActive }) =>
              `transition hover:text-teal-400 ${
                 isActive&&isAuthenticated ? "text-teal-400 font-semibold border-b-2 border-teal-400" : ""
              }`
            }
          >
            Requests
          </NavLink>

          <NavLink
            to={getProtectedLink("/yourPet")}
            className={({ isActive }) =>
              `transition hover:text-teal-400 ${
                 isActive&&isAuthenticated ? "text-teal-400 font-semibold border-b-2 border-teal-400" : ""
              }`
            }
          >
           Your Pets
          </NavLink>

          <NavLink
            to={getProtectedLink("/adoptpet")}
            className={({ isActive }) =>
              `transition hover:text-teal-400 ${
                 isActive&&isAuthenticated ? "text-teal-400 font-semibold border-b-2 border-teal-400" : ""
              }`
            }
          >
            Adopt
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-4">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-transparent border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl bg-transparent border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
