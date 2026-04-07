import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageTransition from '@/components/PageTransition';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="w-full max-w-[440px]">
          <Card className="relative overflow-hidden border-none shadow-2xl shadow-gray-200/50">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#a70015] to-[#ce1e26]"></div>
            <CardContent className="p-10">
              <div className="flex flex-col items-center mb-10">
                <img src="/images/logo.png" alt="HUST Logo" className="w-16 h-24 mb-4 object-contain" />
                <div className="flex flex-col items-center text-center">
                  <span className="font-medium text-sm leading-tight text-[#a70015]">ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
                  <span className="font-bold text-sm leading-tight text-[#a70015]">KHOA KHOA HỌC & CÔNG NGHỆ GIÁO DỤC</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 tracking-wider uppercase">MSSV</label>
                  <Input 
                    type="text" 
                    defaultValue="202500001"
                    className="px-4 py-6 bg-gray-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-red-500/20 font-medium text-base" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 tracking-wider uppercase">Mật khẩu</label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      defaultValue="password"
                      className="px-4 py-6 bg-gray-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-red-500/20 font-medium text-base pr-12" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button 
                  className="w-full py-6 mt-4 bg-[#a70015] hover:bg-[#8a0011] text-white rounded-xl text-base font-bold shadow-lg shadow-red-900/20" 
                  onClick={() => navigate('/dashboard')}
                >
                  Đăng nhập <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
