import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Cloud, Bookmark, ArrowLeft, ArrowRight, Send, AlertCircle, CheckCircle2, Info, Bold, Italic, Underline, FileText, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Strikethrough } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { EXAMS_DATA } from '@/lib/mock-data';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function ExamSkeleton() {
  return (
    <div className="h-screen flex flex-col bg-[#f8f9fa]">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0 z-10">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-24" />
      </header>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 p-6 space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="grid grid-cols-5 gap-2">
            {Array(20).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </aside>
        <main className="flex-1 p-8 md:p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </main>
        <aside className="w-72 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 p-6 space-y-8">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="mt-auto">
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </aside>
      </div>
    </div>
  );
}

const RichTextEditor = ({ value, onChange, id }: { value: string, onChange: (val: string) => void, id: number }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
      updateWordCount(value || '');
    }
  }, [id]);

  const updateWordCount = (html: string) => {
    const text = html.replace(/<[^>]*>?/gm, '').trim();
    const words = text ? text.split(/\s+/).length : 0;
    setWordCount(words);
  };

  const checkFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      updateWordCount(html);
      onChange(html);
      checkFormats();
    }
  };

  const handleKeyUp = () => {
    checkFormats();
  };

  const handleMouseUp = () => {
    checkFormats();
  };

  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col h-full min-h-[400px] shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-300 transition-all">
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        <button onClick={() => format('bold')} className={`p-2 rounded transition-colors ${activeFormats.bold ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="In đậm"><Bold className="w-4 h-4" /></button>
        <button onClick={() => format('italic')} className={`p-2 rounded transition-colors ${activeFormats.italic ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="In nghiêng"><Italic className="w-4 h-4" /></button>
        <button onClick={() => format('underline')} className={`p-2 rounded transition-colors ${activeFormats.underline ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="Gạch chân"><Underline className="w-4 h-4" /></button>
        <button onClick={() => format('strikeThrough')} className={`p-2 rounded transition-colors ${activeFormats.strikeThrough ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="Gạch ngang"><Strikethrough className="w-4 h-4" /></button>
        <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
        <button onClick={() => format('justifyLeft')} className={`p-2 rounded transition-colors ${activeFormats.justifyLeft ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="Căn trái"><AlignLeft className="w-4 h-4" /></button>
        <button onClick={() => format('justifyCenter')} className={`p-2 rounded transition-colors ${activeFormats.justifyCenter ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="Căn giữa"><AlignCenter className="w-4 h-4" /></button>
        <button onClick={() => format('justifyRight')} className={`p-2 rounded transition-colors ${activeFormats.justifyRight ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="Căn phải"><AlignRight className="w-4 h-4" /></button>
        <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
        <button onClick={() => format('insertUnorderedList')} className={`p-2 rounded transition-colors ${activeFormats.insertUnorderedList ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="Danh sách không thứ tự"><List className="w-4 h-4" /></button>
        <button onClick={() => format('insertOrderedList')} className={`p-2 rounded transition-colors ${activeFormats.insertOrderedList ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200 text-gray-700'}`} title="Danh sách có thứ tự"><ListOrdered className="w-4 h-4" /></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
        className="p-6 flex-1 outline-none overflow-y-auto prose max-w-none text-gray-800 leading-relaxed"
        style={{ minHeight: '300px' }}
        data-placeholder="Nhập câu trả lời của bạn vào đây..."
      />
      <div className="bg-gray-50 border-t border-gray-200 p-3 px-5 text-xs font-bold text-gray-500 flex justify-between items-center">
        <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Trình soạn thảo văn bản</span>
        <span>Số từ: <span className="text-[#a70015] text-sm">{wordCount}</span></span>
      </div>
    </div>
  );
};

export default function Exam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = EXAMS_DATA[examId || ''] || EXAMS_DATA['ed3280-mid'];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitting) {
      handleFinalSubmit();
    }
  }, [timeLeft, isSubmitting]);

  useEffect(() => {
    if (timeLeft === 45 && !isSubmitting) {
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play().catch(e => console.log('Audio play failed', e));
    }
  }, [timeLeft, isSubmitting]);

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setShowSubmitModal(true);
    setTimeout(() => {
      navigate(`/receipt/${exam.id}`);
    }, 2500);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (qId: number, value: any) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));

    // Simulate auto-saving
    setIsSaving(true);
    const saveDelay = exam.questions.find((q: any) => q.id === qId)?.type === 'essay' ? 1500 : 500;
    setTimeout(() => {
      setIsSaving(false);
    }, saveDelay);
  };

  const toggleFlag = (qId: number) => {
    setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const isQuestionAnswered = (qId: number) => {
    const ans = answers[qId];
    if (ans === undefined) return false;
    if (typeof ans === 'string') {
      const text = ans.replace(/<[^>]*>?/gm, '').trim();
      return text.length > 0;
    }
    return true;
  };

  const unansweredCount = exam.questions.filter((q: any) => !isQuestionAnswered(q.id)).length;
  const q = exam.questions[currentQuestionIdx];

  return (
    <PageTransition skeleton={<ExamSkeleton />}>
      <div className="h-screen flex flex-col bg-[#f8f9fa] overflow-hidden selection:bg-red-100 selection:text-red-900">
        {/* Exam Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0 z-10">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="HUST" className="w-8 h-12 mr-3 object-contain" />
              <div className="flex flex-col text-left">
                <span className="font-medium text-[8px] leading-tight text-[#a70015]">ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
                <span className="font-bold text-[8px] leading-tight text-[#a70015]">KHOA KHOA HỌC &<br />CÔNG NGHỆ GIÁO DỤC</span>
              </div>
            </Link>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="font-bold text-[#a70015] leading-tight">{exam.title}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exam.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${isSaving ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
              {isSaving ? (
                <><div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> Đang lưu...</>
              ) : (
                <><Cloud className="w-4 h-4" /> Đã lưu tự động</>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Navigator */}
          <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 min-h-0">
            <div className="p-6 border-b border-gray-100 shrink-0">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Question Navigator</h3>
              <p className="text-sm font-medium text-gray-600">Đã làm: {Object.keys(answers).filter(k => isQuestionAnswered(Number(k))).length}/{exam.questions.length}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((mq: any, idx: number) => {
                  const isAnswered = isQuestionAnswered(mq.id);
                  const isFlagged = flagged[mq.id];
                  const isActive = currentQuestionIdx === idx;

                  let btnClass = "w-full aspect-square rounded-lg text-sm font-bold flex items-center justify-center transition-all border-2 relative ";

                  if (isActive) btnClass += "border-[#a70015] bg-red-50 text-[#a70015] scale-110 shadow-sm z-10";
                  else if (isFlagged) btnClass += "border-amber-400 bg-amber-50 text-amber-700";
                  else if (isAnswered) btnClass += "border-transparent bg-gray-800 text-white";
                  else btnClass += "border-gray-200 bg-white text-gray-500 hover:border-gray-300";

                  return (
                    <button key={mq.id} onClick={() => setCurrentQuestionIdx(idx)} className={btnClass} title={mq.type === 'essay' ? 'Tự luận' : 'Trắc nghiệm'}>
                      {mq.id}
                      {mq.type === 'essay' && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-2 text-xs font-medium text-gray-600 shrink-0">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-800 rounded-sm"></div> Đã trả lời</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border-2 border-gray-200 rounded-sm"></div> Chưa trả lời</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-50 border-2 border-amber-400 rounded-sm"></div> Đánh dấu xem lại</div>
              <div className="flex items-center gap-2 mt-4 pt-2 border-t border-gray-200"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Câu hỏi tự luận</div>
            </div>
          </aside>

          {/* Center: Question Area */}
          <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  {q.type === 'essay' ? 'Phần Tự Luận' : 'Phần Trắc Nghiệm'} - Câu {q.id}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFlag(q.id)}
                  className={`rounded-full ${flagged[q.id] ? 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200' : 'text-gray-500'}`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${flagged[q.id] ? 'fill-current' : ''}`} />
                  {flagged[q.id] ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}
                </Button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 leading-relaxed mb-10">
                {q.text}
              </h2>

              {q.type === 'mcq' ? (
                <div className="space-y-4">
                  {q.options.map((opt: string, oIdx: number) => {
                    const isSelected = answers[q.id] === oIdx;
                    return (
                      <label
                        key={oIdx}
                        className={`flex items-start p-5 rounded-xl cursor-pointer transition-all border-2 ${isSelected
                          ? 'border-[#a70015] bg-red-50/50'
                          : 'border-transparent bg-white shadow-sm hover:border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          className="hidden"
                          checked={isSelected}
                          onChange={() => handleAnswer(q.id, oIdx)}
                        />
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mr-4 ${isSelected ? 'border-[#a70015]' : 'border-gray-300'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#a70015] rounded-full"></div>}
                        </div>
                        <span className={`text-lg ${isSelected ? 'font-semibold text-[#a70015]' : 'text-gray-700'}`}>
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6">
                  <RichTextEditor
                    id={q.id}
                    value={answers[q.id] || ''}
                    onChange={(val) => handleAnswer(q.id, val)}
                  />
                </div>
              )}

              <div className="mt-16 flex justify-between items-center pt-8 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Câu trước
                </Button>
                <Button
                  onClick={() => setCurrentQuestionIdx(prev => Math.min(exam.questions.length - 1, prev + 1))}
                  disabled={currentQuestionIdx === exam.questions.length - 1}
                  className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                >
                  Câu tiếp theo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </main>

          {/* Right Sidebar: Timer & Submit */}
          <aside className="w-72 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 p-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-sm border border-white mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Thời gian còn lại</p>
              <div className={`text-4xl font-black tabular-nums tracking-tight ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-[#a70015]'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="mt-auto">
              <Button
                className="w-full py-6 text-lg bg-[#a70015] hover:bg-[#8a0011] rounded-xl shadow-lg shadow-red-900/20"
                onClick={() => setShowSubmitModal(true)}
              >
                Nộp bài <Send className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </aside>
        </div>

        {/* Submit Confirmation Modal */}
        <Dialog open={showSubmitModal} onOpenChange={(open) => { if (!isSubmitting) setShowSubmitModal(open); }}>
          <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden border-none shadow-2xl">
            {isSubmitting ? (
              <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 border-4 border-red-200 border-t-[#a70015] rounded-full animate-spin mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-900">Đang nộp bài...</h3>
                <p className="text-gray-500">Vui lòng không đóng trình duyệt. Hệ thống đang mã hóa và lưu trữ bài làm của bạn một cách an toàn.</p>
              </div>
            ) : (
              <div className="p-6">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unansweredCount > 0 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                      {unansweredCount > 0 ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                    </div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">Xác nhận nộp bài</DialogTitle>
                  </div>
                  <DialogDescription className="text-base text-gray-600 leading-relaxed">
                    {unansweredCount > 0 ? (
                      <>Bạn còn <span className="font-bold text-red-600">{unansweredCount} câu</span> chưa hoàn thành. Bạn có chắc chắn muốn kết thúc bài thi ngay bây giờ?</>
                    ) : (
                      <>Bạn đã hoàn thành tất cả các câu hỏi. Bạn có muốn nộp bài ngay bây giờ?</>
                    )}
                  </DialogDescription>
                </DialogHeader>

                <div className="bg-gray-50 p-4 rounded-xl flex items-start gap-3 my-6">
                  <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-500">Sau khi nộp bài, bạn sẽ không thể chỉnh sửa đáp án hoặc quay lại bài thi này.</p>
                </div>

                <DialogFooter className="flex-col sm:flex-col gap-3">
                  <Button
                    onClick={handleFinalSubmit}
                    className="w-full py-6 text-lg bg-[#a70015] hover:bg-[#8a0011] rounded-xl"
                  >
                    Xác nhận nộp bài
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmitModal(false)}
                    className="w-full py-6 rounded-xl"
                  >
                    Quay lại làm tiếp
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
