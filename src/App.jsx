import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight, Dumbbell, Target, User, Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('welcome');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    weight: '',
    height: '',
    goal: 'keep',
    place: 'gym'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startAnalysis = async () => {
    setLoading(true);
    
    // Подготовка данных (числа вместо строк)
    const payload = {
      age: parseInt(formData.age) || 25,
      weight: parseFloat(formData.weight) || 70,
      height: parseFloat(formData.height) || 175,
      gender: formData.gender,
      goal: formData.goal,
      place: formData.place
    };

    try {
      const response = await fetch('https://sport-97ne.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
        setStep('dashboard');
      } else {
        const err = await response.json();
        alert("Ошибка сервера: " + JSON.stringify(err.detail));
      }
    } catch (error) {
      alert("Сервер спит или недоступен. Подожди 30 секунд и попробуй снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 flex flex-col items-center justify-center font-sans">
      <AnimatePresence mode="wait">
        
        {step === 'welcome' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <Activity className="w-16 h-16 text-purple-500 mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-6">AI FITNESS COACH</h1>
            <button onClick={() => setStep('quiz')} className="bg-purple-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-purple-500 transition-all">
              НАЧАТЬ
            </button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><User /> ПАРАМЕТРЫ</h2>
            
            <div className="space-y-5">
              {/* ВЫБОР ПОЛА */}
              <div>
                <label className="text-sm text-slate-400 block mb-2">Ваш пол</label>
                <div className="grid grid-cols-2 gap-2">
                  {['male', 'female'].map(g => (
                    <button key={g} onClick={() => setFormData({...formData, gender: g})}
                      className={`p-3 rounded-xl border transition-all ${formData.gender === g ? 'bg-purple-600 border-purple-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                      {g === 'male' ? 'Мужчина' : 'Женщина'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input name="weight" type="number" placeholder="Вес (кг)" onChange={handleInputChange} className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
                <input name="height" type="number" placeholder="Рост (см)" onChange={handleInputChange} className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <input name="age" type="number" placeholder="Возраст" onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-xl outline-none" />

              <select name="goal" onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-xl outline-none">
                <option value="keep">Поддержание формы</option>
                <option value="lose">Похудение</option>
                <option value="gain">Набор массы</option>
              </select>

              <button onClick={startAnalysis} disabled={loading} className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-purple-100 transition-all">
                {loading ? "АНАЛИЗ..." : "ПОЛУЧИТЬ ПЛАН"}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'dashboard' && analysis && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="w-full max-w-2xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-6 rounded-3xl border border-purple-500/30 text-center">
                <Target className="mx-auto mb-2 text-purple-400" />
                <div className="text-3xl font-black">{analysis.bmi}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">{analysis.status}</div>
              </div>
              <div className="bg-slate-900 p-6 rounded-3xl border border-orange-500/30 text-center">
                <Flame className="mx-auto mb-2 text-orange-400" />
                <div className="text-3xl font-black">{analysis.calories}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">ККАЛ / ДЕНЬ</div>
              </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-2 mb-4 text-purple-400 font-bold"><Sparkles /> AI СОВЕТ:</div>
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">{analysis.advice}</div>
            </div>
            <button onClick={() => setStep('welcome')} className="w-full text-slate-500 py-4 hover:text-white">← НАЧАТЬ ЗАНОВО</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}