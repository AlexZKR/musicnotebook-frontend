import React, { useState } from "react";
import { NavLink } from "react-router";
import { Logo } from "~/ui/molecules/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type AppNavBarProps = {
  onSignIn?: () => void;
};

export default function AppNavBar({ onSignIn }: AppNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignIn = () => {
    if (onSignIn) return onSignIn();
    alert(
      "To be implemented. You will be able to log in to track your progress."
    );
  };

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
    }`;

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-left px-4 py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
      isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
    }`;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <Logo onClick={closeMenu} />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink to="/roadmap" className={navLinkClassName}>
          Roadmap
        </NavLink>
        <NavLink to="/" end className={navLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/about" className={navLinkClassName}>
          About
        </NavLink>
        <button
          onClick={handleSignIn}
          className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          Sign in
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen((v) => !v)}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 touch-manipulation"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[57px] sm:top-[65px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col p-4 gap-2">
            <NavLink
              to="/roadmap"
              className={mobileLinkClassName}
              onClick={closeMenu}
            >
              Roadmap
            </NavLink>
            <NavLink
              to="/"
              end
              className={mobileLinkClassName}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={mobileLinkClassName}
              onClick={closeMenu}
            >
              About
            </NavLink>
            <button
              onClick={() => {
                handleSignIn();
                closeMenu();
              }}
              className="text-left px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors touch-manipulation"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
