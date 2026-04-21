import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { EXAMS_DATA } from '@/lib/mock-data';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Cloud, Bookmark, ArrowLeft, ArrowRight, Send, AlertCircle, CheckCircle2, Info,
  Bold, Italic, Underline, FileText, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Strikethrough, Eye, EyeOff, VideoOff, Video, Menu,
  Type, Palette, Highlighter, Eraser, Quote, ChevronDown, Heading1, Heading2, Heading3
} from 'lucide-react';

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
    // Replace block tags with space to ensure words in lists/divs are separated
    const text = html.replace(/<[^>]*>?/gm, ' ')
      .replace(/\s+/g, ' ')
      .trim();
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
      h1: document.queryCommandValue('formatBlock') === 'h1',
      h2: document.queryCommandValue('formatBlock') === 'h2',
      h3: document.queryCommandValue('formatBlock') === 'h3',
      h4: document.queryCommandValue('formatBlock') === 'h4',
      h5: document.queryCommandValue('formatBlock') === 'h5',
      blockquote: document.queryCommandValue('formatBlock') === 'blockquote',
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Only breakout of blockquote if we are NOT currently in a list (bullet or numbered)
      // This allows lists inside quotes to continue correctly without resetting numbers.
      if (document.queryCommandValue('formatBlock') === 'blockquote' && 
          !document.queryCommandState('insertUnorderedList') && 
          !document.queryCommandState('insertOrderedList')) {
        e.preventDefault();
        // Insert a new paragraph and force it to be 'p' (Normal)
        document.execCommand('insertParagraph');
        document.execCommand('formatBlock', false, 'p');
        handleInput();
      }
    }
  };

  const handleKeyUp = () => {
    checkFormats();
  };

  const handleMouseUp = () => {
    checkFormats();
  };

  const format = (command: string, val?: string) => {
    if (command === 'formatBlock') {
      // 1. Flatten the structure first by reverting to a standard paragraph
      // This prevents nested structures like <blockquote><h1>...</h1></blockquote>
      document.execCommand('formatBlock', false, 'p');

      if (val !== 'p') {
        // 2. Wrap the flattened text in the new block tag
        document.execCommand(command, false, val);
      } else {
        // Special cleanup for "Normal Text"
        document.execCommand('removeFormat', false, undefined);
        document.execCommand('formatBlock', false, 'p');
      }
    } else {
      document.execCommand(command, false, val);
    }

    editorRef.current?.focus();
    handleInput();
  };

  const handleClearFormatting = () => {
    // 1. Break out of Lists
    // Execute multiple times to handle nested or stubborn lists
    while (document.queryCommandState('insertUnorderedList')) {
      document.execCommand('insertUnorderedList', false, undefined);
    }
    while (document.queryCommandState('insertOrderedList')) {
      document.execCommand('insertOrderedList', false, undefined);
    }

    // 2. Break out of blockquotes and headers
    document.execCommand('formatBlock', false, 'p');
    document.execCommand('outdent', false, undefined); // In case it's treated as indentation

    // 3. Remove inline styles
    document.execCommand('removeFormat', false, undefined);

    // 4. Reset colors and background
    document.execCommand('foreColor', false, '#1f2937');
    document.execCommand('hiliteColor', false, 'transparent');

    // 5. Final pass for Normal block style
    document.execCommand('formatBlock', false, 'p');

    editorRef.current?.focus();
    handleInput();
  };

  const textColors = [
    { name: 'Mặc định', color: '#1f2937' },
    { name: 'Đỏ', color: '#ef4444' },
    { name: 'Xanh dương', color: '#3b82f6' },
    { name: 'Xanh lá', color: '#22c55e' },
    { name: 'Cam', color: '#f59e0b' },
    { name: 'Tím', color: '#a855f7' },
    { name: 'Xám', color: '#6b7280' },
  ];

  const highlightColors = [
    { name: 'Không màu', color: 'transparent' },
    { name: 'Vàng', color: '#fef08a' },
    { name: 'Xanh lá nhạt', color: '#bbf7d0' },
    { name: 'Xanh dương nhạt', color: '#bfdbfe' },
    { name: 'Đỏ nhạt', color: '#fecaca' },
    { name: 'Xám nhạt', color: '#f3f4f6' },
  ];

  const getCurrentStyle = () => {
    if (activeFormats.h1) return 'Title';
    if (activeFormats.h2) return 'Subtitle';
    if (activeFormats.h3) return 'Heading 1';
    if (activeFormats.h4) return 'Heading 2';
    if (activeFormats.h5) return 'Heading 3';
    if (activeFormats.blockquote) return 'Quote';
    return 'Normal';
  };

  const getStyleIcon = () => {
    if (activeFormats.h1 || activeFormats.h2 || activeFormats.h3 || activeFormats.h4 || activeFormats.h5) return <Type className="w-4 h-4" />;
    if (activeFormats.blockquote) return <Quote className="w-4 h-4" />;
    return <Type className="w-4 h-4" />;
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col h-full min-h-[450px] shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-300 transition-all">
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center">
        {/* Style Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm" className={`h-8 gap-1 px-2 text-xs font-semibold ${getCurrentStyle() !== 'Normal' ? 'bg-gray-200 text-gray-900 border-gray-300' : ''}`}>
              {getStyleIcon()}
              <span className="hidden sm:inline">{getCurrentStyle()}</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="px-2 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Main Styles</div>
            <DropdownMenuItem onClick={() => format('formatBlock', 'h1')} className={`font-black text-xl py-2 ${activeFormats.h1 ? 'bg-gray-100' : ''}`}>Title</DropdownMenuItem>
            <DropdownMenuItem onClick={() => format('formatBlock', 'h2')} className={`font-bold text-lg py-2 ${activeFormats.h2 ? 'bg-gray-100' : ''}`}>Subtitle</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Headings</div>
            <DropdownMenuItem onClick={() => format('formatBlock', 'h3')} className={`font-bold text-base ${activeFormats.h3 ? 'bg-gray-100' : ''}`}>Heading 1</DropdownMenuItem>
            <DropdownMenuItem onClick={() => format('formatBlock', 'h4')} className={`font-semibold text-sm ${activeFormats.h4 ? 'bg-gray-100' : ''}`}>Heading 2</DropdownMenuItem>
            <DropdownMenuItem onClick={() => format('formatBlock', 'h5')} className={`font-medium text-xs ${activeFormats.h5 ? 'bg-gray-100' : ''}`}>Heading 3</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => format('formatBlock', 'blockquote')} className={`italic border-l-2 border-gray-300 pl-2 ${activeFormats.blockquote ? 'bg-gray-100' : ''}`}>Quote</DropdownMenuItem>
            <DropdownMenuItem onClick={() => format('formatBlock', 'p')} className={getCurrentStyle() === 'Normal' ? 'bg-gray-100' : ''}>Normal Text</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Basic Formatting */}
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-colors ${activeFormats.bold ? 'bg-gray-200 text-gray-900 shadow-inner border border-gray-300' : ''}`}
          onClick={() => format('bold')}
          title="In đậm (Bold)"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-colors ${activeFormats.italic ? 'bg-gray-200 text-gray-900 shadow-inner border border-gray-300' : ''}`}
          onClick={() => format('italic')}
          title="In nghiêng (Italic)"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-colors ${activeFormats.underline ? 'bg-gray-200 text-gray-900 shadow-inner border border-gray-300' : ''}`}
          onClick={() => format('underline')}
          title="Gạch chân (Underline)"
        >
          <Underline className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Alignment */}
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => format('justifyLeft')} title="Căn trái"><AlignLeft className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => format('justifyCenter')} title="Căn giữa"><AlignCenter className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => format('justifyRight')} title="Căn phải"><AlignRight className="w-4 h-4" /></Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists */}
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => format('insertUnorderedList')} title="Danh sách điểm"><List className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => format('insertOrderedList')} title="Danh sách số"><ListOrdered className="w-4 h-4" /></Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Color Popovers */}
        <Popover>
          <PopoverTrigger>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Màu chữ">
              <Palette className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2" align="start">
            <div className="grid grid-cols-4 gap-1">
              {textColors.map((c) => (
                <button
                  key={c.color}
                  className="w-6 h-6 rounded-md border border-gray-200"
                  style={{ backgroundColor: c.color }}
                  onClick={() => format('foreColor', c.color)}
                  title={c.name}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Màu nền (Highlight)">
              <Highlighter className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2" align="start">
            <div className="grid grid-cols-4 gap-1">
              {highlightColors.map((c) => (
                <button
                  key={c.name}
                  className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: c.color }}
                  onClick={() => format('hiliteColor', c.color)}
                  title={c.name}
                >
                  {c.color === 'transparent' && <Eraser className="w-3 h-3 text-gray-400" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Clear Formatting */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleClearFormatting}
          title="Xóa định dạng"
        >
          <Eraser className="w-4 h-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        spellCheck="false"
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        onFocus={checkFormats}
        className="p-6 flex-1 outline-none overflow-y-auto prose max-w-none text-gray-800 leading-relaxed min-h-[350px]"
        style={{ fontFamily: 'Arial, sans-serif' }}
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
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isCameraVisible || !videoNode) return;

    let mediaStream: MediaStream | null = null;
    let isMounted = true;

    navigator.mediaDevices?.getUserMedia({ video: true })
      .then(stream => {
        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        mediaStream = stream;
        videoNode.srcObject = stream;
        videoNode.play().catch(console.error);
      })
      .catch(err => {
        if (!isMounted) return;
        toast.error('Lỗi Camera', { description: 'Không thể truy cập camera giám sát.' });
      });

    return () => {
      isMounted = false;
      if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
      if (videoNode.srcObject) videoNode.srcObject = null;
    };
  }, [isCameraVisible, videoNode]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitting) {
      handleFinalSubmit();
    }
  }, [timeLeft, isSubmitting]);

  useEffect(() => {
    if (timeLeft === 60 && !isSubmitting) {
      toast.error('Cảnh báo thời gian', {
        description: 'Thời gian làm bài còn lại ít hơn 1 phút!',
        duration: 7000,
        position: 'top-center'
      });
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

  const renderInfoAndCamera = () => (
    <>
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Thông tin bài thi</h3>
        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">{exam.title}</h2>
        <p className="text-sm font-bold text-[#a70015]">{exam.type}</p>
        <div className="mt-4 space-y-2 text-sm text-gray-600 font-medium">
          <p>• {exam.format}</p>
          <p>• Thời gian: {exam.duration / 60} phút</p>
          <p className="text-amber-600 font-bold">• Có giám sát AI</p>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Camera Giám Sát</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-gray-500 hover:text-gray-900"
            onClick={() => setIsCameraVisible(!isCameraVisible)}
            title={isCameraVisible ? "Ẩn camera giám sát" : "Hiện camera giám sát"}
          >
            {isCameraVisible ? <EyeOff className="w-4 h-4 mr-1.5" /> : <Eye className="w-4 h-4 mr-1.5" />}
            {isCameraVisible ? "Ẩn" : "Hiện"}
          </Button>
        </div>

        {isCameraVisible ? (
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-inner ring-2 ring-gray-200">
            <video
              ref={setVideoNode}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
            />
            <div className="absolute inset-0 border-[4px] border-white/5 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 border border-dashed border-green-400/50 rounded-full"></div>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Đang ghi hình
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200">
            <VideoOff className="w-8 h-8 mb-2 opacity-30" />
            <span className="text-xs font-semibold">Camera đang ẩn</span>
          </div>
        )}
      </div>
    </>
  );

  const renderNavigator = () => (
    <>
      <div className="p-5 border-b border-gray-200 shrink-0 bg-white sticky top-0 z-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Bảng câu hỏi</h3>
        <p className="text-sm font-medium text-gray-600">
          Đã làm: <span className="font-bold text-[#a70015]">{Object.keys(answers).filter(k => isQuestionAnswered(Number(k))).length}</span>/{exam.questions.length}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-24 lg:pb-5">
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

        <div className="mt-6 space-y-2 text-xs font-medium text-gray-600 shrink-0">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-800 rounded-sm"></div> Đã trả lời</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border-2 border-gray-200 rounded-sm"></div> Chưa trả lời</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-50 border-2 border-amber-400 rounded-sm"></div> Đánh dấu xem lại</div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Câu hỏi tự luận</div>
        </div>
      </div>

      <div className="p-5 border-t border-gray-200 shrink-0 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] sticky bottom-0 z-10 hidden lg:block">
        <div className="bg-gray-50 rounded-2xl p-4 text-center shadow-inner border border-gray-100 mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Thời gian còn lại</p>
          <div className={`text-4xl font-black tabular-nums tracking-tight transition-opacity ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-[#a70015]'} ${!isTimerVisible ? 'opacity-30' : ''}`}>
            {isTimerVisible ? formatTime(timeLeft) : '- - : - -'}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsTimerVisible(!isTimerVisible)}
          className="w-full mb-4 rounded-xl text-gray-500 hover:text-gray-700 bg-white shadow-sm"
        >
          {isTimerVisible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {isTimerVisible ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
        </Button>

        <Button
          className="w-full py-6 text-lg bg-[#a70015] hover:bg-[#8a0011] rounded-xl shadow-lg shadow-red-900/20"
          onClick={() => setShowSubmitModal(true)}
        >
          Nộp bài <Send className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <div className="p-5 border-t border-gray-200 shrink-0 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] block lg:hidden">
        <Button
          className="w-full py-6 text-lg bg-[#a70015] hover:bg-[#8a0011] rounded-xl shadow-lg shadow-red-900/20"
          onClick={() => setShowSubmitModal(true)}
        >
          Nộp bài <Send className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </>
  );

  return (
    <PageTransition skeleton={<ExamSkeleton />}>
      <div className="h-screen flex flex-col bg-[#f8f9fa] overflow-hidden selection:bg-red-100 selection:text-red-900">
        {/* Mobile Header elements adjustments automatically inherited from tailwind */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex flex-wrap justify-between items-center shrink-0 z-10 gap-3">
          <div className="flex items-center gap-6">
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
          {/* Left Sidebar: Info & Camera (Desktop) */}
          <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col shrink-0 min-h-0 overflow-y-auto p-6 space-y-6">
            {renderInfoAndCamera()}
          </aside>

          {/* Center: Question Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative bg-white pb-32 lg:pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
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
                  {flagged[q.id] ? 'Đã đánh dấu' : 'Đánh dấu xem'}
                </Button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 leading-relaxed mb-8">
                {q.text}
              </h2>

              {q.type === 'mcq' ? (
                <div className="space-y-4">
                  {q.options.map((opt: string, oIdx: number) => {
                    const isSelected = answers[q.id] === oIdx;
                    return (
                      <label
                        key={oIdx}
                        className={`flex items-start p-4 md:p-5 rounded-xl cursor-pointer transition-all border-2 ${isSelected
                          ? 'border-[#a70015] bg-red-50/50'
                          : 'border-transparent bg-gray-50 shadow-sm hover:border-gray-200 hover:bg-gray-100'
                          }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          className="hidden"
                          checked={isSelected}
                          onChange={() => handleAnswer(q.id, oIdx)}
                        />
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mr-4 transition-colors ${isSelected ? 'border-[#a70015]' : 'border-gray-300 bg-white'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#a70015] rounded-full"></div>}
                        </div>
                        <span className={`text-base md:text-lg ${isSelected ? 'font-semibold text-[#a70015]' : 'text-gray-700'}`}>
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

              <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="rounded-xl w-full sm:w-auto mb-2 sm:mb-0 mr-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 hidden sm:inline" /> Câu trước
                </Button>
                <Button
                  onClick={() => setCurrentQuestionIdx(prev => Math.min(exam.questions.length - 1, prev + 1))}
                  disabled={currentQuestionIdx === exam.questions.length - 1}
                  className="rounded-xl bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto ml-2"
                >
                  Câu tiếp <ArrowRight className="w-4 h-4 ml-2 hidden sm:inline" />
                </Button>
              </div>
            </div>
          </main>

          {/* Right Sidebar: Navigator, Timer & Submit (Desktop) */}
          <aside className="hidden lg:flex w-80 bg-gray-50 border-l border-gray-200 flex-col shrink-0 min-h-0 relative">
            {renderNavigator()}
          </aside>
        </div>

        {/* Mobile Bottom Navigation Bar (Phone Only) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 p-3 sm:p-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
            {/* Info & Camera Sheet Trigger */}
            <Sheet>
              <SheetTrigger render={
                <Button variant="outline" size="icon" className="shrink-0 rounded-xl h-12 w-12" title="Thông tin & Camera">
                  <Menu className="w-5 h-5 text-gray-600" />
                </Button>
              } />
              <SheetContent side="left" className="w-[85vw] max-w-[340px] p-0 overflow-y-auto">
                <div className="min-h-full bg-white flex flex-col p-6 space-y-6">
                  {renderInfoAndCamera()}
                </div>
              </SheetContent>
            </Sheet>

            {/* Timer Toggle Area */}
            <div className="flex-1 bg-gray-50 rounded-xl p-2 h-12 text-center shadow-inner border border-gray-100 flex items-center justify-between px-4 min-w-[150px]">
              <div className={`text-xl font-black tabular-nums tracking-tight transition-opacity ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-[#a70015]'} ${!isTimerVisible ? 'opacity-30' : ''}`}>
                {isTimerVisible ? formatTime(timeLeft) : '- - : - -'}
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsTimerVisible(!isTimerVisible)}>
                {isTimerVisible ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </Button>
            </div>

            {/* Navigation Sheet Trigger */}
            <Sheet>
              <SheetTrigger render={
                <Button variant="outline" size="icon" className="shrink-0 rounded-xl bg-gray-900 border-gray-900 hover:bg-gray-800 text-white h-12 w-12" title="Bảng câu hỏi">
                  <List className="w-5 h-5" />
                </Button>
              } />
              <SheetContent side="right" className="w-[90vw] max-w-[380px] p-0 flex flex-col bg-gray-50">
                {renderNavigator()}
              </SheetContent>
            </Sheet>
          </div>
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
