export const EXAMS_DATA: Record<string, any> = {
  'ed3280-mid': {
    id: 'ed3280-mid',
    title: 'ED3280 - Tâm lý học ứng dụng',
    type: 'Thi Giữa Kỳ',
    format: 'Trắc nghiệm',
    date: '15/04/2026',
    duration: 60, // 1 minute
    status: 'ongoing',
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      type: 'mcq',
      text: i === 0 
        ? "Theo phân tâm học của Sigmund Freud, cấu trúc nhân cách bao gồm những thành phần nào?" 
        : `Câu hỏi trắc nghiệm số ${i + 1} về Tâm lý học ứng dụng. Chọn đáp án đúng nhất dưới đây.`,
      options: [
        "Cái Nó (Id), Cái Tôi (Ego), Cái Siêu Tôi (Superego)",
        "Ý thức, Tiền ý thức, Vô thức",
        "Hướng nội, Hướng ngoại",
        "Nhu cầu sinh lý, Nhu cầu an toàn, Nhu cầu xã hội"
      ]
    }))
  },
  'ed3280-final': {
    id: 'ed3280-final',
    title: 'ED3280 - Tâm lý học ứng dụng',
    type: 'Thi Cuối Kỳ',
    format: 'Trắc nghiệm & Tự luận',
    date: '20/05/2026',
    duration: 60,
    status: 'ongoing',
    questions: [
      ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        type: 'mcq',
        text: `Câu hỏi trắc nghiệm số ${i + 1} về Tâm lý học ứng dụng. Chọn đáp án đúng nhất dưới đây.`,
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
    duration: 60,
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
    date: '30/04/2026',
    duration: 90,
    status: 'upcoming',
    questions: []
  }
};

export const HISTORY_DATA = [
  { id: 'h1', title: 'MI1111 - Giải tích 1', type: 'Thi Cuối Kỳ', date: '10/01/2026', score: 8.5, status: 'Đã hoàn thành' },
  { id: 'h2', title: 'PH1110 - Vật lý đại cương 1', type: 'Thi Cuối Kỳ', date: '15/01/2026', score: 7.0, status: 'Đã hoàn thành' },
  { id: 'h3', title: 'IT1110 - Tin học đại cương', type: 'Thi Giữa Kỳ', date: '20/11/2025', score: 9.0, status: 'Đã hoàn thành' },
];

export const GRADES_DATA = [
  { id: 'g1', subject: 'MI1111 - Giải tích 1', credits: 3, midterm: 8.0, final: 9.0, total: 8.5, letter: 'A' },
  { id: 'g2', subject: 'PH1110 - Vật lý đại cương 1', credits: 3, midterm: 7.5, final: 6.5, total: 7.0, letter: 'B' },
  { id: 'g3', subject: 'IT1110 - Tin học đại cương', credits: 4, midterm: 9.0, final: 9.0, total: 9.0, letter: 'A+' },
];

export const APPEALS_DATA = [
  { id: 'a1', subject: 'PH1110 - Vật lý đại cương 1', type: 'Thi Cuối Kỳ', date: '20/01/2026', status: 'Đang xử lý', reason: 'Chấm sót câu 3 phần tự luận' },
  { id: 'a2', subject: 'MI1111 - Giải tích 1', type: 'Thi Giữa Kỳ', date: '05/12/2025', status: 'Đã từ chối', reason: 'Cộng nhầm điểm thành phần' }
];
