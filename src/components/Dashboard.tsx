import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Activity, Moon, Droplets, Zap, TrendingUp, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const activityData = [
  { name: 'Mon', steps: 6400, sleep: 7.5 },
  { name: 'Tue', steps: 8200, sleep: 6.8 },
  { name: 'Wed', steps: 5100, sleep: 8.2 },
  { name: 'Thu', steps: 9400, sleep: 7.4 },
  { name: 'Fri', steps: 11000, sleep: 7.1 },
  { name: 'Sat', steps: 7800, sleep: 9.0 },
  { name: 'Sun', steps: 5200, sleep: 8.5 },
];

export default function Dashboard() {
  const stats = [
    { label: 'Steps', value: '8,432', change: '+12%', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Sleep', value: '7.4h', change: '-2%', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Water', value: '1.8L', change: '+5%', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Heart Rate', value: '72bpm', change: 'Stable', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#111827] mb-2">Welcome back, Zen</h2>
        <p className="text-[#64748B]">Here's your wellness summary for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white rounded-2xl border border-[#E1E3E5] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-full",
                stat.change.startsWith('+') ? "bg-green-50 text-green-600" : stat.change === 'Stable' ? "bg-gray-50 text-gray-600" : "bg-red-50 text-red-600"
              )}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-[#64748B] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-white rounded-3xl border border-[#E1E3E5] shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Activity Progress</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2D6A4F]" />
                <span className="text-xs font-medium text-[#64748B]">Steps</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  hide 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="#2D6A4F" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSteps)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 bg-white rounded-3xl border border-[#E1E3E5] shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Sleep Cycles</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-xs font-medium text-[#64748B]">Hours</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#6366F1" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Daily Challenges */}
      <div className="bg-[#2D6A4F] rounded-3xl p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2">Ready for a mindful break?</h3>
            <p className="opacity-90 max-w-md">Our AI coach has prepared a 5-minute breathing exercise to help you refocus.</p>
          </div>
          <button className="px-8 py-4 bg-white text-[#2D6A4F] font-bold rounded-2xl hover:bg-opacity-90 transition-all shadow-xl shadow-black/10">
            Start Session
          </button>
        </div>
        
        {/* Animated Background Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-20 -mb-20 blur-3xl" />
      </div>
    </div>
  );
}

// Inline helper for cn since I can't import easily if I'm creating files in batch
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
