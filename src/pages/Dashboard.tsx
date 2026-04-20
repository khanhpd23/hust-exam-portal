import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, AlertCircle, CheckCircle2, Clock, Lock, ListChecks, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  return (
    <PageTransition skeleton={<DashboardSkeleton />}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <span className="text-[#a70015] font-bold tracking-widest text-xs uppercase mb-2 block">Xin chào, A!</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Màn hình chính</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-l-4 border-l-gray-300 shadow-sm">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 bg-gray-100 text-gray-600 flex items-center justify-center rounded-full">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Upcoming</p>
                <p className="text-2xl font-black">01</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#a70015] text-white border-none shadow-xl shadow-red-900/10">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 bg-white/20 flex items-center justify-center rounded-full">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-red-100 font-bold uppercase tracking-wider">Active Now</p>
                <p className="text-2xl font-black">03</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500 shadow-sm">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 bg-green-50 text-green-600 flex items-center justify-center rounded-full">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-black">02</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-xl font-bold mb-6 text-gray-900">Kỳ thi đang diễn ra</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.values(EXAMS_DATA).filter((e: any) => e.status === 'ongoing').map((exam: any) => (
            <Card
              key={exam.id}
              className="flex flex-col hover:shadow-xl hover:border-red-200 transition-all cursor-pointer overflow-hidden border-2 border-transparent"
              onClick={() => navigate(`/lobby/${exam.id}`)}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-red-50 text-[#a70015] hover:bg-red-50 font-black uppercase tracking-widest text-[10px] px-2.5 py-0.5">
                    <span className="w-1.5 h-1.5 bg-[#a70015] rounded-full animate-pulse mr-1.5"></span> Ongoing
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
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
                  onClick={(e) => { e.stopPropagation(); navigate(`/lobby/${exam.id}`); }}
                >
                  Vào phòng chờ <ArrowRight className="w-4 h-4 ml-2" />
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
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-black uppercase tracking-widest text-[10px] px-2.5 py-0.5">
                    Upcoming
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
