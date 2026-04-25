import React, { useState, useEffect } from "react";
import MetricsCard from "./MetricsCard";
import { Lightbulb, ArrowRight, UserPlus } from "lucide-react";

const MetricsDashboard = () => {
  const [data, setData] = useState(null);
  const [hasSelection, setHasSelection] = useState(false);

  const loadData = () => {
    const savedMetrics = localStorage.getItem("selected_dev_metrics");
    const savedId = localStorage.getItem("selected_dev_id");

    const isValid =
      savedMetrics && savedId && savedId !== "null" && savedId !== "undefined";

    if (isValid) {
      setData(JSON.parse(savedMetrics));
      setHasSelection(true);
    } else {
      setData(null);
      setHasSelection(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("storage", loadData);
    const interval = setInterval(loadData, 500); 

    return () => {
      window.removeEventListener("storage", loadData);
      clearInterval(interval);
    };
  }, []);

  if (!hasSelection || !data) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
        <div className="bg-slate-800 p-4 rounded-full mb-4 text-slate-600">
          <UserPlus size={40} />
        </div>
        <h3 className="text-slate-300 font-semibold text-lg">
          No Developer Selected
        </h3>
        <p className="text-slate-500 text-sm mt-1 max-w-xs text-center leading-relaxed">
          Select a developer from the dropdown to unlock performance analytics
          and AI-generated insights.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.metrics?.map((m) => (
          <MetricsCard key={m.id} metric={m} />
        ))}
      </div>

      {/* Insights & Recommendations - White Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deterministic Insights */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Lightbulb size={18} className="text-indigo-600" />
            </div>
            <h4 className="font-bold uppercase text-[11px] tracking-[0.15em] text-gray-500">
              Deterministic Insights
            </h4>
          </div>

          <ul className="space-y-4">
            {data.insights?.map((insight, i) => (
              <li key={i} className="flex gap-3 items-start group">
                <span className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5 shrink-0 shadow-[0_0_5px_rgba(99,102,241,0.3)]" />
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {insight}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Strategic Recommendations */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ArrowRight size={18} className="text-emerald-600" />
            </div>
            <h4 className="font-bold uppercase text-[11px] tracking-[0.15em] text-gray-500">
              Strategic Recommendations
            </h4>
          </div>

          <ul className="space-y-4">
            {data.suggestions?.map((sug, i) => (
              <li key={i} className="flex gap-3 items-start group">
                <ArrowRight
                  size={14}
                  className="text-emerald-500 shrink-0 mt-1 opacity-80"
                />
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {sug}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
