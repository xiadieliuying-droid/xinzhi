import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  History, 
  Share2, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  TrendingUp,
  User,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { QUESTIONS, getBalancedQuestions } from './data/questions';
import { Type } from './types';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { format } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8">
    <motion.div 
      className="h-full bg-emerald-400"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

const RadarChartComponent = ({ data }: { data: any[] }) => (
  <div className="w-full h-64 md:h-80">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
        <Radar
          name="得分"
          dataKey="A"
          stroke="#34d399"
          fill="#34d399"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<'home' | 'pre-test' | 'testing' | 'result' | 'history'>('home');
  const [realAge, setRealAge] = useState<number | undefined>(undefined);
  const [currentQuestions, setCurrentQuestions] = useState<Type.Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Type.TestResult | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setHistory(data);
    } catch (e) {
      console.error("Failed to fetch history", e);
    }
  };

  const startTest = () => {
    setCurrentQuestions(getBalancedQuestions(60));
    setCurrentIndex(0);
    setAnswers([]);
    setStep('pre-test');
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((a, b) => a + b, 0);
    
    // Base psychological age = 15 + (totalScore - 60) * (35 / 180)
    let psychAge = 15 + (totalScore - 60) * (35 / 180);

    // Dimension calculation
    const dimScores: Record<Type.Dimension, number[]> = { A: [], B: [], C: [], D: [], E: [] };
    currentQuestions.forEach((q, idx) => {
      q.dimensions.forEach(d => dimScores[d].push(finalAnswers[idx]));
    });

    const dimensionAverages: Record<Type.Dimension, number> = {
      A: dimScores.A.reduce((a, b) => a + b, 0) / dimScores.A.length,
      B: dimScores.B.reduce((a, b) => a + b, 0) / dimScores.B.length,
      C: dimScores.C.reduce((a, b) => a + b, 0) / dimScores.C.length,
      D: dimScores.D.reduce((a, b) => a + b, 0) / dimScores.D.length,
      E: dimScores.E.reduce((a, b) => a + b, 0) / dimScores.E.length,
    };

    // Dynamic adjustment
    let adjustment = 0;
    if (dimensionAverages.A < 1.5) adjustment -= 2; // Very impulsive
    if (dimensionAverages.B > 3.5) adjustment += 2; // Very socially mature
    if (dimensionAverages.D > 3.8) adjustment += 3; // High values/wisdom
    
    psychAge = Math.min(50, Math.max(12, psychAge + adjustment));

    // Personality Sketch & Advice
    const maxDim = Object.entries(dimensionAverages).reduce((a, b) => a[1] > b[1] ? a : b)[0] as Type.Dimension;
    const minDim = Object.entries(dimensionAverages).reduce((a, b) => a[1] < b[1] ? a : b)[0] as Type.Dimension;

    const sketches: Record<Type.Dimension, string> = {
      A: "情绪管理大师，稳如泰山。",
      B: "人情世故的小大人，洞察人心。",
      C: "行动派先锋，决策果断。",
      D: "精神世界的哲学家，超然物外。",
      E: "生活艺术家，懂得享受当下。"
    };

    const weakSketches: Record<Type.Dimension, string> = {
      A: "偶尔会像个秒变河豚的小朋友。",
      B: "在复杂社交中还有点单纯可爱。",
      C: "行动上偶尔会陷入纠结的小迷糊。",
      D: "对世界的看法还带着少年的纯真。",
      E: "忙碌到快忘了怎么去玩耍。"
    };

    const personalitySketch = `你是一个在“${sketches[maxDim].split('，')[0]}”上表现突出的智者，但在“${weakSketches[minDim].split('，')[0]}”方面，内心还住着一个纯真的孩子。`;
    
    const adviceList = [
      "建议把微信拍一拍后缀改成‘拍了拍你说莫生气’。",
      "偶尔试着放下逻辑，去拥抱一次说走就走的冲动吧。",
      "你的内心已经足够强大，试着多给身边的‘小朋友’一点耐心。",
      "保持这份好奇心，它是你对抗平庸最有力的武器。"
    ];
    const growthAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];

    const newResult: Type.TestResult = {
      date: new Date().toISOString(),
      totalScore,
      psychologicalAge: Math.round(psychAge),
      realAge,
      dimensionScores: dimensionAverages,
      personalitySketch,
      growthAdvice
    };

    setResult(newResult);
    setStep('result');

    // Save to DB
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResult)
      });
      fetchHistory();
    } catch (e) {
      console.error("Failed to save result", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0502] text-white font-sans selection:bg-emerald-500/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-12 py-20"
            >
              <div className="space-y-4">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-block p-4 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 mb-4"
                >
                  <Brain className="w-12 h-12 text-emerald-400" />
                </motion.div>
                <h1 className="text-5xl font-light tracking-tight">心智时光机</h1>
                <p className="text-white/50 text-lg max-w-md mx-auto">
                  探索你灵魂深处的真实刻度，记录每一次心智的蜕变与成长。
                </p>
              </div>

              <div className="flex flex-col gap-4 items-center">
                <button 
                  onClick={startTest}
                  className="group relative px-12 py-4 bg-white text-black rounded-full font-medium overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    开始测试 <ChevronRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                
                <button 
                  onClick={() => setStep('history')}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors py-2"
                >
                  <History className="w-4 h-4" /> 查看成长记录
                </button>
              </div>
            </motion.div>
          )}

          {step === 'pre-test' && (
            <motion.div 
              key="pre-test"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 py-12"
            >
              <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6 text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-sm font-medium uppercase tracking-widest">小提示</span>
                </div>
                <h2 className="text-2xl font-light mb-4 leading-relaxed">
                  告诉我们你的真实年龄，可以让结果解读更有趣哦！
                </h2>
                <p className="text-white/40 text-sm mb-8">
                  我们承诺，这绝不会影响你的心理年龄分数，只会让对比更奇妙～
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="填入我的真实年龄..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      onChange={(e) => setRealAge(parseInt(e.target.value) || undefined)}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20">岁</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStep('testing')}
                      className="flex-1 py-4 bg-emerald-500 text-black rounded-2xl font-medium hover:bg-emerald-400 transition-colors"
                    >
                      确认并开始
                    </button>
                    <button 
                      onClick={() => { setRealAge(undefined); setStep('testing'); }}
                      className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:bg-white/10 transition-colors"
                    >
                      跳过
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'testing' && (
            <motion.div 
              key="testing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 md:py-12"
            >
              <div className="flex justify-between items-end mb-4">
                <span className="text-emerald-400 font-mono text-sm">Q{currentIndex + 1} / 60</span>
                <span className="text-white/20 text-xs uppercase tracking-widest hidden sm:inline">心理年龄测试</span>
              </div>
              <ProgressBar current={currentIndex + 1} total={60} />

              <div className="space-y-6 md:space-y-8">
                <h2 className="text-xl md:text-2xl font-light leading-snug min-h-[4rem]">
                  {currentQuestions[currentIndex]?.text}
                </h2>

                <div className="grid gap-3">
                  {currentQuestions[currentIndex]?.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt.score)}
                      className="w-full text-left p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all group"
                    >
                      <div className="flex items-start md:items-center gap-3 md:gap-4">
                        <span className="shrink-0 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/5 text-white/40 text-xs group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm md:text-base text-white/80 group-hover:text-white leading-tight">{opt.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 py-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] md:text-xs font-medium tracking-widest uppercase border border-emerald-500/20">
                  测试完成
                </div>
                <h2 className="text-5xl md:text-6xl font-light tracking-tighter">
                  {result.psychologicalAge} <span className="text-xl md:text-2xl text-white/40">岁</span>
                </h2>
                <p className="text-white/60 text-sm md:text-base">你的心理年龄</p>
                
                {result.realAge && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 inline-block mx-4"
                  >
                    <p className="text-xs md:text-sm text-emerald-400">
                      🎯 比你真实的 {result.realAge} 岁
                      {result.psychologicalAge < result.realAge 
                        ? ` 年轻了 ${result.realAge - result.psychologicalAge} 岁，保鲜成功！`
                        : ` 成熟了 ${result.psychologicalAge - result.realAge} 岁，靠谱的小大人！`}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="bg-white/5 rounded-[24px] md:rounded-[32px] border border-white/10 p-6 md:p-8 space-y-8 backdrop-blur-xl mx-2 sm:mx-0">
                <div>
                  <h3 className="text-[10px] md:text-sm font-medium text-white/40 uppercase tracking-widest mb-6">维度剖面图</h3>
                  <RadarChartComponent data={[
                    { subject: '情绪', A: result.dimensionScores.A * 25, fullMark: 100 },
                    { subject: '认知', A: result.dimensionScores.B * 25, fullMark: 100 },
                    { subject: '行为', A: result.dimensionScores.C * 25, fullMark: 100 },
                    { subject: '价值', A: result.dimensionScores.D * 25, fullMark: 100 },
                    { subject: '娱乐', A: result.dimensionScores.E * 25, fullMark: 100 },
                  ]} />
                </div>

                <div className="space-y-6 pt-6 border-t border-white/10">
                  <div className="space-y-2">
                    <h4 className="text-emerald-400 text-xs md:text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" /> 性格素描
                    </h4>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed italic">“{result.personalitySketch}”</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-orange-400 text-xs md:text-sm font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> 成长建议
                    </h4>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">{result.growthAdvice}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 px-2 sm:px-0">
                <button 
                  onClick={() => setStep('home')}
                  className="flex-1 py-4 bg-white text-black rounded-2xl font-medium flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" /> 重新测试
                </button>
                <button 
                  onClick={() => setStep('history')}
                  className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors active:scale-95"
                >
                  <TrendingUp className="w-4 h-4" /> 成长曲线
                </button>
              </div>
            </motion.div>
          )}

          {step === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 py-12"
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setStep('home')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-light">心智时光机</h2>
                <div className="w-10" />
              </div>

              {history.length > 0 ? (
                <>
                  <div className="bg-white/5 rounded-[32px] border border-white/10 p-6 backdrop-blur-xl">
                    <h3 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-6">成长曲线</h3>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[...history].reverse()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(val) => format(new Date(val), 'MM/dd')}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                            axisLine={false}
                          />
                          <YAxis 
                            domain={[10, 55]} 
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                            axisLine={false}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                            itemStyle={{ color: '#34d399' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="psych_age" 
                            stroke="#34d399" 
                            strokeWidth={3} 
                            dot={{ r: 4, fill: '#34d399' }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-white/40 uppercase tracking-widest px-2">历史记录</h3>
                    {history.map((h) => (
                      <div 
                        key={h.id}
                        className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 font-mono font-bold">
                            {Math.round(h.psych_age)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">心理年龄 {Math.round(h.psych_age)} 岁</p>
                            <p className="text-xs text-white/30 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {format(new Date(h.date), 'yyyy-MM-dd HH:mm')}
                            </p>
                          </div>
                        </div>
                        {h.real_age && (
                          <div className="text-right">
                            <span className="text-[10px] uppercase tracking-widest text-white/20 block mb-1">真实年龄</span>
                            <span className="text-sm text-white/60">{h.real_age} 岁</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <History className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/40">暂无测试记录，快去开启你的第一次探索吧</p>
                  <button 
                    onClick={() => setStep('home')}
                    className="text-emerald-400 text-sm font-medium hover:underline"
                  >
                    立即开始测试
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <p className="text-white/20 text-xs uppercase tracking-[0.2em]">
          © 2026 心智时光机 · 探索灵魂的刻度
        </p>
      </footer>
    </div>
  );
}
