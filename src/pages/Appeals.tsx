import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APPEALS_DATA, GRADES_DATA } from '@/lib/mock-data';
import {
  FileWarning,
  Plus,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  FileText,
  Info,
  AlertTriangle,
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function AppealsSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-44" />
        </div>
        <Skeleton className="h-10 w-48 rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-40 rounded" />
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
    </div>
  );
}

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  'Đang xử lý': {
    label: 'Đang xử lý',
    icon: <Clock className="w-3 h-3" />,
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  'Đã chấp nhận': {
    label: 'Đã chấp nhận',
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  'Đã từ chối': {
    label: 'Đã từ chối',
    icon: <XCircle className="w-3 h-3" />,
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

interface Appeal {
  id: string;
  subject: string;
  type: string;
  date: string;
  status: string;
  reason: string;
}

export default function Appeals() {
  const [appeals, setAppeals] = useState<Appeal[]>(APPEALS_DATA as Appeal[]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formSubject, setFormSubject] = useState('');
  const [formType, setFormType] = useState('');
  const [formReason, setFormReason] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pendingCount = appeals.filter(a => a.status === 'Đang xử lý').length;
  const acceptedCount = appeals.filter(a => a.status === 'Đã chấp nhận').length;

  const resetForm = () => {
    setFormSubject('');
    setFormType('');
    setFormReason('');
    setFormDetails('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formSubject) newErrors.subject = 'Vui lòng chọn môn học.';
    if (!formType) newErrors.type = 'Vui lòng chọn loại kỳ thi.';
    if (!formReason.trim()) newErrors.reason = 'Vui lòng nhập lý do phúc khảo.';
    else if (formReason.trim().length < 20) newErrors.reason = 'Lý do quá ngắn, vui lòng mô tả chi tiết hơn (ít nhất 20 ký tự).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAppeals(prev => [{
        id: `a${Date.now()}`,
        subject: formSubject,
        type: formType,
        date: new Date().toLocaleDateString('vi-VN'),
        status: 'Đang xử lý',
        reason: formReason.trim(),
      }, ...prev]);
      setIsSubmitting(false);
      setShowForm(false);
      setShowSuccess(true);
      resetForm();
    }, 1200);
  };

  return (
    <PageTransition skeleton={<AppealsSkeleton />}>
      <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[#a70015] font-bold tracking-widest text-sm uppercase block mb-2">
              Student Workspace
            </span>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Phúc khảo</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Quản lý và theo dõi các yêu cầu phúc khảo điểm thi của bạn.
            </p>
          </div>
          <Button
            className="bg-[#a70015] hover:bg-[#8a0011] text-white rounded-xl shadow-md shadow-red-900/20 shrink-0"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Tạo đơn phúc khảo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <Card className="rounded-2xl shadow-sm border-border">
            <CardContent className="p-5 text-center">
              <div className="text-3xl font-black text-foreground tabular-nums">{appeals.length}</div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mt-1">Tổng đơn</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm bg-amber-50 border-amber-100">
            <CardContent className="p-5 text-center">
              <div className="text-3xl font-black text-amber-700 tabular-nums">{pendingCount}</div>
              <div className="text-sm font-bold text-amber-500 uppercase tracking-wider mt-1">Đang xử lý</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm bg-green-50 border-green-100">
            <CardContent className="p-5 text-center">
              <div className="text-3xl font-black text-green-700 tabular-nums">{acceptedCount}</div>
              <div className="text-sm font-bold text-green-500 uppercase tracking-wider mt-1">Đã chấp nhận</div>
            </CardContent>
          </Card>
        </div>

        {/* Appeals List */}
        {appeals.length === 0 ? (
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-16 text-center">
              <FileWarning className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-semibold mb-1">Bạn chưa có đơn phúc khảo nào.</p>
              <p className="text-sm text-muted-foreground/60 mb-6">Tạo đơn để bắt đầu yêu cầu phúc khảo điểm thi.</p>
              <Button className="bg-[#a70015] hover:bg-[#8a0011] text-white rounded-xl" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" /> Tạo đơn đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
              Lịch sử đơn ({appeals.length})
            </h2>
            {appeals.map((item, index) => {
              const statusCfg = STATUS_CONFIG[item.status] ?? STATUS_CONFIG['Đang xử lý'];
              return (
                <Card
                  key={item.id}
                  className="rounded-2xl shadow-sm hover:shadow-md transition-shadow border-border"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-foreground leading-snug">{item.subject}</h3>
                          <Badge
                            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1.5 ${statusCfg.className}`}
                          >
                            {statusCfg.icon} {statusCfg.label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" /> {item.date}
                          </span>
                          <Separator orientation="vertical" className="h-3.5" />
                          <span>{item.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 bg-muted/40 rounded-xl px-4 py-3 border border-border/60">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">Lý do: </span>{item.reason}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== Create Appeal Dialog ===== */}
      <Dialog open={showForm} onOpenChange={(open) => { if (!open && !isSubmitting) { setShowForm(false); resetForm(); } }}>
        <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden border-none shadow-2xl gap-0">
          {/* Custom colored header */}
          <div className="bg-gradient-to-r from-[#a70015] to-[#c0001a] px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white">Tạo đơn phúc khảo</DialogTitle>
                <DialogDescription className="text-white/70 text-xs mt-0.5">
                  Điền đầy đủ thông tin để gửi yêu cầu phúc khảo
                </DialogDescription>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            {/* Info banner */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3.5">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Đơn phúc khảo sẽ được hội đồng xét duyệt trong vòng{' '}
                <span className="font-bold">5–7 ngày làm việc</span>. Vui lòng cung cấp lý do cụ thể, rõ ràng.
              </p>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <Label htmlFor="subject" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Môn học <span className="text-destructive">*</span>
              </Label>
              <Select value={formSubject} onValueChange={(v) => { setFormSubject(v); setErrors(p => ({ ...p, subject: '' })); }}>
                <SelectTrigger
                  id="subject"
                  className={`rounded-xl h-10 ${errors.subject ? 'border-destructive ring-1 ring-destructive' : ''}`}
                >
                  <SelectValue placeholder="Chọn môn học..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {GRADES_DATA.map(g => (
                    <SelectItem key={g.id} value={g.subject}>{g.subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-xs text-destructive flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" /> {errors.subject}
                </p>
              )}
            </div>

            {/* Exam type */}
            <div className="space-y-1.5">
              <Label htmlFor="examType" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Loại kỳ thi <span className="text-destructive">*</span>
              </Label>
              <Select value={formType} onValueChange={(v) => { setFormType(v); setErrors(p => ({ ...p, type: '' })); }}>
                <SelectTrigger
                  id="examType"
                  className={`rounded-xl h-10 ${errors.type ? 'border-destructive ring-1 ring-destructive' : ''}`}
                >
                  <SelectValue placeholder="Chọn loại kỳ thi..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Thi giữa kỳ">Thi giữa kỳ</SelectItem>
                  <SelectItem value="Thi cuối kỳ">Thi cuối kỳ</SelectItem>
                  <SelectItem value="Thi lại">Thi lại</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-destructive flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" /> {errors.type}
                </p>
              )}
            </div>

            {/* Reason */}
            <div className="space-y-1.5">
              <Label htmlFor="reason" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Lý do phúc khảo <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="reason"
                rows={3}
                placeholder="Mô tả lý do bạn yêu cầu phúc khảo (ví dụ: Câu 5 tự luận có thể bị chấm sót...)"
                value={formReason}
                onChange={e => { setFormReason(e.target.value); setErrors(p => ({ ...p, reason: '' })); }}
                className={`rounded-xl resize-none ${errors.reason ? 'border-destructive ring-1 ring-destructive' : ''}`}
              />
              <div className="flex justify-between items-center">
                {errors.reason ? (
                  <p className="text-xs text-destructive flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" /> {errors.reason}
                  </p>
                ) : <span />}
                <span className={`text-xs tabular-nums ml-auto ${formReason.length >= 20 ? 'text-green-500 font-semibold' : 'text-muted-foreground'}`}>
                  {formReason.length} ký tự
                </span>
              </div>
            </div>

            {/* Additional details */}
            <div className="space-y-1.5">
              <Label htmlFor="details" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Thông tin bổ sung{' '}
                <span className="text-muted-foreground/60 font-normal normal-case tracking-normal">(tùy chọn)</span>
              </Label>
              <Textarea
                id="details"
                rows={2}
                placeholder="Câu hỏi cụ thể, điểm kỳ vọng, bằng chứng đính kèm..."
                value={formDetails}
                onChange={e => setFormDetails(e.target.value)}
                className="rounded-xl resize-none"
              />
            </div>

            <Separator />

            <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-0">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => { setShowForm(false); resetForm(); }}
                disabled={isSubmitting}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-[#a70015] hover:bg-[#8a0011] text-white shadow-md shadow-red-900/20"
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> Đang gửi...</>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Nộp đơn</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ===== Success Dialog ===== */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-sm rounded-2xl border-none shadow-2xl p-0 overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-black text-foreground text-center">Nộp đơn thành công!</DialogTitle>
              <DialogDescription className="text-center text-sm leading-relaxed">
                Đơn phúc khảo của bạn đã được hệ thống tiếp nhận và đang chờ phê duyệt.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-2.5 text-left">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Kết quả xét duyệt sẽ được thông báo trong{' '}
                <span className="font-bold">5–7 ngày làm việc</span>. Bạn có thể theo dõi trạng thái đơn tại trang này.
              </p>
            </div>

            <Button
              className="w-full rounded-xl bg-[#a70015] hover:bg-[#8a0011] text-white"
              onClick={() => setShowSuccess(false)}
            >
              Đã hiểu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </PageTransition>
  );
}
