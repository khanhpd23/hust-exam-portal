import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EXAMS_DATA } from '@/lib/mock-data';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function ReceiptSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function Receipt() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = EXAMS_DATA[examId || ''] || EXAMS_DATA['ed3280-mid'];

  return (
    <PageTransition skeleton={<ReceiptSkeleton />}>
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-100/50 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-2xl z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="text-green-600 w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Nộp bài thành công!</h1>
            <p className="text-gray-500 text-lg">Hệ thống đã ghi nhận bài làm của bạn một cách an toàn.</p>
          </div>

          <Card className="overflow-hidden shadow-xl shadow-gray-200/50 border-none">
            <CardHeader className="p-8 border-b border-gray-100 bg-gray-50/50 flex flex-row justify-between items-center space-y-0">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#a70015] uppercase block mb-1">Biên lai xác nhận</span>
                <CardTitle className="text-xl font-bold text-gray-900">Chi tiết nộp bài</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-none">
                Hoàn tất
              </Badge>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Học phần</label>
                    <p className="text-lg font-semibold text-gray-900">{exam.title}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Thời gian nộp</label>
                    <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}, Hôm nay</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 flex flex-col items-center gap-4 border-t border-gray-100">
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  className="w-full py-6 text-lg bg-[#a70015] hover:bg-[#8a0011] rounded-xl"
                >
                  Về trang chủ (Dashboard)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
