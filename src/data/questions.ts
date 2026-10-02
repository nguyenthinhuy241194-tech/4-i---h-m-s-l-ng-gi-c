export interface Question {
  id: number;
  topic: string;
  question: string;
  mathFormula?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tip?: string;
}

export const QUESTIONS_POOL: Question[] = [
  // --- TẬP XÁC ĐỊNH ---
  {
    id: 1,
    topic: 'Tập xác định',
    question: 'Tập xác định của hàm số y = tan x là:',
    mathFormula: 'y = \\tan x',
    options: [
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}',
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k2\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R}'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\tan x = \\frac{\\sin x}{\\cos x}$ xác định khi $\\cos x \\neq 0 \\Leftrightarrow x \\neq \\frac{\\pi}{2} + k\\pi \\;(k \\in \\mathbb{Z})$.',
    tip: 'Tan thì mẫu là cos, cos = 0 tại π/2 + kπ.'
  },
  {
    id: 2,
    topic: 'Tập xác định',
    question: 'Tập xác định của hàm số y = cot x là:',
    mathFormula: 'y = \\cot x',
    options: [
      'D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}',
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\{k2\\pi, k \\in \\mathbb{Z}\\}',
      'D = [-1; 1]'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\cot x = \\frac{\\cos x}{\\sin x}$ xác định khi $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi \\;(k \\in \\mathbb{Z})$.',
    tip: 'Cot thì mẫu là sin, sin = 0 tại kπ.'
  },
  {
    id: 3,
    topic: 'Tập xác định',
    question: 'Tìm tập xác định của hàm số y = 1 / sin x:',
    mathFormula: 'y = \\frac{1}{\\sin x}',
    options: [
      'D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}',
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\{0\\}',
      'D = [-1; 1]'
    ],
    correctIndex: 0,
    explanation: 'Biểu thức xác định khi $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi \\;(k \\in \\mathbb{Z})$.',
    tip: 'Sin bằng 0 tại các bội số của π.'
  },
  {
    id: 4,
    topic: 'Tập xác định',
    question: 'Tìm tập xác định của hàm số y = tan(2x):',
    mathFormula: 'y = \\tan(2x)',
    options: [
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\left\\{k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R}'
    ],
    correctIndex: 0,
    explanation: 'Hàm số xác định khi $\\cos(2x) \\neq 0 \\Leftrightarrow 2x \\neq \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x \\neq \\frac{\\pi}{4} + k\\frac{\\pi}{2} \\;(k \\in \\mathbb{Z})$.',
    tip: 'Chia cả hai vế cho hệ số 2.'
  },
  {
    id: 5,
    topic: 'Tập xác định',
    question: 'Tìm tập xác định của hàm số y = 1 / (cos x - 1):',
    mathFormula: 'y = \\frac{1}{\\cos x - 1}',
    options: [
      'D = \\mathbb{R} \\setminus \\{k2\\pi, k \\in \\mathbb{Z}\\}',
      'D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}',
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k2\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R}'
    ],
    correctIndex: 0,
    explanation: 'Điều kiện: $\\cos x - 1 \\neq 0 \\Leftrightarrow \\cos x \\neq 1 \\Leftrightarrow x \\neq k2\\pi \\;(k \\in \\mathbb{Z})$.',
    tip: 'Cos bằng 1 tại các điểm ngọn k2π.'
  },
  {
    id: 6,
    topic: 'Tập xác định',
    question: 'Tập xác định của hàm số y = cot(x - π/4) là:',
    mathFormula: 'y = \\cot\\left(x - \\frac{\\pi}{4}\\right)',
    options: [
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\left\\{-\\frac{\\pi}{4} + k\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\left\\{\\frac{3\\pi}{4} + k\\pi, k \\in \\mathbb{Z}\\right\\}',
      'D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}'
    ],
    correctIndex: 0,
    explanation: 'Hàm số xác định khi $\\sin(x - \\frac{\\pi}{4}) \\neq 0 \\Leftrightarrow x - \\frac{\\pi}{4} \\neq k\\pi \\Leftrightarrow x \\neq \\frac{\\pi}{4} + k\\pi$.',
    tip: 'Chuyển vế -π/4 thành +π/4.'
  },

  // --- TÍNH CHẴN - LẺ ---
  {
    id: 7,
    topic: 'Tính chẵn - lẻ',
    question: 'Trong các hàm số lượng giác cơ bản sau, hàm số nào là hàm số CHẴN?',
    mathFormula: 'f(-x) = f(x)',
    options: [
      'y = \\cos x',
      'y = \\sin x',
      'y = \\tan x',
      'y = \\cot x'
    ],
    correctIndex: 0,
    explanation: 'Vì $\\cos(-x) = \\cos x$ với mọi $x \\in \\mathbb{R}$, nên $y = \\cos x$ là hàm số chẵn. Ba hàm còn lại đều là hàm lẻ.',
    tip: 'Chỉ có hàm cosin là hàm số chẵn.'
  },
  {
    id: 8,
    topic: 'Tính chẵn - lẻ',
    question: 'Khẳng định nào sau đây về tính chẵn lẻ của y = sin x là đúng?',
    mathFormula: 'y = \\sin x',
    options: [
      'Là hàm số lẻ',
      'Là hàm số chẵn',
      'Vừa chẵn vừa lẻ',
      'Không chẵn không lẻ'
    ],
    correctIndex: 0,
    explanation: 'Do $\\sin(-x) = -\\sin x$ nên $y = \\sin x$ là hàm số lẻ.',
    tip: 'Sin(-x) = -sin(x) nên là hàm lẻ.'
  },
  {
    id: 9,
    topic: 'Tính chẵn - lẻ',
    question: 'Hàm số y = x · sin x là hàm số gì?',
    mathFormula: 'y = x \\sin x',
    options: [
      'Hàm số chẵn',
      'Hàm số lẻ',
      'Không chẵn không lẻ',
      'Hàm số tuần hoàn chu kì π'
    ],
    correctIndex: 0,
    explanation: 'Đặt $f(x) = x\\sin x$. Ta có $f(-x) = (-x)\\sin(-x) = (-x)(-\\sin x) = x\\sin x = f(x)$. Do đó đây là hàm số chẵn.',
    tip: 'Tích của hai hàm lẻ là một hàm chẵn (âm nhân âm thành dương).'
  },
  {
    id: 10,
    topic: 'Tính chẵn - lẻ',
    question: 'Hàm số y = cos x + sin² x là hàm số gì?',
    mathFormula: 'y = \\cos x + \\sin^2 x',
    options: [
      'Hàm số chẵn',
      'Hàm số lẻ',
      'Không chẵn không lẻ',
      'Hàm đồng biến trên ℝ'
    ],
    correctIndex: 0,
    explanation: '$f(-x) = \\cos(-x) + \\sin^2(-x) = \\cos x + (-\\sin x)^2 = \\cos x + \\sin^2 x = f(x)$. Vậy là hàm số chẵn.',
    tip: 'Cả cos x và sin² x đều là hàm chẵn nên tổng là hàm chẵn.'
  },
  {
    id: 11,
    topic: 'Tính chẵn - lẻ',
    question: 'Hàm số nào sau đây là hàm số KHÔNG CHẴN VÀ KHÔNG LẺ?',
    mathFormula: 'f(-x) \\neq \\pm f(x)',
    options: [
      'y = \\sin x + \\cos x',
      'y = \\sin x \\cos x',
      'y = \\tan x + \\cot x',
      'y = \\cos(2x)'
    ],
    correctIndex: 0,
    explanation: 'Với $y = \\sin x + \\cos x$: $f(-x) = -\\sin x + \\cos x$, không bằng $f(x)$ cũng không bằng $-f(x)$ nên không chẵn không lẻ.',
    tip: 'Tổng của một hàm lẻ và một hàm chẵn thì không chẵn không lẻ.'
  },

  // --- CHU KÌ TUẦN HOÀN ---
  {
    id: 12,
    topic: 'Chu kì tuần hoàn',
    question: 'Chu kì tuần hoàn của hàm số y = sin x và y = cos x là:',
    mathFormula: 'T = ?',
    options: [
      'T = 2\\pi',
      'T = \\pi',
      'T = \\frac{\\pi}{2}',
      'T = 4\\pi'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\sin x$ và $y = \\cos x$ tuần hoàn với chu kì cơ sở $T = 2\\pi$.',
    tip: 'Sin và Cos có chu kì 2π.'
  },
  {
    id: 13,
    topic: 'Chu kì tuần hoàn',
    question: 'Chu kì tuần hoàn của hàm số y = tan x và y = cot x là:',
    mathFormula: 'T = ?',
    options: [
      'T = \\pi',
      'T = 2\\pi',
      'T = \\frac{\\pi}{2}',
      'T = 3\\pi'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\tan x$ và $y = \\cot x$ tuần hoàn với chu kì cơ sở $T = \\pi$.',
    tip: 'Tan và Cot có chu kì π.'
  },
  {
    id: 14,
    topic: 'Chu kì tuần hoàn',
    question: 'Chu kì tuần hoàn của hàm số y = sin(2x) là:',
    mathFormula: 'y = \\sin(2x)',
    options: [
      'T = \\pi',
      'T = 2\\pi',
      'T = 4\\pi',
      'T = \\frac{\\pi}{2}'
    ],
    correctIndex: 0,
    explanation: 'Công thức chu kì $T = \\frac{2\\pi}{|\\omega|}$. Với $\\omega = 2$, ta có $T = \\frac{2\\pi}{2} = \\pi$.',
    tip: 'T = 2π / ω.'
  },
  {
    id: 15,
    topic: 'Chu kì tuần hoàn',
    question: 'Chu kì tuần hoàn của hàm số y = cos(x / 2) là:',
    mathFormula: 'y = \\cos\\left(\\frac{x}{2}\\right)',
    options: [
      'T = 4\\pi',
      'T = 2\\pi',
      'T = \\pi',
      'T = \\frac{\\pi}{2}'
    ],
    correctIndex: 0,
    explanation: 'Hệ số $\\omega = \\frac{1}{2} \\implies T = \\frac{2\\pi}{1/2} = 4\\pi$.',
    tip: 'Chia cho 1/2 tương đương nhân 2.'
  },
  {
    id: 16,
    topic: 'Chu kì tuần hoàn',
    question: 'Chu kì tuần hoàn của hàm số y = tan(3x) là:',
    mathFormula: 'y = \\tan(3x)',
    options: [
      'T = \\frac{\\pi}{3}',
      'T = \\frac{2\\pi}{3}',
      'T = 3\\pi',
      'T = \\pi'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\tan(\\omega x)$ có chu kì $T = \\frac{\\pi}{|\\omega|}$. Với $\\omega = 3$, $T = \\frac{\\pi}{3}$.',
    tip: 'Chu kì của tan là π / ω (không phải 2π).'
  },

  // --- TẬP GIÁ TRỊ & GTLN - GTNN ---
  {
    id: 17,
    topic: 'Tập giá trị',
    question: 'Tập giá trị của hàm số y = cos x là:',
    mathFormula: 'y = \\cos x',
    options: [
      '[-1; 1]',
      '(-1; 1)',
      '[0; 1]',
      '\\mathbb{R}'
    ],
    correctIndex: 0,
    explanation: 'Với mọi $x \\in \\mathbb{R}$, ta luôn có $-1 \\le \\cos x \\le 1$. Do đó tập giá trị là $[-1; 1]$.',
    tip: 'Giá trị hàm cos luôn thuộc đoạn [-1; 1].'
  },
  {
    id: 18,
    topic: 'Tập giá trị',
    question: 'Tập giá trị của hàm số y = tan x là:',
    mathFormula: 'y = \\tan x',
    options: [
      '\\mathbb{R}',
      '[-1; 1]',
      '(-1; 1)',
      '[0; +\\infty)'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\tan x$ có thể nhận mọi giá trị thực từ $-\\infty$ đến $+\\infty$, nên tập giá trị là $\\mathbb{R}$.',
    tip: 'Tan và Cot không bị chặn, tập giá trị là ℝ.'
  },
  {
    id: 19,
    topic: 'Giá trị lớn nhất',
    question: 'Giá trị LỚN NHẤT của hàm số y = 3 sin x - 2 bằng:',
    mathFormula: 'y = 3\\sin x - 2',
    options: [
      '1',
      '3',
      '-2',
      '5'
    ],
    correctIndex: 0,
    explanation: 'Do $\\sin x \\le 1 \\implies 3\\sin x - 2 \\le 3(1) - 2 = 1$. Giá trị lớn nhất là 1 khi $\\sin x = 1$.',
    tip: 'Thay sin x = 1 để tìm max.'
  },
  {
    id: 20,
    topic: 'Giá trị nhỏ nhất',
    question: 'Giá trị NHỎ NHẤT của hàm số y = 2 cos x + 5 bằng:',
    mathFormula: 'y = 2\\cos x + 5',
    options: [
      '3',
      '5',
      '7',
      '-2'
    ],
    correctIndex: 0,
    explanation: 'Do $\\cos x \\ge -1 \\implies 2\\cos x + 5 \\ge 2(-1) + 5 = 3$. Giá trị nhỏ nhất là 3 khi $\\cos x = -1$.',
    tip: 'Thay cos x = -1 để tìm min.'
  },
  {
    id: 21,
    topic: 'Giá trị lớn nhất',
    question: 'Giá trị LỚN NHẤT của hàm số y = 4 - 2 cos² x là:',
    mathFormula: 'y = 4 - 2\\cos^2 x',
    options: [
      '4',
      '2',
      '6',
      '0'
    ],
    correctIndex: 0,
    explanation: 'Vì $0 \\le \\cos^2 x \\le 1 \\implies -2 \\le -2\\cos^2 x \\le 0 \\implies 2 \\le 4 - 2\\cos^2 x \\le 4$. Giá trị lớn nhất là 4 khi $\\cos x = 0$.',
    tip: 'Trừ đi đại lượng dương thì min khi đại lượng đó bằng 0.'
  },
  {
    id: 22,
    topic: 'Giá trị nhỏ nhất',
    question: 'Giá trị NHỎ NHẤT của hàm số y = sin² x - 4 sin x + 5 bằng:',
    mathFormula: 'y = \\sin^2 x - 4\\sin x + 5',
    options: [
      '2',
      '1',
      '0',
      '10'
    ],
    correctIndex: 0,
    explanation: 'Ta biến đổi: $y = (\\sin x - 2)^2 + 1$. Vì $\\sin x \\le 1$, biểu thức nhỏ nhất khi $\\sin x$ gần 2 nhất, tức $\\sin x = 1 \\implies y = (1 - 2)^2 + 1 = 2$.',
    tip: 'Xét hàm bậc 2 với ẩn t = sin x ∈ [-1; 1].'
  },
  {
    id: 23,
    topic: 'Tập giá trị',
    question: 'Tập giá trị của hàm số y = 2 sin(3x) + 1 là:',
    mathFormula: 'y = 2\\sin(3x) + 1',
    options: [
      '[-1; 3]',
      '[-2; 2]',
      '[-3; 3]',
      '[1; 3]'
    ],
    correctIndex: 0,
    explanation: 'Vì $-1 \\le \\sin(3x) \\le 1 \\implies -2 \\le 2\\sin(3x) \\le 2 \\implies -1 \\le 2\\sin(3x) + 1 \\le 3$. Vậy tập giá trị là $[-1; 3]$.',
    tip: 'Min = 2(-1) + 1 = -1, Max = 2(1) + 1 = 3.'
  },

  // --- TÍNH ĐƠN ĐIỆU (ĐỒNG BIẾN - NGHỊCH BIẾN) ---
  {
    id: 24,
    topic: 'Tính đơn điệu',
    question: 'Hàm số y = sin x ĐỒNG BIẾN trên khoảng nào sau đây?',
    mathFormula: 'y = \\sin x',
    options: [
      '\\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)',
      '(0; \\pi)',
      '\\left(\\frac{\\pi}{2}; \\frac{3\\pi}{2}\\right)',
      '(\\pi; 2\\pi)'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\sin x$ đồng biến trên mỗi khoảng $(-\\frac{\\pi}{2} + k2\\pi; \\frac{\\pi}{2} + k2\\pi)$. Với $k=0$, ta có khoảng $(-\\frac{\\pi}{2}; \\frac{\\pi}{2})$.',
    tip: 'Đồ thị hàm sin đi lên từ -π/2 đến π/2.'
  },
  {
    id: 25,
    topic: 'Tính đơn điệu',
    question: 'Hàm số y = cos x NGHỊCH BIẾN trên khoảng nào sau đây?',
    mathFormula: 'y = \\cos x',
    options: [
      '(0; \\pi)',
      '(-\\pi; 0)',
      '\\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)',
      '(0; 2\\pi)'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\cos x$ nghịch biến trên mỗi khoảng $(k2\\pi; \\pi + k2\\pi)$. Với $k=0$, khoảng nghịch biến là $(0; \\pi)$.',
    tip: 'Từ 0 đến π thì giá trị cos x giảm dần từ 1 về -1.'
  },
  {
    id: 26,
    topic: 'Tính đơn điệu',
    question: 'Khẳng định nào sau đây về tính đơn điệu của hàm số y = tan x là ĐÚNG?',
    mathFormula: 'y = \\tan x',
    options: [
      'Đồng biến trên mỗi khoảng xác định',
      'Nghịch biến trên mỗi khoảng xác định',
      'Đồng biến trên toàn trục số ℝ',
      'Nghịch biến trên (0; π)'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\tan x$ đồng biến trên mỗi khoảng xác định $(-\\frac{\\pi}{2} + k\\pi; \\frac{\\pi}{2} + k\\pi)$. Lưu ý không kết luận đồng biến trên ℝ vì hàm bị gián đoạn.',
    tip: 'Đồ thị tan luôn đi lên trên từng nhánh.'
  },
  {
    id: 27,
    topic: 'Tính đơn điệu',
    question: 'Hàm số y = cot x có tính chất đơn điệu nào sau đây?',
    mathFormula: 'y = \\cot x',
    options: [
      'Nghịch biến trên mỗi khoảng xác định',
      'Đồng biến trên mỗi khoảng xác định',
      'Đồng biến trên ℝ',
      'Nghịch biến trên ℝ'
    ],
    correctIndex: 0,
    explanation: 'Hàm số $y = \\cot x$ nghịch biến trên mỗi khoảng xác định $(k\\pi; \\pi + k\\pi)$.',
    tip: 'Đồ thị cot luôn đi xuống trên từng nhánh.'
  },

  // --- ĐỒ THỊ & TÍNH ĐỐI XỨNG ---
  {
    id: 28,
    topic: 'Đồ thị & Đối xứng',
    question: 'Đồ thị hàm số y = cos x nhận đường thẳng nào làm trục đối xứng?',
    mathFormula: 'y = \\cos x',
    options: [
      'Trục tung Oy (đường thẳng x = 0)',
      'Trục hoành Ox',
      'Đường thẳng y = x',
      'Đường thẳng x = π/2'
    ],
    correctIndex: 0,
    explanation: 'Vì $y = \\cos x$ là hàm số chẵn nên đồ thị nhận trục tung $Oy$ làm trục đối xứng.',
    tip: 'Hàm số chẵn có đồ thị đối xứng qua Oy.'
  },
  {
    id: 29,
    topic: 'Đồ thị & Điểm đặc biệt',
    question: 'Đồ thị hàm số y = sin x cắt trục hoành Ox tại các điểm có hoành độ:',
    mathFormula: '\\sin x = 0',
    options: [
      'x = k\\pi \\;(k \\in \\mathbb{Z})',
      'x = \\frac{\\pi}{2} + k\\pi \\;(k \\in \\mathbb{Z})',
      'x = k2\\pi \\;(k \\in \\mathbb{Z})',
      'x = \\frac{\\pi}{4} + k\\pi \\;(k \\in \\mathbb{Z})'
    ],
    correctIndex: 0,
    explanation: 'Phương trình hoành độ giao điểm với $Ox$: $\\sin x = 0 \\Leftrightarrow x = k\\pi \\;(k \\in \\mathbb{Z})$.',
    tip: 'Điểm uốn và giao điểm của đồ thị sin với Ox là kπ.'
  },
  {
    id: 30,
    topic: 'Đồ thị & Điểm cực trị',
    question: 'Hàm số y = cos x đạt giá trị lớn nhất bằng 1 tại các điểm:',
    mathFormula: '\\cos x = 1',
    options: [
      'x = k2\\pi \\;(k \\in \\mathbb{Z})',
      'x = \\pi + k2\\pi \\;(k \\in \\mathbb{Z})',
      'x = \\frac{\\pi}{2} + k2\\pi \\;(k \\in \\mathbb{Z})',
      'x = k\\pi \\;(k \\in \\mathbb{Z})'
    ],
    correctIndex: 0,
    explanation: '$\\cos x = 1 \\Leftrightarrow x = k2\\pi \\;(k \\in \\mathbb{Z})$. Đây chính là các điểm cực đại của hàm cosin.',
    tip: 'Đỉnh cao nhất của hàm cos tại x = 0, 2π, 4π, ...'
  },
  {
    id: 31,
    topic: 'Đồ thị & Điểm cực trị',
    question: 'Hàm số y = sin x đạt giá trị nhỏ nhất bằng -1 tại các điểm:',
    mathFormula: '\\sin x = -1',
    options: [
      'x = -\\frac{\\pi}{2} + k2\\pi \\;(k \\in \\mathbb{Z})',
      'x = \\frac{\\pi}{2} + k2\\pi \\;(k \\in \\mathbb{Z})',
      'x = \\pi + k2\\pi \\;(k \\in \\mathbb{Z})',
      'x = k\\pi \\;(k \\in \\mathbb{Z})'
    ],
    correctIndex: 0,
    explanation: '$\\sin x = -1 \\Leftrightarrow x = -\\frac{\\pi}{2} + k2\\pi \\;(k \\in \\mathbb{Z})$.',
    tip: 'Đáy thấp nhất của hàm sin tại -π/2 + k2π.'
  },
  {
    id: 32,
    topic: 'Vận dụng tổng hợp',
    question: 'Có bao nhiêu giá trị nguyên của hàm số y = 3 sin x + 4 cos x?',
    mathFormula: 'y = 3\\sin x + 4\\cos x',
    options: [
      '11',
      '9',
      '7',
      '5'
    ],
    correctIndex: 0,
    explanation: 'Ta có $-\\sqrt{3^2 + 4^2} \\le 3\\sin x + 4\\cos x \\le \\sqrt{3^2 + 4^2} \\Leftrightarrow -5 \\le y \\le 5$. Các giá trị nguyên từ -5 đến 5 gồm: $5 - (-5) + 1 = 11$ giá trị.',
    tip: 'Áp dụng bất đẳng thức Bunhiacopxki hoặc công thức góc phụ: max/min = ±√(a² + b²).'
  }
];

export interface TopicSummary {
  title: string;
  items: { name: string; latex: string }[];
}

export const TOPIC_SUMMARY: TopicSummary[] = [
  {
    title: '1. Hàm số y = sin x và y = cos x',
    items: [
      { name: 'TXĐ của sin & cos', latex: 'D = \\mathbb{R}' },
      { name: 'Tập giá trị', latex: 'T = [-1; 1]' },
      { name: 'Tính chẵn lẻ', latex: '\\sin(-x) = -\\sin x \\text{ (lẻ)}; \\; \\cos(-x) = \\cos x \\text{ (chẵn)}' },
      { name: 'Chu kì tuần hoàn', latex: 'T = 2\\pi \\implies \\sin(\\omega x) \\text{ có } T = \\frac{2\\pi}{|\\omega|}' },
      { name: 'Tính đối xứng đồ thị', latex: 'y=\\sin x \\text{ qua } O(0;0); \\; y=\\cos x \\text{ qua trục } Oy' }
    ]
  },
  {
    title: '2. Hàm số y = tan x và y = cot x',
    items: [
      { name: 'TXĐ của y = tan x', latex: 'D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}' },
      { name: 'TXĐ của y = cot x', latex: 'D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}' },
      { name: 'Tập giá trị', latex: 'T = \\mathbb{R}' },
      { name: 'Chu kì tuần hoàn', latex: 'T = \\pi \\implies \\tan(\\omega x) \\text{ có } T = \\frac{\\pi}{|\\omega|}' },
      { name: 'Tính chẵn lẻ & đơn điệu', latex: '\\text{Hàm lẻ; tan đồng biến, cot nghịch biến trên từng khoảng TXĐ}' }
    ]
  },
  {
    title: '3. Giá trị lớn nhất & nhỏ nhất',
    items: [
      { name: 'Dạng cơ bản', latex: '-1 \\le \\sin u \\le 1; \\; -1 \\le \\cos u \\le 1' },
      { name: 'Dạng tuyến tính', latex: '-\\sqrt{a^2+b^2} \\le a\\sin x + b\\cos x \\le \\sqrt{a^2+b^2}' }
    ]
  }
];
