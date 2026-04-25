import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const DeveloperInsightsPanel = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get('https://developer-productivity-tool-backend.onrender.com/api/v1/developer/get-developers');
        setDevelopers(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching panel data:", err);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'excellent': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'good': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'watch': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Loading Team Insights...</div>;

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-gray-200 text-indigo-600 shadow-sm">
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Team Productivity Overview</h3>
            <p className="text-gray-500 text-xs">Real-time performance across all active developers</p>
          </div>
        </div>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          Export Report <ChevronRight size={14} />
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 text-gray-400 text-[11px] uppercase tracking-[0.1em] font-bold">
              <th className="px-6 py-4 border-b border-gray-100">Developer</th>
              <th className="px-6 py-4 border-b border-gray-100">Role</th>
              <th className="px-6 py-4 border-b border-gray-100 text-center">Status</th>
              <th className="px-6 py-4 border-b border-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {developers.map((dev) => (
              <tr key={dev.id} className="hover:bg-gray-50/80 transition-colors group">
                {/* Dev Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200">
                      {dev.initials}
                    </div>
                    <span className="text-gray-900 font-semibold text-sm">{dev.name}</span>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <span className="text-gray-600 text-sm">{dev.role}</span>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(dev.overallStatus)}`}>
                      {dev.overallStatus}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <TrendingUp size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex gap-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-500" />
          <span className="text-[11px] text-gray-500 font-medium">
            {developers.filter(d => d.overallStatus === 'excellent').length} High Performers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle size={14} className="text-rose-500" />
          <span className="text-[11px] text-gray-500 font-medium">
            {developers.filter(d => d.overallStatus === 'watch').length} Require Attention
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeveloperInsightsPanel;