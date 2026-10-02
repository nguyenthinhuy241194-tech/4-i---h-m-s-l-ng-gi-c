import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Trophy,
  Clock,
  RotateCcw,
  FileCode,
  Download,
  Copy,
  Check,
  BookOpen,
  Award,
  Sparkles,
  Zap,
  Target,
  Crown
} from 'lucide-react';
import { QUESTIONS_POOL, TOPIC_SUMMARY, Question } from './data/questions';
import { sounds } from './utils/audio';
import { generateSingleHtmlSource } from './utils/singleHtmlExport';
import { MathView, RichMathText } from './components/MathView';

interface PlayerInfo {
  id: number;
  name: string;
  shortName: string;
  keyLabel: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  badgeBg: string;
  scoreColor: string;
}

const PLAYERS: PlayerInfo[] = [
  {
    id: 0,
    name: 'Player 1',
    shortName: 'P1 · ĐỎ',
    keyLabel: 'PHÍM W',
    color: '#ef4444',
    borderColor: 'border-red-500',
    bgGradient: 'from-red-950/60 to-slate-900',
    badgeBg: 'bg-red-500 text-white',
    scoreColor: 'text-red-400'
  },
  {
    id: 1,
    name: 'Player 2',
    shortName: 'P2 · XANH DƯƠNG',
    keyLabel: 'PHÍM I',
    color: '#3b82f6',
    borderColor: 'border-blue-500',
    bgGradient: 'from-blue-950/60 to-slate-900',
    badgeBg: 'bg-blue-500 text-white',
    scoreColor: 'text-blue-400'
  },
  {
    id: 2,
    name: 'Player 3',
    shortName: 'P3 · XANH LÁ',
    keyLabel: 'PHÍM C',
    color: '#10b981',
    borderColor: 'border-emerald-500',
    bgGradient: 'from-emerald-950/60 to-slate-900',
    badgeBg: 'bg-emerald-500 text-white',
    scoreColor: 'text-emerald-400'
  },
  {
    id: 3,
    name: 'Player 4',
    shortName: 'P4 · VÀNG',
    keyLabel: 'PHÍM N / ↑',
    color: '#f59e0b',
    borderColor: 'border-amber-500',
    bgGradient: 'from-amber-950/60 to-slate-900',
    badgeBg: 'bg-amber-500 text-white',
    scoreColor: 'text-amber-400'
  }
];

