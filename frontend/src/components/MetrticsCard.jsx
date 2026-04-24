import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricsCard = ({ metric }) => {
  const { label, value, previousValue, unit, lowerIsBetter, description, healthyRange } = metric;
  
  const diff = value - previousValue;
  const isImproved = lowerIsBetter ? diff < 0 : diff > 0;
  
  const getStatusColor = () => {
    if (lowerIsBetter) {
      if (value <= healthyRange.green) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      if (value <= healthyRange.amber) return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
    } else {
      if (value >= healthyRange.green) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      if (value >= healthyRange.amber) return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
    }
  };

  return (
    <div className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${getStatusColor()}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-500">
            {value}<span className="text-sm ml-1 text-slate-500">{unit}</span>
          </p>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isImproved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {diff === 0 ? <Minus size={12} /> : isImproved ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
          {Math.abs(diff).toFixed(1)}
        </div>
      </div>
      <p className="text-slate-500 text-sm leading-tight">{description}</p>
    </div>
  );
};

export default MetricsCard;