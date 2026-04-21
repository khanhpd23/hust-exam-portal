import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import PageTransition from '@/components/PageTransition';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageTransition>
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('/images/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Lớp overlay làm mờ background */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>

        <div className="relative z-10 w-full max-w-[420px]">
          <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-xl rounded-[1.5rem] overflow-hidden">

            <CardHeader className="pt-8 pb-4 px-8 text-center space-y-3">
              <div className="flex flex-col items-center">
                <img src="/images/logo.png" alt="HUST Logo" className="w-12 h-20 mb-3 object-contain" />
                <div className="space-y-1">
                  <span className="font-bold text-xs tracking-[0.1em] text-[#a70015] block uppercase">
                    Đại học Bách khoa Hà Nội
                  </span>
                  <span className="font-bold text-[10px] tracking-wider text-gray-500 block uppercase">
                    Khoa Khoa học và Công nghệ giáo dục
                  </span>
                </div>
              </div>
              <div className="space-y-1 mt-4">
                <CardTitle className="text-xl font-black text-gray-900 tracking-tight">Đăng nhập</CardTitle>
                <CardDescription className="text-xs font-medium pb-1">
                  Sử dụng tài khoản được nhà trường cấp
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-6 space-y-5">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 tracking-wider uppercase ml-1">
                    Tên đăng nhập
                  </label>
                  <Input
                    type="text"
                    defaultValue="202500001"
                    placeholder="VD: 202500001"
                    className="h-11 px-4 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#a70015] focus-visible:border-[#a70015] font-medium text-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 tracking-wider uppercase ml-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      defaultValue="password"
                      placeholder="••••••••"
                      className="h-11 px-4 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#a70015] focus-visible:border-[#a70015] font-medium text-sm pr-11 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-[#a70015] hover:bg-[#8a0011] text-white rounded-xl text-sm font-bold transition-all shadow-sm mt-1 group"
                >
                  Đăng nhập
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </form>

              <div className="relative flex items-center py-1">
                <Separator className="flex-1" />
                <span className="mx-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Hoặc
                </span>
                <Separator className="flex-1" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <svg className="w-4 h-4" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                </svg>
                Microsoft
              </Button>
            </CardContent>

            <CardFooter className="bg-gray-50/50 p-4 flex justify-center border-t border-gray-100">
              <p className="text-[9px] text-gray-400 font-bold text-center leading-relaxed tracking-tighter">
                Phát triển bởi <span className="text-gray-500">Trung tâm Chuyển đổi số</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
