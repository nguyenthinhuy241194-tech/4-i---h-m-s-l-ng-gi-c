import { QUESTIONS_POOL, TOPIC_SUMMARY } from '../data/questions';

export function generateSingleHtmlSource(): string {
  const jsonQuestions = JSON.stringify(QUESTIONS_POOL, null, 2);
  const jsonSummary = JSON.stringify(TOPIC_SUMMARY, null, 2);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đấu Trường Lượng Giác 4P - Bấm Chuông Tranh Tài (5 Phút)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
  <!-- KaTeX for Standard Mathematical Typography -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>

  <style>
    :root {
      --p1-color: #ef4444;
      --p2-color: #3b82f6;
      --p3-color: #10b981;
      --p4-color: #f59e0b;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      user-select: none;
      -webkit-user-select: none;
    }

    body {
      background: #090d16;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      color: #f8fafc;
      overflow-x: hidden;
    }

    .main-grid {
      width: 100%;
      max-width: 1100px;
      height: 96vh;
      max-height: 840px;
      display: grid;
      grid-template-columns: 240px 1fr 240px;
      grid-template-rows: 1fr 1fr;
      gap: 12px;
      position: relative;
    }

    @media (max-width: 900px) {
      .main-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto;
        height: auto;
        max-height: none;
      }
      .center-arena {
        grid-column: span 2;
        order: 2;
        min-height: 380px;
      }
      .player-card.p1 { order: 1; }
      .player-card.p2 { order: 1; }
      .player-card.p3 { order: 3; }
      .player-card.p4 { order: 3; }
    }

    /* 4 Player Corner Cards */
    .player-card {
      border-radius: 24px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 3px solid;
      background: #1e293b;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      transition: all 0.2s ease;
    }

    .player-card.active-buzzer {
      transform: scale(1.03);
      box-shadow: 0 0 35px var(--glow-color);
      animation: pulseBuzzer 0.8s infinite alternate;
    }

    @keyframes pulseBuzzer {
      from { border-color: var(--glow-color); }
      to { border-color: #ffffff; }
    }

    .player-card.p1 {
      border-color: var(--p1-color);
      --glow-color: var(--p1-color);
      background: linear-gradient(145deg, #1e1b2e 0%, #2a151b 100%);
    }
    .player-card.p2 {
      border-color: var(--p2-color);
      --glow-color: var(--p2-color);
      background: linear-gradient(145deg, #1b2038 0%, #13243f 100%);
    }
    .player-card.p3 {
      border-color: var(--p3-color);
      --glow-color: var(--p3-color);
      background: linear-gradient(145deg, #132b26 0%, #152c20 100%);
    }
    .player-card.p4 {
      border-color: var(--p4-color);
      --glow-color: var(--p4-color);
      background: linear-gradient(145deg, #2d2616 0%, #352614 100%);
    }

    .p-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .p-badge {
      font-size: 13px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .p1 .p-badge { background: var(--p1-color); color: white; }
    .p2 .p-badge { background: var(--p2-color); color: white; }
    .p3 .p-badge { background: var(--p3-color); color: white; }
    .p4 .p-badge { background: var(--p4-color); color: white; }

    .key-badge {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 4px 10px;
      border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 800;
      color: #f8fafc;
    }

    .p-score-box {
      text-align: center;
      margin: 10px 0;
    }

    .p-score-val {
      font-size: 44px;
      font-weight: 900;
      font-family: 'JetBrains Mono', monospace;
      line-height: 1;
      text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .p1 .p-score-val { color: #fca5a5; }
    .p2 .p-score-val { color: #93c5fd; }
    .p3 .p-score-val { color: #6ee7b7; }
    .p4 .p-score-val { color: #fde047; }

    .p-score-lbl {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      font-weight: 700;
      margin-top: 4px;
    }

    /* Giant Touch / Click Buzzer Button */
    .buzzer-btn {
      width: 100%;
      padding: 16px 12px;
      border-radius: 18px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      font-size: 16px;
      font-weight: 900;
      color: white;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.1s ease;
      box-shadow: 0 6px 0 rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3);
    }

    .buzzer-btn:active {
      transform: translateY(4px);
      box-shadow: 0 2px 0 rgba(0,0,0,0.4);
    }

    .p1 .buzzer-btn { background: linear-gradient(180deg, #ef4444 0%, #b91c1c 100%); }
    .p2 .buzzer-btn { background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); }
    .p3 .buzzer-btn { background: linear-gradient(180deg, #10b981 0%, #047857 100%); }
    .p4 .buzzer-btn { background: linear-gradient(180deg, #f59e0b 0%, #b45309 100%); }

    .buzzer-btn.locked {
      background: #475569 !important;
      border-color: #334155 !important;
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Center Arena */
    .center-arena {
      grid-column: 2;
      grid-row: span 2;
      background: #111827;
      border: 3px solid #334155;
      border-radius: 30px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }

    .arena-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #1f2937;
      padding-bottom: 12px;
    }

    .arena-title {
      font-size: 13px;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .arena-timer {
      background: #1e293b;
      border: 2px solid #334155;
      padding: 6px 14px;
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 17px;
      font-weight: 800;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .arena-timer.urgent {
      color: #ef4444;
      border-color: #ef4444;
      animation: blink 0.8s infinite;
    }

    @keyframes blink { 50% { opacity: 0.5; } }

    /* Question Screen */
    .question-screen {
      background: #0f172a;
      border: 2px solid #334155;
      border-radius: 20px;
      padding: 16px;
      margin: 10px 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .q-text {
      font-size: 16px;
      font-weight: 700;
      color: #f8fafc;
      line-height: 1.4;
    }

    .q-formula {
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      padding: 8px 14px;
      border-radius: 12px;
      font-size: 19px;
      color: #93c5fd;
      display: inline-block;
      margin: 0 auto;
    }

    /* Options 2x2 Grid */
    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }

    .opt-btn {
      background: #1e293b;
      border: 2px solid #334155;
      border-radius: 16px;
      padding: 12px 14px;
      font-size: 15px;
      font-weight: 600;
      color: #e2e8f0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.15s ease;
      text-align: left;
    }

    .opt-btn.enabled:hover {
      background: #334155;
      border-color: #60a5fa;
      transform: translateY(-2px);
    }

    .opt-btn.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .opt-prefix {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #334155;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 12px;
      flex-shrink: 0;
    }

    .opt-btn.correct {
      background: #064e3b !important;
      border-color: #10b981 !important;
      color: #a7f3d0 !important;
    }
    .opt-btn.correct .opt-prefix { background: #10b981; }

    .opt-btn.wrong {
      background: #7f1d1d !important;
      border-color: #ef4444 !important;
      color: #fecaca !important;
    }
    .opt-btn.wrong .opt-prefix { background: #ef4444; }

    /* Buzzer Status Banner */
    .buzzer-banner {
      background: #1e293b;
      border-radius: 16px;
      padding: 12px;
      text-align: center;
      font-weight: 800;
      font-size: 14px;
      border: 2px solid #334155;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .buzzer-banner.p1-turn { background: #7f1d1d; border-color: #ef4444; color: #fecaca; }
    .buzzer-banner.p2-turn { background: #1e3a8a; border-color: #3b82f6; color: #bfdbfe; }
    .buzzer-banner.p3-turn { background: #064e3b; border-color: #10b981; color: #a7f3d0; }
    .buzzer-banner.p4-turn { background: #78350f; border-color: #f59e0b; color: #fde68a; }

    /* Overlay Screens */
    .modal-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(6px);
      border-radius: 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: center;
      z-index: 50;
    }

    .btn-main {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 16px;
      font-size: 17px;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.5);
      transition: all 0.15s ease;
    }
    .btn-main:hover {
      transform: scale(1.05);
      background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%);
    }

    .podium-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      width: 100%;
      max-width: 520px;
      margin: 16px 0;
    }

    .podium-slot {
      background: #1e293b;
      border-radius: 16px;
      padding: 12px 8px;
      border: 2px solid #334155;
    }

    #fireworks-canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 45;
      border-radius: 28px;
    }
  </style>
</head>
<body>

  <div class="main-grid">
    <canvas id="fireworks-canvas"></canvas>

    <!-- PLAYER 1: GÓC TRÊN TRÁI (ĐỎ - PHÍM W) -->
    <div class="player-card p1" id="p1-card">
      <div class="p-header">
        <div class="p-badge">P1 · ĐỎ</div>
        <div class="key-badge">PHÍM: W</div>
      </div>
      <div class="p-score-box">
        <div class="p-score-val" id="p1-score">0</div>
        <div class="p-score-lbl">ĐIỂM SỐ</div>
      </div>
      <button class="buzzer-btn" id="p1-buzzer" onclick="playerBuzz(0)">
        <span>BẤM CHUÔNG</span>
        <span style="font-size: 11px; opacity: 0.85;">(Nhấn W hoặc Chạm)</span>
      </button>
    </div>

    <!-- PLAYER 2: GÓC TRÊN PHẢI (XANH DƯƠNG - PHÍM I) -->
    <div class="player-card p2" id="p2-card">
      <div class="p-header">
        <div class="p-badge">P2 · XANH DƯƠNG</div>
        <div class="key-badge">PHÍM: I</div>
      </div>
      <div class="p-score-box">
        <div class="p-score-val" id="p2-score">0</div>
        <div class="p-score-lbl">ĐIỂM SỐ</div>
      </div>
      <button class="buzzer-btn" id="p2-buzzer" onclick="playerBuzz(1)">
        <span>BẤM CHUÔNG</span>
        <span style="font-size: 11px; opacity: 0.85;">(Nhấn I hoặc Chạm)</span>
      </button>
    </div>

    <!-- ĐẤU TRƯỜNG TRUNG TÂM -->
    <div class="center-arena" id="center-arena">
      <div class="arena-top">
        <div class="arena-title">Hàm số lượng giác · Toán 11 KNTT (Đua 15đ)</div>
        <div class="arena-timer" id="arena-timer">⏱️ 05:00</div>
      </div>

      <!-- Màn hình câu hỏi -->
      <div class="question-screen">
        <div class="q-text" id="q-text">Đang tải câu hỏi...</div>
        <div class="q-formula" id="q-formula" style="display: none;"></div>
      </div>

      <!-- 4 Đáp án A - B - C - D -->
      <div class="options-grid" id="options-grid">
        <button class="opt-btn disabled" id="opt-0" onclick="chooseAnswer(0)">
          <span class="opt-prefix">A</span>
          <span class="opt-content" id="opt-text-0">Đáp án A</span>
        </button>
        <button class="opt-btn disabled" id="opt-1" onclick="chooseAnswer(1)">
          <span class="opt-prefix">B</span>
          <span class="opt-content" id="opt-text-1">Đáp án B</span>
        </button>
        <button class="opt-btn disabled" id="opt-2" onclick="chooseAnswer(2)">
          <span class="opt-prefix">C</span>
          <span class="opt-content" id="opt-text-2">Đáp án C</span>
        </button>
        <button class="opt-btn disabled" id="opt-3" onclick="chooseAnswer(3)">
          <span class="opt-prefix">D</span>
          <span class="opt-content" id="opt-text-3">Đáp án D</span>
        </button>
      </div>

      <!-- Trạng thái chuông -->
      <div class="buzzer-banner" id="buzzer-banner">
        🔔 BẤM CHUÔNG ĐỂ GIÀNH QUYỀN TRẢ LỜI!
      </div>

      <!-- Màn hình Chào mừng (Start) -->
      <div class="modal-overlay" id="overlay-start">
        <h2 style="font-size: 26px; font-weight: 900; color: #fde047; margin-bottom: 4px;">
          ĐẤU TRƯỜNG LƯỢNG GIÁC 4P
        </h2>
        <div style="background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 800; color: #93c5fd; margin-bottom: 12px;">
          ✨ Ngân hàng 32 câu hỏi Hàm số lượng giác (Toán 11 KNTT)
        </div>
        <p style="font-size: 14px; color: #94a3b8; max-width: 460px; line-height: 1.5; margin-bottom: 16px;">
          Tranh tài 4 người cùng lúc trên 1 máy trong <strong>5 phút</strong>. Người đạt <strong>15 điểm</strong> trước hoặc cao điểm nhất khi hết giờ sẽ giành cúp Vô địch!
        </p>

        <div style="display: flex; gap: 8px; margin-bottom: 20px; font-size: 12px; font-weight: 800;">
          <span style="color: #f87171;">P1: [W]</span> · 
          <span style="color: #60a5fa;">P2: [I]</span> · 
          <span style="color: #34d399;">P3: [C]</span> · 
          <span style="color: #fbbf24;">P4: [N hoặc ↑]</span>
        </div>
        <button class="btn-main" onclick="startCountdown()">
          BẮT ĐẦU TRẬN ĐẤU (5 PHÚT)
        </button>
      </div>

      <!-- Màn hình Đếm ngược 3-2-1 -->
      <div class="modal-overlay" id="overlay-countdown" style="display: none;">
        <div style="font-size: 80px; font-weight: 900; color: #fde047; font-family: 'JetBrains Mono', monospace;" id="countdown-val">
          3
        </div>
        <div style="font-size: 18px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-top: 10px;">
          CHUẨN BỊ BẤM CHUÔNG...
        </div>
      </div>

      <!-- Màn hình Vinh danh Người thắng cuộc -->
      <div class="modal-overlay" id="overlay-end" style="display: none; max-height: 96%; overflow-y: auto;">
        <h2 style="font-size: 26px; font-weight: 900; color: #fde047;" id="winner-title">
          👑 PLAYER CHIẾN THẮNG!
        </h2>
        <p style="font-size: 13px; color: #94a3b8; margin: 4px 0 16px 0;">
          Tổng kết kết quả trận đấu 5 phút
        </p>

        <div class="podium-grid" id="podium-container"></div>

        <div style="background: rgba(255,255,255,0.06); border-radius: 14px; padding: 12px; text-align: left; font-size: 12px; line-height: 1.6; width: 100%; max-width: 500px; margin-bottom: 16px; border: 1px solid #334155;">
          <strong style="color: #60a5fa;">📚 Ghi nhớ Hàm số lượng giác Toán 11:</strong><br>
          • <strong>y = sin x & y = cos x:</strong> TXĐ D = ℝ; TGT [-1; 1]; Chu kì T = 2π.<br>
          • <strong>y = cos x:</strong> Là hàm số CHẴN (đối xứng qua trục Oy).<br>
          • <strong>y = sin x, tan x, cot x:</strong> Đều là hàm số LẺ (đối xứng qua gốc O).<br>
          • <strong>y = tan x:</strong> TXĐ D = ℝ \\ {π/2 + kπ}; TGT ℝ; Chu kì T = π.<br>
          • <strong>y = cot x:</strong> TXĐ D = ℝ \\ {kπ}; TGT ℝ; Chu kì T = π.
        </div>

        <button class="btn-main" onclick="startCountdown()">
          CHƠI LẠI TRẬN MỚI
        </button>
      </div>
    </div>

    <!-- PLAYER 3: GÓC DƯỚI TRÁI (XANH LÁ - PHÍM C) -->
    <div class="player-card p3" id="p3-card">
      <div class="p-header">
        <div class="p-badge">P3 · XANH LÁ</div>
        <div class="key-badge">PHÍM: C</div>
      </div>
      <div class="p-score-box">
        <div class="p-score-val" id="p3-score">0</div>
        <div class="p-score-lbl">ĐIỂM SỐ</div>
      </div>
      <button class="buzzer-btn" id="p3-buzzer" onclick="playerBuzz(2)">
        <span>BẤM CHUÔNG</span>
        <span style="font-size: 11px; opacity: 0.85;">(Nhấn C hoặc Chạm)</span>
      </button>
    </div>

    <!-- PLAYER 4: GÓC DƯỚI PHẢI (VÀNG - PHÍM N / MŨI TÊN LÊN) -->
    <div class="player-card p4" id="p4-card">
      <div class="p-header">
        <div class="p-badge">P4 · VÀNG</div>
        <div class="key-badge">PHÍM: N / ↑</div>
      </div>
      <div class="p-score-box">
        <div class="p-score-val" id="p4-score">0</div>
        <div class="p-score-lbl">ĐIỂM SỐ</div>
      </div>
      <button class="buzzer-btn" id="p4-buzzer" onclick="playerBuzz(3)">
        <span>BẤM CHUÔNG</span>
        <span style="font-size: 11px; opacity: 0.85;">(Nhấn N/↑ hoặc Chạm)</span>
      </button>
    </div>
  </div>

  <script>
    // NGÂN HÀNG 32 CÂU HỎI HÀM SỐ LƯỢNG GIÁC TOÁN 11 (KNTT 2018)
    const QUESTIONS = ${jsonQuestions};
    const SUMMARY = ${jsonSummary};

    // HỆ THỐNG HIỂN THỊ CÔNG THỨC TOÁN (KaTeX)
    function renderLatex(latex, isDisplay = false) {
      if (window.katex) {
        try {
          return window.katex.renderToString(latex, {
            throwOnError: false,
            displayMode: isDisplay,
            output: 'htmlAndMathml'
          });
        } catch(e) {}
      }
      return '<span>' + latex + '</span>';
    }

    function renderRichText(text) {
      return text.replace(/\\$([^$]+)\\$/g, (m, formula) => renderLatex(formula, false));
    }

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    // ÂM THANH ARCADE (Web Audio API Synthesizer)
    class SoundFX {
      constructor() { this.ctx = null; }
      init() {
        if (!this.ctx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) this.ctx = new AudioContextClass();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      }
      beep() {
        try {
          this.init();
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const now = this.ctx.currentTime;
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.15);
        } catch(e) {}
      }
      buzzer(pIdx) {
        try {
          this.init();
          if (!this.ctx) return;
          const now = this.ctx.currentTime;
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc1.type = 'sawtooth';
          osc2.type = 'square';
          const base = 440 + pIdx * 60;
          osc1.frequency.setValueAtTime(base, now);
          osc2.frequency.setValueAtTime(base * 1.5, now);
          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);
          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.28);
          osc2.stop(now + 0.28);
        } catch(e) {}
      }
      correct() {
        try {
          this.init();
          if (!this.ctx) return;
          const notes = [523.25, 659.25, 783.99, 1046.5];
          const now = this.ctx.currentTime;
          notes.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + i * 0.06;
            osc.frequency.setValueAtTime(f, t);
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.28);
          });
        } catch(e) {}
      }
      wrong() {
        try {
          this.init();
          if (!this.ctx) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.setValueAtTime(100, now + 0.1);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        } catch(e) {}
      }
      fanfare() {
        try {
          this.init();
          if (!this.ctx) return;
          const notes = [523.25, 659.25, 783.99, 1046.5];
          let elapsed = 0;
          const now = this.ctx.currentTime;
          notes.forEach((f) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + elapsed;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, start);
            gain.gain.setValueAtTime(0.3, start);
            gain.gain.exponentialRampToValueAtTime(0.01, start + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 0.25);
            elapsed += 0.12;
          });
        } catch(e) {}
      }
    }
    const sfx = new SoundFX();

    // DỮ LIỆU NGƯỜI CHƠI
    const PLAYERS = [
      { id: 0, name: 'P1 · ĐỎ', key: 'W', color: '#ef4444' },
      { id: 1, name: 'P2 · XANH DƯƠNG', key: 'I', color: '#3b82f6' },
      { id: 2, name: 'P3 · XANH LÁ', key: 'C', color: '#10b981' },
      { id: 3, name: 'P4 · VÀNG', key: 'N', color: '#f59e0b' }
    ];

    const TARGET_SCORE = 15;
    let scores = [0, 0, 0, 0];
    let timeLeft = 300; // 5 phút (300 giây)
    let isGameRunning = false;
    let activeBuzzerPlayer = null;
    let frozenPlayers = [false, false, false, false];
    let gameTimer = null;
    let answerInterval = null;
    let answerSecondsLeft = 5;

    let deck = [];
    let currentQ = null;

    function shuffle(a) {
      return [...a].sort(() => Math.random() - 0.5);
    }

    function startCountdown() {
      document.getElementById('overlay-start').style.display = 'none';
      document.getElementById('overlay-end').style.display = 'none';
      document.getElementById('overlay-countdown').style.display = 'flex';

      let count = 3;
      const countEl = document.getElementById('countdown-val');
      countEl.textContent = count;
      sfx.beep();

      const timer = setInterval(() => {
        count--;
        if (count > 0) {
          countEl.textContent = count;
          sfx.beep();
        } else if (count === 0) {
          countEl.textContent = 'CHIẾN!';
          sfx.fanfare();
        } else {
          clearInterval(timer);
          document.getElementById('overlay-countdown').style.display = 'none';
          initGame();
        }
      }, 900);
    }

    function initGame() {
      scores = [0, 0, 0, 0];
      timeLeft = 300; // 5 phút
      isGameRunning = true;
      deck = shuffle(QUESTIONS);
      activeBuzzerPlayer = null;
      frozenPlayers = [false, false, false, false];

      updateScoreUI();
      clearInterval(gameTimer);
      gameTimer = setInterval(tickGameTimer, 1000);

      loadNextQuestion();
    }

    function tickGameTimer() {
      if (!isGameRunning) return;
      timeLeft--;
      const timerEl = document.getElementById('arena-timer');
      timerEl.textContent = '⏱️ ' + formatTime(timeLeft);

      if (timeLeft <= 30) {
        timerEl.classList.add('urgent');
      } else {
        timerEl.classList.remove('urgent');
      }

      if (timeLeft <= 0) {
        timeLeft = 0;
        endGame();
      }
    }

    function updateScoreUI() {
      for (let i = 0; i < 4; i++) {
        document.getElementById('p' + (i+1) + '-score').textContent = scores[i];
      }
    }

    function loadNextQuestion() {
      if (!isGameRunning) return;

      if (deck.length === 0) {
        deck = shuffle(QUESTIONS);
      }
      currentQ = deck.pop();

      activeBuzzerPlayer = null;
      frozenPlayers = [false, false, false, false];
      clearInterval(answerInterval);

      document.getElementById('q-text').innerHTML = renderRichText(currentQ.question);
      const formulaEl = document.getElementById('q-formula');
      if (currentQ.mathFormula) {
        formulaEl.style.display = 'inline-block';
        formulaEl.innerHTML = renderLatex(currentQ.mathFormula, true);
      } else {
        formulaEl.style.display = 'none';
      }

      for (let i = 0; i < 4; i++) {
        const btn = document.getElementById('opt-' + i);
        btn.className = 'opt-btn disabled';
        document.getElementById('opt-text-' + i).innerHTML = renderLatex(currentQ.options[i], false);
      }

      for (let i = 0; i < 4; i++) {
        document.getElementById('p' + (i+1) + '-card').classList.remove('active-buzzer');
        document.getElementById('p' + (i+1) + '-buzzer').classList.remove('locked');
      }

      const banner = document.getElementById('buzzer-banner');
      banner.className = 'buzzer-banner';
      banner.innerHTML = '🔔 BẤM CHUÔNG ĐỂ GIÀNH QUYỀN TRẢ LỜI!';
    }

    // Bấm chuông giành quyền
    function playerBuzz(playerIdx) {
      if (!isGameRunning) return;
      if (activeBuzzerPlayer !== null) return;
      if (frozenPlayers[playerIdx]) return;

      activeBuzzerPlayer = playerIdx;
      sfx.buzzer(playerIdx);

      const card = document.getElementById('p' + (playerIdx+1) + '-card');
      card.classList.add('active-buzzer');

      for (let i = 0; i < 4; i++) {
        if (i !== playerIdx) {
          document.getElementById('p' + (i+1) + '-buzzer').classList.add('locked');
        }
      }

      for (let i = 0; i < 4; i++) {
        document.getElementById('opt-' + i).className = 'opt-btn enabled';
      }

      answerSecondsLeft = 5;
      const banner = document.getElementById('buzzer-banner');
      banner.className = 'buzzer-banner p' + (playerIdx+1) + '-turn';
      banner.innerHTML = '⚡ ' + PLAYERS[playerIdx].name + ' ĐÃ BẤM CHUÔNG! HÃY CHỌN ĐÁP ÁN (' + answerSecondsLeft + 's)';

      clearInterval(answerInterval);
      answerInterval = setInterval(() => {
        answerSecondsLeft--;
        if (answerSecondsLeft > 0) {
          banner.innerHTML = '⚡ ' + PLAYERS[playerIdx].name + ' ĐÃ BẤM CHUÔNG! HÃY CHỌN ĐÁP ÁN (' + answerSecondsLeft + 's)';
        } else {
          clearInterval(answerInterval);
          chooseAnswer(-1); // Hết giờ = tính là sai
        }
      }, 1000);
    }

    // Chọn đáp án
    function chooseAnswer(optIdx) {
      if (!isGameRunning || activeBuzzerPlayer === null) return;

      clearInterval(answerInterval);
      const isCorrect = optIdx === currentQ.correctIndex;
      const pIdx = activeBuzzerPlayer;

      const optBtn = document.getElementById('opt-' + optIdx);

      for (let i = 0; i < 4; i++) {
        document.getElementById('opt-' + i).className = 'opt-btn disabled';
      }

      const banner = document.getElementById('buzzer-banner');

      if (isCorrect) {
        sfx.correct();
        if (optBtn) optBtn.classList.add('correct');
        scores[pIdx] += 1;
        updateScoreUI();

        banner.className = 'buzzer-banner p' + (pIdx+1) + '-turn';
        banner.innerHTML = '🎉 CHÍNH XÁC! ' + PLAYERS[pIdx].name + ' ĐƯỢC +1 ĐIỂM!';

        // Đạt TARGET_SCORE = 15 điểm thì thắng ngay
        if (scores[pIdx] >= TARGET_SCORE) {
          setTimeout(endGame, 800);
          return;
        }

        setTimeout(loadNextQuestion, 1600);
      } else {
        // TRẢ LỜI SAI: TUYỆT ĐỐI KHÔNG HIỂN THỊ ĐÁP ÁN ĐÚNG
        sfx.wrong();
        if (optBtn) optBtn.classList.add('wrong');
        scores[pIdx] = Math.max(0, scores[pIdx] - 1);
        updateScoreUI();

        frozenPlayers[pIdx] = true;
        document.getElementById('p' + (pIdx+1) + '-buzzer').classList.add('locked');
        document.getElementById('p' + (pIdx+1) + '-card').classList.remove('active-buzzer');

        const allFailed = frozenPlayers.every(f => f);
        if (allFailed) {
          // Cả 4 đội đều chưa đúng: chuyển câu hỏi mà KHÔNG hiện đáp án đúng
          banner.className = 'buzzer-banner';
          banner.innerHTML = '❌ CẢ 4 ĐỘI ĐỀU CHƯA ĐÚNG! CHUYỂN CÂU HỎI TIẾP THEO...';
          setTimeout(loadNextQuestion, 1800);
        } else {
          // Còn đội khác: sau 0.6s bỏ đỏ và mở lại chuông cho các đội còn lại
          setTimeout(() => {
            if (optBtn) optBtn.classList.remove('wrong');
            activeBuzzerPlayer = null;
            banner.className = 'buzzer-banner';
            banner.innerHTML = '⚠️ ' + PLAYERS[pIdx].name + ' TRẢ LỜI CHƯA ĐÚNG (-1đ)! CÁC ĐỘI CÒN LẠI BẤM CHUÔNG!';
            for (let i = 0; i < 4; i++) {
              if (!frozenPlayers[i]) {
                document.getElementById('p' + (i+1) + '-buzzer').classList.remove('locked');
              }
            }
          }, 600);
        }
      }
    }

    // Kết thúc trận đấu
    function endGame() {
      isGameRunning = false;
      clearInterval(gameTimer);
      clearInterval(answerInterval);

      sfx.fanfare();
      startFireworks();

      const ranked = [0, 1, 2, 3].sort((a, b) => scores[b] - scores[a]);
      const topPlayer = ranked[0];

      document.getElementById('winner-title').innerHTML = 
        '👑 ' + PLAYERS[topPlayer].name + ' VÔ ĐỊCH VỚI ' + scores[topPlayer] + ' ĐIỂM!';

      const podium = document.getElementById('podium-container');
      podium.innerHTML = '';
      const medals = ['🥇', '🥈', '🥉', '🎖️'];

      ranked.forEach((pIdx, rank) => {
        const slot = document.createElement('div');
        slot.className = 'podium-slot';
        slot.style.borderColor = PLAYERS[pIdx].color;
        slot.innerHTML = 
          '<div style="font-size:24px;">' + medals[rank] + '</div>' +
          '<div style="font-size:12px; font-weight:800; color:' + PLAYERS[pIdx].color + '; margin:4px 0;">' + PLAYERS[pIdx].name + '</div>' +
          '<div style="font-size:18px; font-weight:900; font-family:monospace;">' + scores[pIdx] + 'đ</div>';
        podium.appendChild(slot);
      });

      document.getElementById('overlay-end').style.display = 'flex';
    }

    // Lắng nghe phím bấm: P1: W, P2: I, P3: C, P4: N hoặc Mũi tên lên ↑
    window.addEventListener('keydown', (e) => {
      const key = e.key.toUpperCase();

      if (isGameRunning) {
        if (activeBuzzerPlayer === null) {
          if (key === 'W') playerBuzz(0);
          if (key === 'I') playerBuzz(1);
          if (key === 'C') playerBuzz(2);
          if (key === 'N' || e.key === 'ArrowUp') playerBuzz(3);
        } else {
          if (key === '1' || key === 'A') chooseAnswer(0);
          if (key === '2' || key === 'B') chooseAnswer(1);
          if (key === '3' || key === 'C') chooseAnswer(2);
          if (key === '4' || key === 'D') chooseAnswer(3);
        }
      }
    });

    // HIỆU ỨNG PHÁO HOA CANVAS
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function startFireworks() {
      resizeCanvas();
      particles = [];
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.5) * 14 - 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01
        });
      }
      requestAnimationFrame(renderFireworks);
    }

    function renderFireworks() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      particles = particles.filter(p => p.alpha > 0);
      if (particles.length > 0) {
        requestAnimationFrame(renderFireworks);
      }
    }
  </script>
</body>
</html>`;
}
