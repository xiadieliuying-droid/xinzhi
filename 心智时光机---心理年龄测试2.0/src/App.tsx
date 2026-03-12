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
  <div className="w-full h-64 md:h-96 relative">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#818cf8" stopOpacity={0.1}/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <PolarGrid 
          stroke="rgba(255,255,255,0.05)" 
          gridType="polygon"
          gridCount={5}
        />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 300 }} 
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={false} 
          axisLine={false} 
        />
        {/* Subtle reference radar */}
        <Radar
          name="基准"
          dataKey="fullMark"
          stroke="rgba(255,255,255,0.02)"
          fill="transparent"
          strokeDasharray="4 4"
        />
        <Radar
          name="得分"
          dataKey="A"
          stroke="#818cf8"
          strokeWidth={3}
          fill="url(#radarGradient)"
          fillOpacity={0.6}
          filter="url(#glow)"
          dot={(props: any) => {
            const { cx, cy, payload } = props;
            // Differentiate dot color based on score or dimension
            const color = payload.A > 70 ? '#10b981' : payload.A > 30 ? '#818cf8' : '#f43f5e';
            return (
              <circle 
                cx={cx} 
                cy={cy} 
                r={3.5} 
                fill={color} 
                stroke="#fff" 
                strokeWidth={1.5} 
                className="transition-all duration-300"
              />
            );
          }}
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
    const dimScores: any = { 
      Curiosity: [], Stability: [], Social: [], Responsibility: [], 
      Resilience: [], Passion: [], Inclusivity: [], Acceptance: [] 
    };

    // Map old dimensions to new ones for backward compatibility with existing questions
    const dimMap: Record<string, Type.Dimension> = {
      'A': 'Stability',
      'B': 'Social',
      'C': 'Responsibility',
      'D': 'Acceptance',
      'E': 'Curiosity'
    };

    currentQuestions.forEach((q, idx) => {
      q.dimensions.forEach(d => {
        const targetDim = dimMap[d as string] || d as Type.Dimension;
        if (dimScores[targetDim]) {
          dimScores[targetDim].push(finalAnswers[idx]);
        }
      });
    });

    // Fill in missing dimensions with more unique logic
    // Resilience: Stability + Responsibility
    if (dimScores.Resilience.length === 0) {
      dimScores.Resilience = [...dimScores.Stability, ...dimScores.Responsibility];
    }
    // Passion: Curiosity + Social
    if (dimScores.Passion.length === 0) {
      dimScores.Passion = [...dimScores.Curiosity, ...dimScores.Social];
    }
    // Inclusivity: Acceptance + Social
    if (dimScores.Inclusivity.length === 0) {
      dimScores.Inclusivity = [...dimScores.Acceptance, ...dimScores.Social];
    }

    const dimensionAverages: any = {
      Curiosity: (dimScores.Curiosity.reduce((a, b) => a + b, 0) / (dimScores.Curiosity.length || 1)) || 2.5,
      Stability: (dimScores.Stability.reduce((a, b) => a + b, 0) / (dimScores.Stability.length || 1)) || 2.5,
      Social: (dimScores.Social.reduce((a, b) => a + b, 0) / (dimScores.Social.length || 1)) || 2.5,
      Responsibility: (dimScores.Responsibility.reduce((a, b) => a + b, 0) / (dimScores.Responsibility.length || 1)) || 2.5,
      Resilience: (dimScores.Resilience.reduce((a, b) => a + b, 0) / (dimScores.Resilience.length || 1)) || 2.5,
      Passion: (dimScores.Passion.reduce((a, b) => a + b, 0) / (dimScores.Passion.length || 1)) || 2.5,
      Inclusivity: (dimScores.Inclusivity.reduce((a, b) => a + b, 0) / (dimScores.Inclusivity.length || 1)) || 2.5,
      Acceptance: (dimScores.Acceptance.reduce((a, b) => a + b, 0) / (dimScores.Acceptance.length || 1)) || 2.5,
    };

    // Scale to 0-100 for radar chart with more variance
    const radarScores: any = {};
    Object.keys(dimensionAverages).forEach(key => {
      const avg = dimensionAverages[key];
      // Normalize to 0-1
      const normalized = (avg - 1) / 3;
      // Stretch the range: 0.5 becomes 50, but 0.2 becomes 10, 0.8 becomes 90
      // We'll use a simple linear stretch around the center
      let score = (normalized - 0.5) * 140 + 50;
      radarScores[key] = Math.max(5, Math.min(100, score));
    });

    // Dynamic adjustment
    let adjustment = 0;
    if (dimensionAverages.Stability < 1.5) adjustment -= 2; 
    if (dimensionAverages.Social > 3.5) adjustment += 2; 
    if (dimensionAverages.Acceptance > 3.8) adjustment += 3; 
    
    psychAge = Math.min(60, Math.max(10, psychAge + adjustment));

    // Generate Strengths, Blind Spots, Tags
    const strengths: string[] = [];
    const blindSpots: string[] = [];
    const tags: string[] = [];

    if (dimensionAverages.Curiosity > 3) strengths.push("求知欲旺盛", "敢于挑战现状");
    if (dimensionAverages.Social > 3) strengths.push("社交游刃有余", "对朋友仗义");
    if (dimensionAverages.Responsibility > 3) strengths.push("责任感强", "学习能力强");
    if (dimensionAverages.Resilience > 3) strengths.push("抗压能力出色");
    
    if (dimensionAverages.Stability < 2) blindSpots.push("容易钻牛角尖");
    if (dimensionAverages.Social < 2) blindSpots.push("过度在意他人评价");
    if (dimensionAverages.Acceptance < 2) blindSpots.push("容易自我怀疑");

    if (dimensionAverages.Curiosity > 3.5) tags.push("#求知欲");
    if (dimensionAverages.Stability < 2.5) tags.push("#敏感", "#纠结");
    if (dimensionAverages.Social > 3) tags.push("#重视社交");
    if (dimensionAverages.Acceptance > 3.5) tags.push("#理想主义");
    if (tags.length < 3) tags.push("#探索者", "#真实");

    // Personality Sketch & Advice
    const sortedDims = (Object.entries(dimensionAverages) as [string, number][]).sort((a, b) => b[1] - a[1]);
    const maxDim = sortedDims[0][0] as Type.Dimension;
    const minDim = sortedDims[sortedDims.length - 1][0] as Type.Dimension;

    const dimNames: any = {
      Curiosity: "求知欲", Stability: "情绪韧性", Social: "社交共情", 
      Responsibility: "意志担当", Resilience: "复原力", Passion: "生命热情", 
      Inclusivity: "精神包容", Acceptance: "自我整合"
    };

    const sketches: any = {
      Curiosity: "求知欲旺盛的探索者，总能在平凡中挖掘新奇。",
      Stability: "内核稳定的定海神针，波澜不惊，自带静谧气场。",
      Social: "共情力极强的连接者，洞若观火，社交中的温暖纽带。",
      Responsibility: "意志坚定的攀登者，言出必行，是风雨中的避风港。",
      Resilience: "生命力顽强的野草，在压力下总能迅速反弹。",
      Passion: "热忱满格的梦想家，对万物保有温度，活色生香。",
      Inclusivity: "格局宏大的精神行者，海纳百川，超脱于琐碎之外。",
      Acceptance: "自洽且通透的觉醒者，与自我和解，散发着内在光泽。"
    };

    const weakSketches: any = {
      Curiosity: "在打破常规方面偶尔会显得有些克制。",
      Stability: "情绪起伏时像个需要抱抱的敏感孩童。",
      Social: "在复杂的人际网中保留着一份可贵的赤诚。",
      Responsibility: "在重大抉择面前偶尔会陷入温柔的迟疑。",
      Resilience: "在遭遇重创后需要一段静谧的时光来重塑自我。",
      Passion: "在奔波中偶尔会短暂地丢失那份对生活的热望。",
      Inclusivity: "对某些执念依然保留着少年般的偏执。",
      Acceptance: "在自我审视时偶尔会陷入追求完美的迷宫。"
    };

    const getDimensionInterpretation = (scores: Record<Type.Dimension, number>) => {
      const highDims = Object.entries(scores).filter(([_, s]) => s > 3).map(([d]) => dimNames[d as Type.Dimension]);
      const lowDims = Object.entries(scores).filter(([_, s]) => s < 2.5).map(([d]) => dimNames[d as Type.Dimension]);
      
      let text = "";
      if (highDims.length > 0) {
        text += `你在${highDims.join('、')}维度上表现出极高的成熟度，这构成了你人格的坚实底色。`;
      }
      if (lowDims.length > 0) {
        text += `而在${lowDims.join('、')}方面，你依然保留着一份难得的纯真与探索空间，这是成长的阵痛，也是生命力的源泉。`;
      } else {
        text += `你的各项心智维度发展均衡，展现出一种圆融且成熟的生命状态。`;
      }
      return text;
    };

    const personalitySketch = `你的心理状态正处于充满活力的阶段。你对世界有自己的看法，渴望表达，渴望被认可。你在“${dimNames[maxDim]}”上表现突出，这让你在处理复杂问题时游刃有余。但在“${dimNames[minDim]}”方面，内心还住着一个纯真的孩子，这种反差正是你独特魅力的来源。你可能时常感到迷茫和纠结，在理想与现实之间反复横跳，但那正是你独立人格觉醒的标志。`;
    
    const getAgeGapAnalysis = (real: number, psych: number) => {
      const diff = psych - real;
      if (diff <= -10) return "你的内心住着一个纯真无邪的灵魂。即便身体在成长，你依然保留着对世界最初的好奇与善意，这种‘逆生长’是你最宝贵的财富。";
      if (diff < 0) return "你拥有极佳的心理弹性。你既能应对成年世界的规则，又能在私下里保持一颗轻盈的心。这种‘少年感’让你在压力面前更具韧性。";
      if (diff === 0) return "你的心智发育与生理年龄完美契合。你正处在人生最协调的状态，能够以最恰当的姿态面对当下的生活阶段。";
      if (diff <= 10) return "你比同龄人表现出更多的沉稳与远见。你似乎提前领悟了一些人生的智慧，这让你在决策时更加冷静，是身边人眼中可靠的依靠。";
      return "你拥有一颗‘老灵魂’。你对世界的洞察深邃且超然，那些困扰同龄人的琐事在你眼中或许早已云淡风轻。这种成熟让你在精神世界里走得更远。";
    };

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
      dimensionScores: radarScores,
      personalitySketch: realAge 
        ? `${personalitySketch} ${getAgeGapAnalysis(realAge, Math.round(psychAge))}`
        : personalitySketch,
      growthAdvice,
      strengths: strengths.length > 0 ? strengths : ["适应力强", "乐于学习", "内心善良"],
      blindSpots: blindSpots.length > 0 ? blindSpots : ["偶尔过度思考", "对自己要求过高"],
      tags: tags.length > 0 ? tags : ["#探索者", "#真实", "#成长中"],
      dimensionInterpretation: getDimensionInterpretation(dimensionAverages)
    } as any;

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
              <div className="text-center space-y-6">
                <div className="inline-block px-4 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] md:text-xs font-medium tracking-widest uppercase border border-emerald-500/20">
                  测试完成
                </div>
                <h1 className="text-3xl md:text-4xl font-light tracking-tight">心智图谱报告</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Psychological Age Card */}
                  <div className="bg-white rounded-[32px] p-8 text-black shadow-xl shadow-emerald-500/10 border border-white/20">
                    <p className="text-gray-400 text-sm mb-2">心智成熟度</p>
                    <div className="text-7xl font-bold text-indigo-600 tracking-tighter">
                      {result.psychologicalAge}
                    </div>
                    <p className="text-indigo-400 text-sm mt-1">Level</p>
                  </div>

                  {/* Comparison Icon */}
                  {result.realAge && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                      <div className="bg-white rounded-full p-3 shadow-lg border border-gray-100">
                        {result.psychologicalAge < result.realAge ? (
                          <Sparkles className="w-8 h-8 text-amber-500" />
                        ) : (
                          <Brain className="w-8 h-8 text-indigo-500" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Real Age Card */}
                  <div className="bg-white rounded-[32px] p-8 text-black shadow-xl shadow-gray-500/5 border border-white/20">
                    <p className="text-gray-400 text-sm mb-2">生理年轮</p>
                    <div className="text-7xl font-bold text-slate-800 tracking-tighter">
                      {result.realAge || '--'}
                    </div>
                    <p className="text-slate-400 text-sm mt-1">Years</p>
                  </div>
                </div>

                {result.realAge && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20 inline-block px-8"
                  >
                    <p className="text-sm text-indigo-300 font-medium">
                      你的灵魂比肉体{result.psychologicalAge < result.realAge ? '更轻盈' : '更厚重'} 
                      {Math.abs(result.realAge - result.psychologicalAge)} 个刻度，
                      {result.psychologicalAge < result.realAge ? '这是一种难得的生命灵性。' : '这赋予了你洞穿迷雾的深邃。'}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Deep Analysis Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                  <h2 className="text-2xl font-medium">心智结构剖析</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <Award className="w-5 h-5" />
                      <span className="font-medium">光芒特质</span>
                    </div>
                    <ul className="space-y-3">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Blind Spots */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-orange-400 mb-4">
                      <RotateCcw className="w-5 h-5" />
                      <span className="font-medium">演化契机</span>
                    </div>
                    <ul className="space-y-3">
                      {result.blindSpots.map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dimension Interpretation */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                  <h3 className="text-white/40 text-xs uppercase tracking-widest mb-4">多维视角解读</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    {(result as any).dimensionInterpretation}
                  </p>
                </div>
              </div>

              {/* Personality Deep Analysis */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                  <h2 className="text-2xl font-medium">灵魂深度漫谈</h2>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                  <p className="text-white/80 leading-relaxed text-lg font-light">
                    {result.personalitySketch}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-white/40 text-xs uppercase tracking-widest">性格印记</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag, i) => (
                        <span key={i} className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <h4 className="text-white/40 text-xs uppercase tracking-widest text-center mb-8">心智维度分布</h4>
                    <RadarChartComponent data={[
                      { subject: '求知欲', A: result.dimensionScores.Curiosity, fullMark: 100 },
                      { subject: '情绪韧性', A: result.dimensionScores.Stability, fullMark: 100 },
                      { subject: '社交共情', A: result.dimensionScores.Social, fullMark: 100 },
                      { subject: '意志担当', A: result.dimensionScores.Responsibility, fullMark: 100 },
                      { subject: '复原力', A: result.dimensionScores.Resilience, fullMark: 100 },
                      { subject: '生命热情', A: result.dimensionScores.Passion, fullMark: 100 },
                      { subject: '精神包容', A: result.dimensionScores.Inclusivity, fullMark: 100 },
                      { subject: '自我整合', A: result.dimensionScores.Acceptance, fullMark: 100 },
                    ]} />
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
