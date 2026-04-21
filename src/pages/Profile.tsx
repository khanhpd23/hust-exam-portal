import React, { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, BookOpen, MapPin, Phone, Calendar, Camera, Save, Key, Shield, LogOut, CheckCircle2, Eye, EyeOff, Lock, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

function ProfileSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
      <div className="flex items-center gap-6">
        <Skeleton className="w-28 h-28 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-[400px]" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/images/avatar.jpg");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarUrl(event.target?.result as string);
        toast.success("Đã cập nhật ảnh đại diện thành công!");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const [formData, setFormData] = useState({
    phone: '0987 654 321',
    address: 'Hai Bà Trưng, Hà Nội',
    email: 'a.nv250001@sis.hust.edu.vn'
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Lưu thông tin thành công!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error('Vui lòng điền đầy đủ các trường');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    if (passwordData.new.length < 8) {
      toast.error('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    // Simulate API call
    toast.success('Cập nhật mật khẩu thành công!');
    setIsPasswordDialogOpen(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <PageTransition skeleton={<ProfileSkeleton />}>
      <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Trang cá nhân</h1>
        </div>

        {/* Profile Card Summary */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative group cursor-pointer z-10 shrink-0" onClick={triggerFileInput}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/*"
            />
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={avatarUrl} alt="Nguyễn Văn A" />
              <AvatarFallback className="text-4xl font-bold bg-slate-900 text-white">NV</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center md:text-left space-y-3 mt-2 md:mt-4 z-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Nguyễn Văn A</h2>
            <p className="text-lg text-gray-600 font-medium">Sinh viên năm 1 - Khoa Khoa học và Công nghệ giáo dục</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-bold border border-slate-200">
                MSSV: 202500001
              </div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-bold border border-gray-200">
                Lớp Công nghệ giáo dục 02 - K70
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for detailed content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gray-100/50 p-1 rounded-xl">
            <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 font-bold px-6 py-2.5">
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="academic" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 font-bold px-6 py-2.5">
              Thông tin học tập
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 font-bold px-6 py-2.5">
              Bảo mật
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-gray-200 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Thông tin liên hệ</CardTitle>
                    <CardDescription className="text-sm mt-1">Quản lý cách nhà trường và giảng viên có thể liên lạc với bạn.</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? 'default' : 'outline'}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={isEditing ? 'bg-slate-900 hover:bg-black text-white' : ''}
                  >
                    {isEditing ? <><Save className="w-4 h-4 mr-2" /> Lưu thay đổi</> : 'Chỉnh sửa'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email trường
                    </Label>
                    <Input
                      disabled
                      value={formData.email}
                      className="bg-gray-50 border-gray-200 text-gray-900 font-semibold h-12 rounded-xl opacity-80"
                    />
                    <p className="text-[10px] text-gray-400 font-medium">Email do trường cung cấp không thể thay đổi.</p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-4 h-4 text-transparent stroke-gray-400" /> Email cá nhân
                    </Label>
                    <Input
                      disabled={!isEditing}
                      defaultValue="nguyen.van.a@gmail.com"
                      className={`h-12 rounded-xl font-semibold ${isEditing ? 'border-indigo-600 ring-2 ring-indigo-100' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Số điện thoại
                    </Label>
                    <Input
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`h-12 rounded-xl font-semibold ${isEditing ? 'border-indigo-600 ring-2 ring-indigo-100' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Địa chỉ
                    </Label>
                    <Input
                      disabled={!isEditing}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`h-12 rounded-xl font-semibold ${isEditing ? 'border-indigo-600 ring-2 ring-indigo-100' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 px-8 py-6">
                <CardTitle className="text-xl font-bold text-gray-900">Chi tiết chương trình học</CardTitle>
                <CardDescription>Thông tin không thể chỉnh sửa và được đồng bộ từ phòng Đào tạo.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Chương trình đào tạo</p>
                        <p className="font-bold text-gray-900 text-lg">Công nghệ giáo dục 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Trường</p>
                        <p className="font-bold text-gray-900 text-lg">K70 - Khoa Khoa học và Công nghệ giáo dục</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Ngày nhập học</p>
                        <p className="font-bold text-gray-900 text-lg">15/09/2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Trạng thái học</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 font-bold">Đang học</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 px-8 py-6">
                <CardTitle className="text-xl font-bold text-gray-900">Bảo mật tài khoản</CardTitle>
                <CardDescription>Quản lý mật khẩu và các thiết lập an toàn cho tài khoản của bạn.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col gap-8 md:flex-row items-start md:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                      <Key className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Đổi mật khẩu</h4>
                      <p className="text-sm text-gray-500 mt-1">Đảm bảo mật khẩu của bạn là an toàn và ít nhất 8 ký tự với chữ số, chữ hoa.</p>
                    </div>
                  </div>

                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger render={
                      <Button variant="outline" className="rounded-xl font-bold h-11 shrink-0">
                        Cập nhật mật khẩu
                      </Button>
                    } />
                    <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden border-none shadow-2xl">
                      <div className="bg-slate-900 px-6 py-8 text-white text-center relative">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-3">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-white">Đổi mật khẩu</DialogTitle>
                        <DialogDescription className="text-slate-400 text-xs mt-1">
                          Sử dụng ít nhất 8 ký tự, bao gồm cả chữ và số.
                        </DialogDescription>
                      </div>

                      <form onSubmit={handleUpdatePassword} className="p-6 space-y-5">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mật khẩu hiện tại</Label>
                          <Input
                            type="password"
                            className="h-11 rounded-xl border-gray-200 focus:border-slate-900"
                            placeholder="••••••••"
                            value={passwordData.current}
                            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                          />
                        </div>

                        <Separator className="opacity-50" />

                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mật khẩu mới</Label>
                          <Input
                            type="password"
                            className="h-11 rounded-xl border-gray-200 focus:border-slate-900"
                            placeholder="••••••••"
                            value={passwordData.new}
                            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Xác nhận mật khẩu mới</Label>
                          <Input
                            type="password"
                            className="h-11 rounded-xl border-gray-200 focus:border-slate-900"
                            placeholder="••••••••"
                            value={passwordData.confirm}
                            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                          />
                        </div>

                        <DialogFooter className="pt-2 flex flex-col sm:flex-row gap-3">
                          <DialogClose render={
                            <Button type="button" variant="ghost" className="flex-1 rounded-xl font-bold">Hủy</Button>
                          } />
                          <Button type="submit" className="flex-1 bg-slate-900 hover:bg-black text-white rounded-xl font-bold">
                            Xác nhận đổi
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}


