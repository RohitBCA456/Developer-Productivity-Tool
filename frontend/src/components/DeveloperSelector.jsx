import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronDown, User, Loader2, Check } from "lucide-react";

const DeveloperSelector = ({ onSelect }) => {
  const [developers, setDevelopers] = useState([]);
  const [selectedDev, setSelectedDev] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchingMetrics, setFetchingMetrics] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(
          "https://developer-productivity-tool-backend.onrender.com/api/v1/developer/get-developers",
        );
        const data = response.data.data || response.data;
        setDevelopers(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchDevelopers();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = async (dev) => {
    setSelectedDev(dev);
    setIsOpen(false);
    setFetchingMetrics(true);

    try {
      const dev_id = dev.id;
      const response = await axios.get(
        `https://developer-productivity-tool-backend.onrender.com/api/v1/developer/get-dev-metrics/${dev_id}`,
        {},
      );

      const metricsData = response.data.data || response.data;

      localStorage.setItem("selected_dev_metrics", JSON.stringify(metricsData));
      localStorage.setItem("selected_dev_id", dev._id || dev.id);

      if (onSelect) onSelect(metricsData);

      console.log("Metrics updated in localStorage for:", dev.name);
    } catch (err) {
      console.error("Error fetching metrics:", err);
    } finally {
      setFetchingMetrics(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900 border border-slate-800 p-6 shadow-xl gap-4">
      {/* Left Side: Dynamic Text */}
      <div className="flex flex-col">
        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
          Performance Analytics
        </span>
        <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          Viewing productivity of{" "}
          <span className="text-indigo-400">
            {selectedDev ? selectedDev.name : "..."}
          </span>
          {fetchingMetrics && (
            <Loader2 size={16} className="animate-spin text-slate-500" />
          )}
        </h3>
      </div>

      {/* Right Side: Custom Styled Dropdown */}
      <div className="relative w-full md:w-72" ref={dropdownRef}>
        <button
          onClick={() => !loading && setIsOpen(!isOpen)}
          disabled={loading || fetchingMetrics}
          className="flex items-center justify-between w-full bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-xl hover:border-indigo-500/50 transition-all focus:ring-2 focus:ring-indigo-500/20 outline-none disabled:opacity-50"
        >
          <div className="flex items-center gap-3">
            {loading ? (
              <Loader2 size={18} className="animate-spin text-indigo-500" />
            ) : (
              <User size={18} className="text-slate-400" />
            )}
            <span className="truncate">
              {selectedDev ? selectedDev.name : "Select Developer"}
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {developers.map((dev) => (
                <button
                  key={dev._id || dev.id}
                  onClick={() => handleSelect(dev)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left text-sm text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  <span>{dev.name}</span>
                  {selectedDev?._id === dev._id && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperSelector;
