import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Target, User, Flame, Sparkles, Instagram, Phone, Info, Users, Mail } from 'lucide-react';

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

  // Объект с видео для разных целей (замени ID на свои)
  const videoMap = {
    keep: "https://www.youtube.com/embed/v7AYK77zF90", // Поддержание
    lose: "https://www.youtube.com/embed/ml6cT4AZdqI", // Похудение
    gain: "https://www.youtube.com/embed/upLnzm9L9pE"  // Набор
  };

  const startAnalysis = async () => {
    setLoading(true);
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
        alert("Ошибка сервера. Проверь данные.");
      }
    } catch (error) {
      alert("Сервер спит. Подожди 30 секунд.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans scroll-smooth">
      {/* --- НАВИГАЦИЯ --- */}
      <nav className="flex justify-between items-center p-6 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent cursor-pointer" onClick={() => setStep('welcome')}>
          AI FITNESS
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-bold tracking-widest text-slate-400">
          <a href="#about" className="hover:text-purple-400 transition">О НАС</a>
          <a href="#trainers" className="hover:text-purple-400 transition">ТРЕНЕРЫ</a>
          <a href="#contacts" className="hover:text-purple-400 transition">КОНТАКТЫ</a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 py-12">
        <AnimatePresence mode="wait">
          
          {/* --- ПРИВЕТСТВИЕ --- */}
          {step === 'welcome' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center py-20">
              <div className="relative inline-block">
                <Activity className="w-20 h-20 text-purple-500 mx-auto mb-8 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full blur-xl animate-ping"></div>
              </div>
              <h1 className="text-6xl font-black mb-6 tracking-tighter">
                ТВОЁ ТЕЛО <br /> <span className="text-purple-500">ПОД КОНТРОЛЕМ ИИ</span>
              </h1>
              <p className="text-slate-400 mb-10 text-lg max-w-lg mx-auto">Получи персональный план тренировок и питания, созданный нейросетью специально под твои параметры.</p>
              <button onClick={() => setStep('quiz')} className="bg-purple-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-purple-500 hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
                НАЧАТЬ АНАЛИЗ
              </button>
            </motion.div>
          )}

          {/* --- ТЕСТ / ПАРАМЕТРЫ --- */}
          {step === 'quiz' && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl max-w-md mx-auto">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3"><User className="text-purple-500"/> ТВОИ ДАННЫЕ</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Пол</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['male', 'female'].map(g => (
                      <button key={g} onClick={() => setFormData({...formData, gender: g})}
                        className={`p-4 rounded-2xl border-2 font-bold transition-all ${formData.gender === g ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-800 border-transparent text-slate-500 hover:bg-slate-700'}`}>
                        {g === 'male' ? 'Мужчина' : 'Женщина'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Вес (кг)</label>
                    <input name="weight" type="number" placeholder="70" onChange={handleInputChange} className="w-full bg-slate-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border border-transparent transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Рост (см)</label>
                    <input name="height" type="number" placeholder="175" onChange={handleInputChange} className="w-full bg-slate-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border border-transparent transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Возраст</label>
                  <input name="age" type="number" placeholder="25" onChange={handleInputChange} className="w-full bg-slate-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border border-transparent transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Твоя цель</label>
                  <select name="goal" onChange={handleInputChange} className="w-full bg-slate-800 p-4 rounded-2xl outline-none border border-transparent focus:ring-2 focus:ring-purple-500 appearance-none">
                    <option value="keep">Поддержание формы</option>
                    <option value="lose">Похудение</option>
                    <option value="gain">Набор массы</option>
                  </select>
                </div>

                <button onClick={startAnalysis} disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-5 rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : "ПОЛУЧИТЬ ПЛАН"}
                </button>
              </div>
            </motion.div>
          )}

          {/* --- РЕЗУЛЬТАТЫ (DASHBOARD) --- */}
          {step === 'dashboard' && analysis && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-8 rounded-[2rem] border border-purple-500/20 shadow-xl relative overflow-hidden group">
                  <Target className="absolute -right-4 -top-4 w-24 h-24 text-purple-500/10 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-black mb-1">{analysis.bmi}</div>
                  <div className="text-sm font-bold text-purple-400 uppercase tracking-widest">{analysis.status}</div>
                  <p className="text-xs text-slate-500 mt-2">Индекс массы тела</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2rem] border border-orange-500/20 shadow-xl relative overflow-hidden group">
                  <Flame className="absolute -right-4 -top-4 w-24 h-24 text-orange-500/10 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-black mb-1">{analysis.calories}</div>
                  <div className="text-sm font-bold text-orange-400 uppercase tracking-widest">ККАЛ / ДЕНЬ</div>
                  <p className="text-xs text-slate-500 mt-2">Рекомендуемая норма</p>
                </div>
              </div>

              {/* Видео от ИИ */}
              <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-red-500 underline decoration-red-500/30">
                   ВИДЕО-ТРЕНИРОВКА
                </h3>
                <div className="aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                  <iframe width="100%" height="100%" src={videoMap[formData.goal]} title="Workout" frameBorder="0" allowFullScreen></iframe>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-inner">
                <div className="flex items-center gap-2 mb-6 text-purple-400 font-black text-lg"><Sparkles /> АНАЛИЗ ОТ AI COACH:</div>
                <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{analysis.advice}</div>
              </div>
              
              <button onClick={() => setStep('welcome')} className="w-full text-slate-500 font-bold py-4 hover:text-white transition-colors">← НАЧАТЬ ЗАНОВО</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- СЕКЦИЯ: О НАС --- */}
        <section id="about" className="mt-32 pt-20 border-t border-slate-900">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">БУДУЩЕЕ ФИТНЕСА</h2>
            <div className="h-1.5 w-20 bg-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Activity />, t: "Точность", d: "Алгоритмы анализируют каждый килограмм вашего веса." },
              { icon: <Target />, t: "Цель", d: "Программы адаптируются под набор или похудение." },
              { icon: <Sparkles />, t: "AI", d: "Используем передовой интеллект для советов." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 text-center hover:border-purple-500/50 transition-colors">
                <div className="text-purple-500 mb-4 flex justify-center">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.t}</h3>
                <p className="text-slate-500 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- СЕКЦИЯ: ТРЕНЕРЫ --- */}
        <section id="trainers" className="mt-32 pt-20">
          <h2 className="text-4xl font-black mb-12 text-center">КОМАНДА</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-center hover:bg-purple-900/10 transition-all">
              <div className="w-32 h-32 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-xl">👤</div>
              <h3 className="text-2xl font-black">Ерхан</h3>
              <p className="text-purple-400 font-bold mb-4">Founder & Lead Developer</p>
              <p className="text-slate-500 text-sm">Создал архитектуру системы и обучил ИИ понимать ваши цели.</p>
            </div>
            <div className="group relative bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-center hover:bg-pink-900/10 transition-all">
              <div className="w-32 h-32 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl border-2 border-pink-500/30 shadow-xl">🤖</div>
              <h3 className="text-2xl font-black">DeepSeek V3</h3>
              <p className="text-pink-400 font-bold mb-4">AI Head Coach</p>
              <p className="text-slate-500 text-sm">Ваш персональный наставник, доступный 24/7 без выходных.</p>
            </div>
          </div>
        </section>

        {/* --- КОНТАКТЫ / ФУТЕР --- */}
        <footer id="contacts" className="mt-40 py-20 border-t border-slate-900 text-center">
          <h2 className="text-3xl font-black mb-10">СВЯЗАТЬСЯ С НАМИ</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800">
              <Instagram size={20} /> <span>@yerkhann_fitness</span>
            </a>
            <a href="tel:+77071234567" className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800">
              <Phone size={20} /> <span>+7 (707) 123-45-67</span>
            </a>
            <a href="mailto:info@ai-fit.kz" className="flex items-center gap-2 text-slate-400 hover:text-purple-500 transition-colors bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800">
              <Mail size={20} /> <span>info@ai-fit.kz</span>
            </a>
          </div>
          <p className="text-slate-600 text-xs font-bold tracking-widest uppercase">© 2026 AI FITNESS PROJECT | DESIGNED BY YERKHAN</p>
        </footer>
      </main>
    </div>
  );
}