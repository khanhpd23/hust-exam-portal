import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  Hash,
  Clock,
  CalendarDays,
  ShieldCheck,
  ArrowRight,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EXAMS_DATA } from '@/lib/mock-data';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { motion } from 'motion/react';

function SuccessSkeleton() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    </div>
  );
}

export default function SubmissionSuccess() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = EXAMS_DATA[examId || ''] || EXAMS_DATA['ed3280-mid'];

  const toastFired = React.useRef(false);
  useEffect(() => {
    if (!toastFired.current) {
      toast.success('Dữ liệu bài thi đã được lưu trữ an toàn.');
      toastFired.current = true;
    }
  }, []);

  const sessionToken = (Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)).toUpperCase();
  const now = new Date();

  return (
    <PageTransition skeleton={<SuccessSkeleton />}>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-900">

        <div className="w-full max-w-xl z-10 space-y-8">
          {/* Status Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100"
            >
              <CheckCircle2 className="text-slate-900 w-10 h-10" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nộp bài thành công</h1>
              <p className="text-slate-500 font-medium">Hệ thống đã xác nhận bài làm của bạn.</p>
            </div>
          </div>

          <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thông tin phiên làm bài</p>
                  <CardTitle className="text-xl font-bold">{exam.title}</CardTitle>
                </div>
                <Badge variant="outline" className="border-slate-200 bg-white text-slate-600 font-bold px-3 py-1 text-[10px] uppercase">
                  Confirmed
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã sinh viên</Label>
                  <p className="font-bold text-slate-900">202500001</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời điểm nộp</Label>
                  <p className="font-bold text-slate-900">{now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {now.toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phương thức</Label>
                  <p className="font-bold text-slate-900">Trực tuyến</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái an toàn</Label>
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Hợp lệ</span>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã định danh phiên (Session ID)</Label>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm font-mono font-bold text-slate-700">
                  {sessionToken}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all"
                >
                  Quay về trang chủ
                </Button>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-slate-200 font-bold"
                    onClick={() => navigate('/dashboard/history')}
                  >
                    Xem lịch sử
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}

// Minimal internal component for labels
function Label({ className, children }: { className?: string, children: React.ReactNode }) {
  return <p className={className}>{children}</p>;
}
