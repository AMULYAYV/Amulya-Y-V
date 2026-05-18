import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smile, 
  Meh, 
  Frown, 
  CloudRain, 
  Sun, 
  Zap, 
  Trash2, 
  Plus,
  Calendar
} from 'lucide-react';

interface Log {
  id: string;
  mood: string;
  note: string;
  date: Date;
  icon: any;
  color: string;
}

const moods = [
  { id: 'great', label: 'Great', icon: Sun, color: 'bg-yellow-400', text: 'text-yellow-700' },
  { id: 'good', label: 'Good', icon: Smile, color: 'bg-green-400', text: 'text-green-700' },
  { id: 'meh', label: 'Meh', icon: Meh, color: 'bg-gray-400', text: 'text-gray-700' },
  { id: 'tired', label: 'Tired', icon: CloudRain, color: 'bg-blue-400', text: 'text-blue-700' },
  { id: 'stressed', label: 'Stressed', icon: Zap, color: 'bg-red-400', text: 'text-red-700' },
];

export default function MoodTracker() {
  const [logs, setLogs] = useState<Log[]>([
    { id: '1', mood: 'Great', note: 'Had a productive morning walk.', date: new Date(Date.now() - 86400000), icon: Sun, color: 'bg-yellow-100' },
    { id: '2', mood: 'Good', note: 'Enjoyed lunch with friends.', date: new Date(Date.now() - 172800000), icon: Smile, color: 'bg-green-100' },
  ]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const addLog = () => {
    if (!selectedMood) return;
    const moodObj = moods.find(m => m.id === selectedMood);
    const newLog: Log = {
      id: Math.random().toString(36).substr(2, 9),
      mood: moodObj?.label || '',
      note: note,
      date: new Date(),
      icon: moodObj?.icon,
      color: moodObj?.color.replace('bg-', 'bg-opacity-20 bg-') || 'bg-gray-100',
    };
    setLogs([newLog, ...logs]);
    setSelectedMood(null);
    setNote('');
  };

  const removeLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Left side: Logging */}
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-[#E1E3E5] shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus size={20} className="text-[#2D6A4F]" />
            How are you feeling?
          </h3>
          
          <div className="grid grid-cols-5 gap-3 mb-8">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all",
                  selectedMood === mood.id 
                    ? `border-${mood.id === 'great' ? 'yellow-400' : mood.id === 'good' ? 'green-400' : mood.id === 'meh' ? 'gray-400' : mood.id === 'tired' ? 'blue-400' : 'red-400'} bg-gray-50` 
                    : "border-transparent hover:bg-gray-50 bg-white"
                )}
              >
                <div className={`w-10 h-10 rounded-xl ${mood.color} flex items-center justify-center text-white shadow-sm`}>
                  <mood.icon size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{mood.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-[#64748B]">What's on your mind? (Optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Jot down a few words..."
              className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/10 focus:border-[#2D6A4F] h-32 resize-none"
            />
          </div>

          <button
            onClick={addLog}
            disabled={!selectedMood}
            className="w-full mt-6 py-4 bg-[#2D6A4F] text-white rounded-2xl font-bold shadow-lg shadow-[#2D6A4F]/10 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all"
          >
            Log Entry
          </button>
        </div>

        <div className="bg-[#1A1C1E] p-8 rounded-3xl text-white">
          <Calendar className="mb-4 text-emerald-400" size={24} />
          <h4 className="text-lg font-bold mb-2">Consistency is Key</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Logging your mood daily helps you identify patterns and manage your emotional well-being more effectively.
          </p>
        </div>
      </div>

      {/* Right side: History */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-2xl font-bold text-[#111827]">Recent Entries</h3>
        
        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group p-6 bg-white border border-[#E1E3E5] rounded-3xl flex items-start gap-6 hover:shadow-md transition-shadow relative"
              >
                <div className={`w-14 h-14 rounded-2xl ${log.color || 'bg-gray-100'} flex items-center justify-center shrink-0`}>
                  {log.icon ? <log.icon size={28} className="text-[#1F2937]" /> : <Smile size={28} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-[#111827]">{log.mood}</h4>
                    <span className="text-xs font-semibold text-[#94A3B8]">
                      {log.date.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[#475569] text-sm leading-relaxed break-words">
                    {log.note || "No notes for this entry."}
                  </p>
                </div>

                <button 
                  onClick={() => removeLog(log.id)}
                  className="p-2 text-[#94A3B8] hover:text-red-500 hover:bg-red-50 rounded-lg lg:opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {logs.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <Smile size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Your journal is empty. How are you feeling today?</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
