import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, Terminal, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "IC View", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Manager View", path: "/manager", icon: <Settings size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Terminal size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-100">
              Dev<span className="text-indigo-500">Sync</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                  ${
                    isActive
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-950 border-b border-slate-800">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium
                ${
                  isActive
                    ? "bg-slate-800 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
