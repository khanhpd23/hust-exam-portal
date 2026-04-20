export const EXAMS_DATA: Record<string, any> = {
  'ed3280-mid': {
    id: 'ed3280-mid',
    title: 'ED3280 - Tâm lý học ứng dụng',
    type: 'Thi Giữa Kỳ',
    format: 'Trắc nghiệm',
    date: '15/04/2026',
    duration: 120, // 1 minute
    status: 'ongoing',
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      type: 'mcq',
      text: i === 0
        ? "Theo phân tâm học của Sigmund Freud, cấu trúc nhân cách bao gồm những thành phần nào?"
        : `Câu ${i + 1}: Chọn đáp án đúng nhất dưới đây:`,
      options: [
        "Phương án 1",
        "Phương án 2",
        "Phương án 3",
        "Phương án 4"
      ]
    }))
  },
  'ed3280-final': {
    id: 'ed3280-final',
    title: 'ED3280 - Tâm lý học ứng dụng',
    type: 'Thi Cuối Kỳ',
    format: 'Trắc nghiệm & Tự luận',
    date: '20/05/2026',
    duration: 120,
    status: 'ongoing',
    questions: [
      ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        type: 'mcq',
        text: `Câu ${i + 1}: Chọn đáp án đúng nhất dưới đây.`,
        options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"]
      })),
      {
        id: 11,
        type: 'essay',
        text: 'Câu 11 (Tự luận - 3 điểm): Phân tích một ứng dụng của tâm lý học trong quản trị nhân sự tại doanh nghiệp. Cho ví dụ minh họa cụ thể từ thực tiễn.'
      },
      {
        id: 12,
        type: 'essay',
        text: 'Câu 12 (Tự luận - 2 điểm): Trình bày các yếu tố tâm lý ảnh hưởng đến hành vi người tiêu dùng trong kỷ nguyên số.'
      }
    ]
  },
  'ed1010-final': {
    id: 'ed1010-final',
    title: 'ED1010 - Tâm lý học giáo dục',
    type: 'Thi Cuối Kỳ',
    format: 'Tự luận',
    date: '22/05/2026',
    duration: 120,
    status: 'ongoing',
    questions: [
      {
        id: 1,
        type: 'essay',
        text: 'Câu 1 (4 điểm): Phân tích vai trò của động cơ học tập đối với kết quả học tập của học sinh. Làm thế nào để giáo viên có thể kích thích và duy trì động cơ học tập tích cực?'
      },

      {
        id: 2,
        type: 'essay',
        text: 'Câu 2 (3 điểm): Trình bày các giai đoạn phát triển nhận thức theo lý thuyết của Jean Piaget và rút ra kết luận sư phạm cho từng giai đoạn.'
      },
      {
        id: 3,
        type: 'essay',
        text: 'Câu 3 (3 điểm): Đánh giá ảnh hưởng của môi trường gia đình và nhà trường đến sự phát triển nhân cách của trẻ vị thành niên hiện nay.'
      }
    ]
  },
  'ed2120-mid': {
    id: 'ed2120-mid',
    title: 'ED2120 - Thiết kế UI/UX',
    type: 'Thi Giữa Kỳ',
    format: 'Thực hành & Trắc nghiệm',
    date: '30/05/2026',
    duration: 120,
    status: 'upcoming',
    questions: []
  }
};

export const HISTORY_DATA = [
  { id: 'h1', title: 'Tâm lý học giáo dục', type: 'Thi cuối kỳ 1', date: '31/01/2026', score: 8, status: 'Đã hoàn thành' },
  { id: 'h2', title: 'Tâm lý học ứng dụng', type: 'Thi cuối kỳ 1', date: '15/01/2026', score: 9, status: 'Đã hoàn thành' },
  { id: 'h3', title: 'Tâm lý học ứng dụng', type: 'Thi giữa kỳ 1', date: '20/11/2025', score: 9.5, status: 'Đã hoàn thành' },
];

export const GRADES_DATA = [
  { id: 'g1', subject: 'Tâm lý học giáo dục', credits: 3, midterm: 10.0, final: 8.0, total: 8.5, letter: 'A' },
  { id: 'g2', subject: 'Tâm lý học ứng dụng', credits: 2, midterm: 10, final: 9.5, total: 10, letter: 'A+' },
  { id: 'g3', subject: 'E-learning', credits: 3, midterm: 9.0, final: 9.0, total: 9.0, letter: 'A' },
];

export const APPEALS_DATA = [
  { id: 'a1', subject: 'Tâm lý học giáo dục', type: 'Thi cuối kỳ', date: '31/01/2026', status: 'Đang xử lý', reason: 'Chấm sót câu 3 phần tự luận.' },
  { id: 'a2', subject: 'E-learning', type: 'Thi giữa kỳ', date: '15/01/2026', status: 'Đã từ chối', reason: 'Điểm tổng không thay đổi.' }
];
