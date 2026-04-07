import React from 'react';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, BookOpen, MapPin, Phone, Calendar } from 'lucide-react';

function ProfileSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8">
      <div className="flex items-center gap-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-6">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Profile() {
  return (
    <PageTransition skeleton={<ProfileSkeleton />}>
      <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <span className="text-[#a70015] font-bold tracking-widest text-xs uppercase mb-2 block">Student Workspace</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Trang cá nhân</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500 shrink-0">
            NV
          </div>
          <div className="text-center md:text-left space-y-2 mt-4 md:mt-0">
            <h2 className="text-3xl font-bold text-gray-900">Nguyễn Văn A</h2>
            <p className="text-lg text-gray-500 font-medium">Sinh viên năm 3 • Viện Công nghệ Thông tin và Truyền thông</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-bold mt-2">
              Trạng thái: Đang học
            </div>
          </div>
        </div>

        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Thông tin chi tiết</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" /> Mã số sinh viên
                </label>
                <p className="text-lg font-semibold text-gray-900">20210001</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email trường
                </label>
                <p className="text-lg font-semibold text-gray-900">a.nv210001@sis.hust.edu.vn</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Chương trình đào tạo
                </label>
                <p className="text-lg font-semibold text-gray-900">Khoa học Máy tính 2021</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Khóa học
                </label>
                <p className="text-lg font-semibold text-gray-900">K66</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Số điện thoại
                </label>
                <p className="text-lg font-semibold text-gray-900">0987 654 321</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Địa chỉ
                </label>
                <p className="text-lg font-semibold text-gray-900">Hai Bà Trưng, Hà Nội</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
