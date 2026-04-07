import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Video, Wifi, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EXAMS_DATA } from '@/lib/mock-data';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function LobbySkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
      <Skeleton className="h-10 w-48 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <Skeleton className="aspect-video w-full rounded-2xl" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function Lobby() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = EXAMS_DATA[examId || ''] || EXAMS_DATA['ed3280-mid'];
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [countdown, setCountdown] = useState(10);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const startCamera = async () => {
    setCameraError(null);
    setIsRetrying(true);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Trình duyệt không hỗ trợ API Camera.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(e => console.error("Error playing video:", e));
        };
        setCameraActive(true);
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      setCameraActive(false);
      if (err.name === 'NotAllowedError') {
        setCameraError("Vui lòng cấp quyền truy cập Camera trong trình duyệt.");
      } else if (err.name === 'NotFoundError') {
        setCameraError("Không tìm thấy thiết bị Camera nào.");
      } else {
        setCameraError(err.message || "Lỗi không xác định khi truy cập Camera.");
      }
    } finally {
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <PageTransition skeleton={<LobbySkeleton />}>
      <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
        <Button variant="ghost" className="mb-6 -ml-4 text-gray-500" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b border-gray-100 pb-6 mb-6">
                <CardTitle className="text-3xl font-black text-gray-900 mb-2">{exam.title}</CardTitle>
                <div className="flex gap-4 text-sm font-bold text-gray-500">
                  <span>{exam.type}</span>
                  <span>•</span>
                  <span>Thời gian: {exam.duration / 60} phút</span>
                  <span>•</span>
                  <span>{exam.format}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-8 h-8 text-[#a70015]" />
                  <h2 className="text-2xl font-bold tracking-tight">Quy chế phòng thi</h2>
                </div>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <div className="flex gap-4">
                    <span className="font-black text-[#a70015]">1.</span>
                    <p>Không sử dụng tài liệu dưới bất kỳ hình thức nào. Hệ thống giám sát AI sẽ ghi nhận mọi hành vi bất thường.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-black text-[#a70015]">2.</span>
                    <p>Không thoát trình duyệt hoặc chuyển đổi tab. Hệ thống sẽ tự động khóa bài thi nếu vi phạm quá 3 lần.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-black text-[#a70015]">3.</span>
                    <p>Camera và micro phải luôn được bật. Đảm bảo khuôn mặt luôn nằm trong khung hình.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50/50 border-blue-100 shadow-none">
              <CardContent className="p-6">
                <h3 className="font-bold text-blue-900 mb-4 text-sm uppercase tracking-wider">System Check</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <Video className={`w-5 h-5 ${cameraActive ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="text-sm font-semibold">
                      {cameraActive ? 'Camera OK' : cameraError ? 'Lỗi Camera' : 'Đang kiểm tra...'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <Wifi className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold">Network OK</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden ring-4 ring-gray-100 shadow-lg">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[10px] border-white/5 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-32 h-32 border-2 border-dashed border-green-400/50 rounded-full"></div>
              </div>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-8 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Thời gian bắt đầu</p>
                <div className="text-5xl font-black text-gray-900 mb-8 tabular-nums">
                  00:{countdown.toString().padStart(2, '0')}
                </div>
                <Button 
                  className="w-full py-6 text-lg bg-[#a70015] hover:bg-[#8a0011] rounded-xl shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `Vào thi sau ${countdown}s` : 'Bắt đầu làm bài'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
