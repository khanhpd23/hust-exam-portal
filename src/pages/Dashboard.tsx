import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  AlertCircle,
  CheckCircle2,
  Clock,
  Lock,
  ListChecks,
  ArrowRight,
  Calendar,
  HelpCircle,
  Monitor,
  Camera,
  Layout,
  MousePointer2,
  BookOpen,
  Info,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EXAMS_DATA } from '@/lib/mock-data';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-12">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const ongoingExamsCount = Object.values(EXAMS_DATA).filter((e: any) => e.status === 'ongoing').length;

  return (
    <PageTransition skeleton={<DashboardSkeleton />}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <span className="text-[#a70015] font-bold tracking-widest text-l mb-2 block">Xin chào, A!</span>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Màn hình chính</h1>
          </div>

          <Dialog>
            <DialogTrigger render={
              <Button
                variant="outline"
                className="rounded-xl bg-white border-gray-200 hover:bg-gray-50 flex items-center gap-2 shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-[#a70015]" />
                <span className="font-bold">Cần trợ giúp?</span>
              </Button>
            } />
            <DialogContent showCloseButton={false} className="sm:max-w-2xl rounded-2xl p-0 overflow-hidden border-none shadow-2xl">
              <div className="bg-[#a70015] px-6 py-8 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <HelpCircle className="w-32 h-32" />
                </div>
                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-2xl font-black text-white">Hướng dẫn Giao diện Thi</DialogTitle>
                  <DialogDescription className="text-red-100 text-sm mt-2">
                    Làm quen với các thành phần trong phòng thi trực tuyến HUST Exam Portal.
                  </DialogDescription>
                </DialogHeader>
                <DialogClose render={
                  <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full h-8 w-8" />
                }>
                  <X className="w-5 h-5" />
                </DialogClose>
              </div>

              <ScrollArea className="max-h-[60vh]">
                <div className="p-8 space-y-8">
                  {/* Section 1: Sidebars */}
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
                      <Layout className="w-6 h-6 text-[#a70015]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        Thanh công cụ hai bên
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Phía bên trái chứa <span className="font-bold">Thông tin bài thi</span> và <span className="font-bold text-[#a70015]">Camera giám sát</span>. Phía bên phải là <span className="font-bold text-blue-600">Bảng điều hướng</span> giúp bạn di chuyển nhanh giữa các câu hỏi.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Section 2: Editor */}
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                      <MousePointer2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900">Trả lời câu hỏi</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Đối với câu hỏi trắc nghiệm, hãy click chọn phương án đúng. Với câu hỏi tự luận, hãy sử dụng <span className="font-bold">Trình soạn thảo văn bản</span> ở giữa để nhập nội dung. Hệ thống sẽ <span className="text-green-600 font-bold underline">tự động lưu</span> bài làm của bạn mỗi khi có thay đổi.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Section 3: Monitoring */}
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 border border-amber-100">
                      <Camera className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900">Giám sát & Chế độ tập trung</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Đảm bảo Camera của bạn luôn bật và khuôn mặt nằm trong khung hình. Nếu muốn tập trung tối đa, hãy nhấn nút <span className="font-bold text-gray-900">"Toàn màn hình"</span> để ẩn bớt các thanh công cụ phụ trợ.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Section 4: Submission */}
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0 border border-green-100">
                      <Monitor className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 text-destructive">Nộp bài & Kết thúc</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Khi hoàn thành, nhấn nút <span className="font-bold text-red-600">"Nộp bài"</span> ở bảng bên phải. Nếu hết giờ làm bài, hệ thống sẽ <span className="font-bold">tự động khóa và nộp bài</span> thay cho thí sinh.
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                    <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed italic">
                      Lưu ý quan trọng: Tuyệt đối không thoát trình duyệt, chuyển tab hoặc mở ứng dụng khác trong khi thi để tránh bị hệ thống đình chỉ thi tự động.
                    </p>
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
                <DialogClose render={<Button className="w-full sm:w-auto bg-[#a70015] hover:bg-[#8a0011] text-white rounded-xl px-10 transition-all shadow-md" />}>
                  Đã hiểu, sẵn sàng thi
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {ongoingExamsCount > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 text-amber-600">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">Bạn có <span className="text-amber-600 font-black">{ongoingExamsCount} bài thi</span> đang chờ hoàn thành!</h3>
                <p className="text-sm font-medium text-gray-600 mt-0.5">Hãy tiếp tục làm bài để đảm bảo tiến độ học tập nhé.</p>
              </div>
            </div>
            <Button
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold h-11 px-8 shadow-md shadow-amber-900/10 hover:shadow-lg transition-all relative z-10 shrink-0 border-none"
              onClick={() => {
                document.getElementById('ongoing-exams')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Xem ngay <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {/* Card 1: Upcoming */}
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 bg-gray-50 text-gray-500 flex items-center justify-center rounded-xl border border-gray-100">
                <CalendarDays className="w-5 h-5" />
              </div>
            </div>
            <p className="text-5xl font-black text-gray-900 tracking-tight mb-1">01</p>
            <p className="text-sm font-semibold text-gray-500">bài thi sắp diễn ra</p>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-50 rounded-full blur-2xl -mr-8 -mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          {/* Card 2: Pending — highlighted */}
          <div className="relative bg-[#a70015] rounded-2xl shadow-xl shadow-red-900/20 p-6 overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-black/10 rounded-full -ml-10 -mb-10 pointer-events-none"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-11 h-11 bg-white/15 text-white flex items-center justify-center rounded-xl">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-200">Ưu tiên</span>
            </div>
            <p className="text-5xl font-black tracking-tight mb-1 relative z-10">03</p>
            <p className="text-sm font-semibold text-red-100 relative z-10">bài thi cần hoàn thành</p>
          </div>

          {/* Card 3: Completed */}
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 bg-green-50 text-green-600 flex items-center justify-center rounded-xl border border-green-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-5xl font-black text-gray-900 tracking-tight mb-1">02</p>
            <p className="text-sm font-semibold text-gray-500">bài thi đã hoàn thành</p>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-50 rounded-full blur-2xl -mr-8 -mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        <h3 id="ongoing-exams" className="text-xl font-bold mb-6 text-gray-900 scroll-mt-24">Kỳ thi đang diễn ra</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.values(EXAMS_DATA).filter((e: any) => e.status === 'ongoing').map((exam: any) => (
            <Card
              key={exam.id}
              className="flex flex-col hover:shadow-xl hover:border-red-200 transition-all cursor-pointer overflow-hidden border-2 border-transparent"
              onClick={() => navigate(`/lobby/${exam.id}`)}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-red-50 text-[#a70015] hover:bg-red-50 font-black uppercase tracking-widest text-xs px-2.5 py-1">
                    <span className="w-1.5 h-1.5 bg-[#a70015] rounded-full animate-pulse mr-1.5"></span> Đang diễn ra
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{exam.title}</CardTitle>
                <p className="text-sm font-bold text-[#a70015] mt-1">{exam.type}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2.5 text-sm text-gray-600 font-medium mb-6">
                  <p className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-gray-400" /> Ngày thi: {exam.date}</p>
                  <p className="flex items-center gap-2.5"><ListChecks className="w-4 h-4 text-gray-400" /> Hình thức: {exam.format}</p>
                  <p className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-gray-400" /> {exam.duration / 60} phút</p>
                  <p className="flex items-center gap-2.5"><Lock className="w-4 h-4 text-gray-400" /> Giám sát AI</p>
                </div>
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-base font-bold h-12 shadow-md hover:shadow-lg transition-all"
                  onClick={(e) => { e.stopPropagation(); navigate(`/lobby/${exam.id}`); }}
                >
                  Làm bài ngay <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-6 text-gray-900">Kỳ thi sắp tới</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(EXAMS_DATA).filter((e: any) => e.status === 'upcoming').map((exam: any) => (
            <Card
              key={exam.id}
              className="flex flex-col opacity-75 grayscale-[0.2] cursor-not-allowed"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-black uppercase tracking-widest text-xs px-2.5 py-1">
                    Sắp diễn ra
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{exam.title}</CardTitle>
                <p className="text-sm font-bold text-gray-500 mt-1">{exam.type}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2.5 text-sm text-gray-600 font-medium mb-6">
                  <p className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-gray-400" /> Ngày thi: {exam.date}</p>
                  <p className="flex items-center gap-2.5"><ListChecks className="w-4 h-4 text-gray-400" /> Hình thức: {exam.format}</p>
                  <p className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-gray-400" /> {exam.duration / 60} phút</p>
                  <p className="flex items-center gap-2.5"><Lock className="w-4 h-4 text-gray-400" /> Giám sát AI</p>
                </div>
                <Button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 rounded-xl"
                >
                  Chưa đến giờ thi
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