export default function App() {
  // Game loop state
  const [gameState, setGameState] = useState<'IDLE' | 'COUNTDOWN' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [matchDuration, setMatchDuration] = useState<number>(300); // 5 phút (300 giây)
  const [countdownNum, setCountdownNum] = useState(3);
  const [timeLeft, setTimeLeft] = useState(300);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [activeBuzzer, setActiveBuzzer] = useState<number | null>(null);
  const [frozenPlayers, setFrozenPlayers] = useState<boolean[]>([false, false, false, false]);
  const [answerTimeLeft, setAnswerTimeLeft] = useState<number>(5);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerOutcome, setAnswerOutcome] = useState<'correct' | 'wrong' | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('BẤM CHUÔNG ĐỂ GIÀNH QUYỀN TRẢ LỜI!');
  const [isMuted, setIsMuted] = useState(false);

  const TARGET_SCORE = 15;

  // Format mm:ss helper
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Modals
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);
  const [singleHtmlCode, setSingleHtmlCode] = useState('');
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Deck
  const deckRef = useRef<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // Timers
  const gameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleMute = () => {
    sounds.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  const shuffleDeck = () => {
    deckRef.current = [...QUESTIONS_POOL].sort(() => Math.random() - 0.5);
  };

  // Start 3-2-1 Countdown
  const triggerStartCountdown = (duration = matchDuration) => {
    setScores([0, 0, 0, 0]);
    setTimeLeft(duration);
    setActiveBuzzer(null);
    setFrozenPlayers([false, false, false, false]);
    setSelectedOption(null);
    setGameState('COUNTDOWN');
    setCountdownNum(3);
    sounds.playBeep();

    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdownNum(count);
        sounds.playBeep();
      } else if (count === 0) {
        setCountdownNum(0); // "CHIẾN!"
        sounds.playGo();
      } else {
        clearInterval(interval);
        setGameState('PLAYING');
        shuffleDeck();
        loadNextQuestion();
      }
    }, 900);
  };

  // 60-Second Match Countdown
  useEffect(() => {
    if (gameState === 'PLAYING') {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(gameTimerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    }
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [gameState]);

  // Load next question
  const loadNextQuestion = useCallback(() => {
    if (deckRef.current.length === 0) {
      shuffleDeck();
    }
    const q = deckRef.current.pop() || QUESTIONS_POOL[0];
    setCurrentQuestion(q);
    setActiveBuzzer(null);
    setFrozenPlayers([false, false, false, false]);
    setSelectedOption(null);
    setAnswerOutcome(null);
    setStatusMessage('🔔 BẤM CHUÔNG ĐỂ GIÀNH QUYỀN TRẢ LỜI!');
  }, []);

  // Player Buzzes In
  const handlePlayerBuzz = useCallback((playerIdx: number) => {
    if (gameState !== 'PLAYING') return;
    if (activeBuzzer !== null) return;
    if (frozenPlayers[playerIdx]) return;

    sounds.playBuzzer(playerIdx);
    setActiveBuzzer(playerIdx);
    setSelectedOption(null);
    setAnswerOutcome(null);
    setAnswerTimeLeft(5);
    setStatusMessage(`⚡ ${PLAYERS[playerIdx].shortName} ĐÃ BẤM CHUÔNG! HÃY CHỌN ĐÁP ÁN (5s)`);

    // 5-second countdown to answer
    if (answerTimerRef.current) clearInterval(answerTimerRef.current);
    answerTimerRef.current = setInterval(() => {
      setAnswerTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(answerTimerRef.current!);
          // Timeout = treat as wrong answer
          handleOptionSelect(-1, playerIdx);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [gameState, activeBuzzer, frozenPlayers]);

  // Option selection
  const handleOptionSelect = useCallback((optIdx: number, overridePlayerIdx?: number) => {
    const pIdx = overridePlayerIdx !== undefined ? overridePlayerIdx : activeBuzzer;
    if (pIdx === null || !currentQuestion) return;

    if (answerTimerRef.current) clearInterval(answerTimerRef.current);
    setSelectedOption(optIdx);

    const isCorrect = optIdx === currentQuestion.correctIndex;

    if (isCorrect) {
      setAnswerOutcome('correct');
      sounds.playCorrect();
      setScores((prev) => {
        const next = [...prev];
        next[pIdx] += 1;
        // Check TARGET_SCORE (15 points) victory
        if (next[pIdx] >= TARGET_SCORE) {
          setTimeout(() => {
            setGameState('GAME_OVER');
            sounds.playVictory();
          }, 600);
        }
        return next;
      });

      setStatusMessage(`🎉 CHÍNH XÁC! ${PLAYERS[pIdx].shortName} ĐƯỢC +1 ĐIỂM!`);
      setTimeout(() => {
        loadNextQuestion();
      }, 1600);
    } else {
      // Trả lời SAI: TUYỆT ĐỐI KHÔNG HIỂN THỊ ĐÁP ÁN ĐÚNG
      setAnswerOutcome('wrong');
      sounds.playWrong();
      setScores((prev) => {
        const next = [...prev];
        next[pIdx] = Math.max(0, next[pIdx] - 1);
        return next;
      });

      setFrozenPlayers((prev) => {
        const next = [...prev];
        next[pIdx] = true;
        // Check if all players failed
        if (next.every((f) => f)) {
          // Cả 4 đội đều sai: chuyển câu tiếp theo mà KHÔNG hiện đáp án đúng
          setStatusMessage(`❌ CẢ 4 ĐỘI ĐỀU CHƯA ĐÚNG! CHUYỂN CÂU HỎI TIẾP THEO...`);
          setTimeout(() => {
            loadNextQuestion();
          }, 1800);
        } else {
          // Còn đội khác: sau 0.5s bỏ highlight đỏ và mở lại chuông cho các đội còn lại
          setTimeout(() => {
            setSelectedOption(null);
            setAnswerOutcome(null);
            setActiveBuzzer(null);
            setStatusMessage(`⚠️ ${PLAYERS[pIdx].shortName} TRẢ LỜI CHƯA ĐÚNG (-1đ)! CÁC ĐỘI CÒN LẠI BẤM CHUÔNG!`);
          }, 600);
        }
        return next;
      });
    }
  }, [activeBuzzer, currentQuestion, loadNextQuestion]);

  // When timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'PLAYING') {
      setGameState('GAME_OVER');
      sounds.playVictory();
    }
  }, [timeLeft, gameState]);

  // Global Keyboard Listener: W, I, C, N/ArrowUp for buzzing; 1, 2, 3, 4 for answering
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;

      const key = e.key.toUpperCase();

      if (activeBuzzer === null) {
        // Buzzer Keys
        if (key === 'W') handlePlayerBuzz(0);
        if (key === 'I') handlePlayerBuzz(1);
        if (key === 'C') handlePlayerBuzz(2);
        if (key === 'N' || e.key === 'ArrowUp') handlePlayerBuzz(3);
      } else {
        // Answering Keys (1, 2, 3, 4 or A, B, C, D)
        if (key === '1' || key === 'A') handleOptionSelect(0);
        if (key === '2' || key === 'B') handleOptionSelect(1);
        if (key === '3' || key === 'C') handleOptionSelect(2);
        if (key === '4' || key === 'D') handleOptionSelect(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, activeBuzzer, handlePlayerBuzz, handleOptionSelect]);

  // Handle single HTML Export
  const handleOpenCodeModal = () => {
    const code = generateSingleHtmlSource();
    setSingleHtmlCode(code);
    setShowCodeModal(true);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(singleHtmlCode);
      setHasCopiedCode(true);
      setTimeout(() => setHasCopiedCode(false), 2000);
    } catch {}
  };

  const handleDownloadHtml = () => {
    const code = singleHtmlCode || generateSingleHtmlSource();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dau-truong-luong-giac-4p.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Find Winner
  const rankedPlayers = [0, 1, 2, 3].sort((a, b) => scores[b] - scores[a]);
  const winnerIdx = rankedPlayers[0];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-2 sm:p-4 select-none relative overflow-hidden font-sans">
      {/* Top Navbar */}
      <nav className="w-full max-w-6xl flex items-center justify-between px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md mb-2 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20">
            ⚡
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>ĐẤU TRƯỜNG LƯỢNG GIÁC 4P</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Toán 11 KNTT
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCheatSheet(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Kiến thức hàm số</span>
          </button>

          <button
            onClick={handleOpenCodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-bold rounded-xl text-xs border border-emerald-700/50 transition-colors cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Xuất 1 File HTML</span>
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer border border-slate-700"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </nav>

      {/* Main 4-Player Layout */}
      <div className="w-full max-w-6xl flex-1 grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-3 relative z-10">
        {/* PLAYER 1: TOP-LEFT (RED) */}
        <div
          className={`flex flex-col justify-between p-4 rounded-3xl border-3 transition-all duration-200 ${PLAYERS[0].borderColor} bg-gradient-to-br ${PLAYERS[0].bgGradient} ${
            activeBuzzer === 0 ? 'ring-4 ring-red-400 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-[1.02]' : 'shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${PLAYERS[0].badgeBg}`}>
              {PLAYERS[0].shortName}
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-white/10 text-slate-200 border border-white/10">
              {PLAYERS[0].keyLabel}
            </span>
          </div>

          <div className="text-center my-2">
            <div className="text-5xl font-black font-mono text-red-400 leading-none">
              {scores[0]}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ĐIỂM SỐ</div>
          </div>

          <button
            disabled={activeBuzzer !== null || frozenPlayers[0] || gameState !== 'PLAYING'}
            onClick={() => handlePlayerBuzz(0)}
            className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
              frozenPlayers[0]
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 border border-red-400/50 shadow-red-900/40'
            }`}
          >
            <span>BẤM CHUÔNG</span>
            <span className="text-[10px] opacity-75 font-normal">Nhấn W hoặc Chạm</span>
          </button>
        </div>

        {/* CENTER ARENA (SPANS 2 COLS ON DESKTOP) */}
        <div className="md:col-span-2 md:row-span-2 bg-slate-900/90 border-3 border-slate-700/80 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative">
          {/* Header Info */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Mục tiêu: Đua đến 15 điểm</span>
            </div>
            <div className={`px-3 py-1 rounded-full font-mono font-bold text-sm flex items-center gap-1.5 border ${
              timeLeft <= 30 ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse' : 'bg-slate-800 text-slate-200 border-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Display Screen */}
          <div className="my-auto py-3">
            {currentQuestion ? (
              <div className="text-center flex flex-col items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {currentQuestion.topic}
                </span>

                <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug max-w-lg">
                  <RichMathText text={currentQuestion.question} />
                </h2>

                {currentQuestion.mathFormula && (
                  <div className="px-4 py-2 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-blue-300 text-lg sm:text-xl font-bold">
                    <MathView math={currentQuestion.mathFormula} displayMode={true} />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-400 font-bold py-8">
                Đang chuẩn bị câu hỏi...
              </div>
            )}

            {/* Options 2x2 Grid */}
            {currentQuestion && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                {currentQuestion.options.map((opt, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;
                  const canClick = activeBuzzer !== null && selectedOption === null;

                  let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-blue-400';
                  let prefixStyle = 'bg-slate-700 text-slate-300';

                  if (selectedOption !== null) {
                    if (answerOutcome === 'correct' && isCorrect) {
                      // Chỉ hiện màu xanh khi người chơi trả lời ĐÚNG
                      btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-400';
                      prefixStyle = 'bg-emerald-500 text-white';
                    } else if (answerOutcome === 'wrong' && isSelected) {
                      // Đội trả lời sai: Chỉ hiện màu đỏ tại đáp án sai đã chọn, KHÔNG hiện đáp án đúng
                      btnStyle = 'bg-red-950 border-red-500 text-red-200';
                      prefixStyle = 'bg-red-500 text-white';
                    } else {
                      btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-300';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={!canClick}
                      onClick={() => handleOptionSelect(idx)}
                      className={`p-3 rounded-2xl border-2 text-left font-semibold text-sm flex items-center gap-2.5 transition-all cursor-pointer ${btnStyle} ${
                        !canClick ? 'opacity-85' : 'hover:scale-[1.01]'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${prefixStyle}`}>
                        {letters[idx]}
                      </span>
                      <span className="flex-1 overflow-x-auto py-0.5">
                        <MathView math={opt} displayMode={false} className="text-[15px]" />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Buzzer Status Banner */}
          <div
            className={`p-3 rounded-2xl border text-center font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeBuzzer !== null
                ? `${PLAYERS[activeBuzzer].borderColor} bg-slate-800 text-white shadow-lg`
                : 'border-slate-700 bg-slate-800/50 text-slate-300'
            }`}
          >
            {activeBuzzer !== null ? (
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{statusMessage}</span>
                <span className="font-mono text-amber-400 font-black">({answerTimeLeft}s)</span>
              </span>
            ) : (
              <span>{statusMessage}</span>
            )}
          </div>

          {/* START OVERLAY */}
          {gameState === 'IDLE' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-30">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-3xl font-black shadow-xl shadow-amber-500/30 mb-3 animate-bounce">
                ⚡
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">
                ĐẤU TRƯỜNG LƯỢNG GIÁC 4P
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Ngân hàng 32 câu hỏi Hàm số lượng giác Toán 11 (KNTT)</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-4 leading-relaxed">
                Đấu chuông 4 người cùng lúc trên 1 máy. Người đạt <strong>15 điểm</strong> trước hoặc cao điểm nhất khi hết thời gian sẽ giành chức Vô địch!
              </p>

              {/* Match duration selector */}
              <div className="flex items-center gap-2 mb-4 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 px-2 uppercase">Thời lượng:</span>
                {[
                  { label: '5 Phút (Chuẩn)', value: 300 },
                  { label: '3 Phút', value: 180 },
                  { label: '1 Phút', value: 60 }
                ].map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setMatchDuration(d.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      matchDuration === d.value
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs font-mono font-bold mb-5">
                <span className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">P1: Phím W</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">P2: Phím I</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">P3: Phím C</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">P4: Phím N hoặc ↑</span>
              </div>
              <button
                onClick={() => triggerStartCountdown(matchDuration)}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-2xl text-base shadow-xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                BẮT ĐẦU TRẬN ĐẤU NGAY ({Math.floor(matchDuration / 60)} PHÚT)
              </button>
            </div>
          )}

          {/* COUNTDOWN 3-2-1 OVERLAY */}
          {gameState === 'COUNTDOWN' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-30">
              <div className="text-8xl font-black font-mono text-amber-400 animate-pulse drop-shadow-[0_0_35px_rgba(251,191,36,0.6)]">
                {countdownNum === 0 ? 'CHIẾN!' : countdownNum}
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-4">
                CHUẨN BỊ BẤM CHUÔNG...
              </div>
            </div>
          )}

          {/* GAME OVER / VICTORY OVERLAY */}
          {gameState === 'GAME_OVER' && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-5 text-center z-30 overflow-y-auto">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-3xl shadow-lg mb-2">
                👑
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">
                {PLAYERS[winnerIdx].shortName} VÔ ĐỊCH!
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Tổng kết điểm số trận đấu 4 người
              </p>

              {/* Podium */}
              <div className="grid grid-cols-4 gap-2 w-full max-w-sm mb-4">
                {rankedPlayers.map((pIdx, rank) => {
                  const medals = ['🥇', '🥈', '🥉', '🎖️'];
                  return (
                    <div
                      key={pIdx}
                      className={`p-2.5 rounded-2xl border-2 bg-slate-900 flex flex-col items-center gap-1 ${PLAYERS[pIdx].borderColor}`}
                    >
                      <span className="text-xl">{medals[rank]}</span>
                      <span className={`text-[10px] font-black uppercase ${PLAYERS[pIdx].scoreColor}`}>
                        P{pIdx + 1}
                      </span>
                      <span className="text-lg font-black font-mono text-white">
                        {scores[pIdx]}đ
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Knowledge cheatsheet preview */}
              <div className="w-full max-w-md bg-white/5 border border-slate-800 rounded-2xl p-3 text-left text-xs text-slate-300 mb-5 leading-relaxed">
                <div className="font-extrabold text-blue-400 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lý thuyết cốt lõi Hàm số lượng giác (Toán 11):</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-slate-400">
                  <li><strong>y = sin x & y = cos x:</strong> TXĐ D = ℝ; TGT [-1; 1]; Chu kì T = 2π.</li>
                  <li><strong>y = cos x:</strong> Là hàm số CHẴN (đối xứng qua Oy).</li>
                  <li><strong>y = sin x, tan x, cot x:</strong> Đều là hàm số LẺ (đối xứng qua O).</li>
                  <li><strong>y = tan x:</strong> TXĐ D = ℝ \ {"{π/2 + kπ}"}; T = π.</li>
                  <li><strong>y = cot x:</strong> TXĐ D = ℝ \ {"{kπ}"}; T = π.</li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => triggerStartCountdown(matchDuration)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại trận mới</span>
                </button>

                <button
                  onClick={handleOpenCodeModal}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất file HTML đơn</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PLAYER 2: TOP-RIGHT (BLUE) */}
        <div
          className={`flex flex-col justify-between p-4 rounded-3xl border-3 transition-all duration-200 ${PLAYERS[1].borderColor} bg-gradient-to-br ${PLAYERS[1].bgGradient} ${
            activeBuzzer === 1 ? 'ring-4 ring-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-[1.02]' : 'shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${PLAYERS[1].badgeBg}`}>
              {PLAYERS[1].shortName}
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-white/10 text-slate-200 border border-white/10">
              {PLAYERS[1].keyLabel}
            </span>
          </div>

          <div className="text-center my-2">
            <div className="text-5xl font-black font-mono text-blue-400 leading-none">
              {scores[1]}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ĐIỂM SỐ</div>
          </div>

          <button
            disabled={activeBuzzer !== null || frozenPlayers[1] || gameState !== 'PLAYING'}
            onClick={() => handlePlayerBuzz(1)}
            className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
              frozenPlayers[1]
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 border border-blue-400/50 shadow-blue-900/40'
            }`}
          >
            <span>BẤM CHUÔNG</span>
            <span className="text-[10px] opacity-75 font-normal">Nhấn I hoặc Chạm</span>
          </button>
        </div>

        {/* PLAYER 3: BOTTOM-LEFT (GREEN) */}
        <div
          className={`flex flex-col justify-between p-4 rounded-3xl border-3 transition-all duration-200 ${PLAYERS[2].borderColor} bg-gradient-to-br ${PLAYERS[2].bgGradient} ${
            activeBuzzer === 2 ? 'ring-4 ring-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-[1.02]' : 'shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${PLAYERS[2].badgeBg}`}>
              {PLAYERS[2].shortName}
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-white/10 text-slate-200 border border-white/10">
              {PLAYERS[2].keyLabel}
            </span>
          </div>

          <div className="text-center my-2">
            <div className="text-5xl font-black font-mono text-emerald-400 leading-none">
              {scores[2]}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ĐIỂM SỐ</div>
          </div>

          <button
            disabled={activeBuzzer !== null || frozenPlayers[2] || gameState !== 'PLAYING'}
            onClick={() => handlePlayerBuzz(2)}
            className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
              frozenPlayers[2]
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 border border-emerald-400/50 shadow-emerald-900/40'
            }`}
          >
            <span>BẤM CHUÔNG</span>
            <span className="text-[10px] opacity-75 font-normal">Nhấn C hoặc Chạm</span>
          </button>
        </div>

        {/* PLAYER 4: BOTTOM-RIGHT (YELLOW) */}
        <div
          className={`flex flex-col justify-between p-4 rounded-3xl border-3 transition-all duration-200 ${PLAYERS[3].borderColor} bg-gradient-to-br ${PLAYERS[3].bgGradient} ${
            activeBuzzer === 3 ? 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-[1.02]' : 'shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${PLAYERS[3].badgeBg}`}>
              {PLAYERS[3].shortName}
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-white/10 text-slate-200 border border-white/10">
              {PLAYERS[3].keyLabel}
            </span>
          </div>

          <div className="text-center my-2">
            <div className="text-5xl font-black font-mono text-amber-400 leading-none">
              {scores[3]}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ĐIỂM SỐ</div>
          </div>

          <button
            disabled={activeBuzzer !== null || frozenPlayers[3] || gameState !== 'PLAYING'}
            onClick={() => handlePlayerBuzz(3)}
            className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
              frozenPlayers[3]
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 border border-amber-400/50 shadow-amber-900/40'
            }`}
          >
            <span>BẤM CHUÔNG</span>
            <span className="text-[10px] opacity-75 font-normal">Nhấn N / ↑ hoặc Chạm</span>
          </button>
        </div>
      </div>

      {/* FORMULA CHEATSHEET MODAL */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border-2 border-slate-700 flex flex-col gap-4 text-slate-100">
            <div className="flex items-center justify-between border-b pb-3 border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-extrabold text-white">
                  Lý Thuyết Hàm Số Lượng Giác - Toán 11 (KNTT)
                </h3>
              </div>
              <button
                onClick={() => setShowCheatSheet(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {TOPIC_SUMMARY.map((sec, sIdx) => (
                <div key={sIdx} className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700">
                  <h4 className="font-extrabold text-white text-sm mb-3 text-blue-400">
                    {sec.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {sec.items.map((item, iIdx) => (
                      <div key={iIdx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{item.name}</span>
                        <div className="overflow-x-auto py-1">
                          <MathView math={item.latex} displayMode={false} className="text-[15px] font-semibold text-slate-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowCheatSheet(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SINGLE FILE HTML MODAL */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border-2 border-emerald-500/50 flex flex-col gap-4 text-slate-100">
            <div className="flex items-center justify-between border-b pb-3 border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    Mã Nguồn Một File HTML Duy Nhất
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bao gồm HTML, CSS, JavaScript inline, âm thanh Web Audio và font KaTeX chuẩn. Chạy offline trên mọi trình duyệt.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                {hasCopiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{hasCopiedCode ? 'Đã sao chép!' : 'Sao chép mã'}</span>
              </button>

              <button
                onClick={handleDownloadHtml}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải file .html về máy</span>
              </button>
            </div>

            <div className="relative bg-slate-950 rounded-2xl p-4 overflow-hidden text-xs font-mono text-emerald-400 max-h-96 overflow-y-auto border border-slate-800">
              <pre className="whitespace-pre-wrap select-text">{singleHtmlCode}</pre>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <span>Đầy đủ 14+ câu hỏi, phím W - I - C - N/↑, đếm ngược 3-2-1, vinh danh pháo hoa.</span>
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
