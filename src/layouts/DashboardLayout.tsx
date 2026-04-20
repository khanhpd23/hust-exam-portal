import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, History, LogOut, GraduationCap, FileWarning, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Màn hình chính', path: '/dashboard' },
    { icon: User, label: 'Trang cá nhân', path: '/dashboard/profile' },
    { icon: GraduationCap, label: 'Điểm thi', path: '/dashboard/grades' },
    { icon: History, label: 'Lịch sử thi', path: '/dashboard/history' },
    { icon: FileWarning, label: 'Phúc khảo', path: '/dashboard/appeals' },
  ];

  return (
    <div className="h-screen bg-gray-50/50 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <Link to="/dashboard" className="h-20 flex items-center px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
          <img src="/images/logo.png" alt="HUST" className="w-10 h-14 mr-3 object-contain" />
          <div className="flex flex-col">
            <span className="font-medium text-[10px] leading-tight text-[#a70015]">ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
            <span className="font-bold text-[10px] leading-tight text-[#a70015]">KHOA KHOA HỌC &<br />CÔNG NGHỆ GIÁO DỤC</span>
          </div>
        </Link>

        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard');
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start ${isActive ? 'bg-red-50 text-[#a70015] hover:bg-red-50' : 'text-gray-600'}`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <Link to="/dashboard/profile" className="flex items-center gap-3 px-2 mb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              NV
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Nguyễn Văn A</span>
              <span className="text-xs text-gray-500">20250001</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden">
          <Link to="/dashboard" className="flex items-center">
            <img src="/images/logo.png" alt="HUST" className="w-8 h-12 mr-2 object-contain" />
            <div className="flex flex-col">
              <span className="font-medium text-[8px] leading-tight text-[#a70015]">ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
              <span className="font-bold text-[8px] leading-tight text-[#a70015]">KHOA KHOA HỌC &<br />CÔNG NGHỆ GIÁO DỤC</span>
            </div>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setShowLogoutDialog(true)}>
            <LogOut className="w-5 h-5 text-gray-600" />
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
            <AlertDialogDescription>
              Phiên làm việc của bạn sẽ kết thúc. Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate('/')} className="bg-[#a70015] hover:bg-[#8a0011]">Đăng xuất</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
