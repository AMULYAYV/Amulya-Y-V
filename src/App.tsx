import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  MessageSquare, 
  Wind, 
  Smile, 
  Menu, 
  X,
  ChevronRight,
  Droplets,
  Zap,
  Moon,
  Clock,
  Send,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Meditation from './components/Meditation';
import MoodTracker from './components/MoodTracker';

type View = 'dashboard' | 'chat' | 'meditation' | 'mood';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'chat', label: 'AI Coach', icon: MessageSquare },
    { id: 'meditation', label: 'Meditation', icon: Wind },
    { id: 'mood', label: 'Mood Tracker', icon: Smile },
  ];

  return (
    <div className="flex h-screen bg-[#F5F7F9] text-[#1A1C1E] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E1E3E5] z-50 transition-transform duration-300 transform lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#2D6A4F] rounded-xl flex items-center justify-center text-white">
              <Heart size={24} fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#111827]">ZenHealth</h1>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as View);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium",
                  activeView === item.id 
                    ? "bg-[#2D6A4F] text-white shadow-lg shadow-[#2D6A4F]/20" 
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                )}
              >
                <item.icon size={20} className={cn(activeView === item.id ? "text-white" : "text-[#94A3B8] group-hover:text-[#64748B]")} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#EDF2F7]">
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Daily Quote</p>
            <p className="text-sm text-[#475569] italic leading-relaxed">
              "The ground below you is the same ground below everyone else."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-bottom border-[#E1E3E5] lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2D6A4F] rounded-lg flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="font-bold text-lg">ZenHealth</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto h-full"
            >
              {activeView === 'dashboard' && <Dashboard />}
              {activeView === 'chat' && <Chat />}
              {activeView === 'meditation' && <Meditation />}
              {activeView === 'mood' && <MoodTracker />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
