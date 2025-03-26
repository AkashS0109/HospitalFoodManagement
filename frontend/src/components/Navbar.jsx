import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "./UI/AccountMenu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-800 shadow-md z-50 px-4 lg:px-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo for Desktop & Mobile */}
        <div className="text-red-600 font-bold xl:text-4xl text-3xl lg:block">
          <h1>Medi<span className="text-white">Bite</span></h1>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex justify-center items-center space-x-8 text-white font-bold">
          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/patients" className="hover:bg-blue-600 px-4 py-2 rounded-md">
                  Patient Details
                </Link>
              </li>
              <li>
                <Link to="/innerpantry" className="hover:bg-blue-600 px-4 py-2 rounded-md">
                  Inner Pantry
                </Link>
              </li>
              <li>
                <Link to="/members" className="hover:bg-blue-600 px-4 py-2 rounded-md">
                  Add Members
                </Link>
              </li>
            </>
          )}
          <li>
            <AccountMenu />
          </li>
        </ul>

        {/* Mobile Menu Toggle Button on Right */}
        <div className="lg:hidden">
          <button
            type="button"
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-blue-800 text-white shadow-lg flex flex-col py-6 space-y-4 lg:hidden">
          {/* Mobile Logo Positioned on Left */}
          <div className="px-6 flex justify-between items-center w-full">
            <h1 className="text-red-600 font-bold text-3xl">Medi<span className="text-white">Bite</span></h1>
            <button
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={toggleMobileMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4 mt-4">
            {user?.role === "admin" && (
              <>
                <Link to="/patients" className="hover:bg-indigo-700 px-6 py-2 rounded-md w-3/4 text-center" onClick={toggleMobileMenu}>
                  Patient Details
                </Link>
                <Link to="/innerpantry" className="hover:bg-indigo-700 px-6 py-2 rounded-md w-3/4 text-center" onClick={toggleMobileMenu}>
                  Inner Pantry
                </Link>
                <Link to="/members" className="hover:bg-indigo-700 px-6 py-2 rounded-md w-3/4 text-center" onClick={toggleMobileMenu}>
                  Add Members
                </Link>
              </>
            )}
            <Link to="/admin" className="hover:bg-indigo-700 px-6 py-2 rounded-md w-3/4 text-center" onClick={toggleMobileMenu}>
              Dashboard
            </Link>
            <Link to="/updateprofile" className="hover:bg-indigo-700 px-6 py-2 rounded-md w-3/4 text-center" onClick={toggleMobileMenu}>
              Profile
            </Link>
            <Link to="/" className="hover:bg-indigo-700 px-6 py-2 rounded-md w-3/4 text-center" onClick={toggleMobileMenu}>
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
