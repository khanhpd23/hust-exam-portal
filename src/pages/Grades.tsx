import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GRADES_DATA } from '@/lib/mock-data';
import { GraduationCap, Award, BookOpen, TrendingUp } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function GradesSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}

export default function Grades() {
  // Calculate stats based on GRADES_DATA
  const totalCredits = GRADES_DATA.reduce((acc, curr) => acc + curr.credits, 0);
  const passedCredits = GRADES_DATA.filter(g => !['D', 'F'].includes(g.letter)).reduce((acc, curr) => acc + curr.credits, 0);
  const totalSubjects = GRADES_DATA.length;
  const avgScore = (GRADES_DATA.reduce((acc, curr) => acc + curr.total, 0) / totalSubjects).toFixed(1);

  const getScoreColor = (letter: string) => {
    switch (letter) {
      case 'A+': case 'A': return 'text-green-600 bg-green-50 border-green-200';
      case 'B+': case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'C+': case 'C': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 8.5) return 'bg-green-500';
    if (score >= 7.0) return 'bg-blue-500';
    if (score >= 5.5) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <PageTransition skeleton={<GradesSkeleton />}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <span className="text-[#a70015] font-bold tracking-widest text-xs uppercase mb-2 block">Student Workspace</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Bảng điểm thi</h1>
          <p className="text-gray-500 mt-2">Theo dõi kết quả học tập và tín chỉ tích luỹ qua các học kỳ.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm border-gray-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-red-50 text-[#a70015] flex items-center justify-center rounded-xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Điểm trung bình</p>
              <h2 className="text-3xl font-black text-gray-900">{avgScore}</h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tín chỉ tích lũy</p>
              <h2 className="text-3xl font-black text-gray-900">{passedCredits}</h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 flex items-center justify-center rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Số môn đã hoàn thành</p>
              <h2 className="text-3xl font-black text-gray-900">{totalSubjects}</h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 flex items-center justify-center rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Học lực</p>
              <h2 className="text-3xl font-black text-gray-900">Xuất sắc</h2>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="shadow-sm border-gray-200 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs px-6 lg:w-[35%]">Học phần</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-center w-[10%]">Số tín chỉ</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-center w-[15%]">Điểm quá trình</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-center w-[15%]">Điểm cuối kỳ</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-center w-[10%]">Điểm tổng kết</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-right px-6 w-[15%]">Điểm chữ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {GRADES_DATA.map((item) => (
                  <TableRow key={item.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{item.subject}</span>
                        <span className="text-xs text-gray-400 mt-1 font-mono">{item.id.toUpperCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-center text-gray-600 font-medium">
                      {item.credits}
                    </TableCell>
                    <TableCell className="py-5 text-center text-gray-600 font-medium">
                      {item.midterm > 0 ? item.midterm.toFixed(1) : '-'}
                    </TableCell>
                    <TableCell className="py-5 text-center text-gray-600 font-medium">
                      {item.final > 0 ? item.final.toFixed(1) : '-'}
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="font-black text-[#a70015]">{item.total > 0 ? item.total.toFixed(1) : '-'}</span>
                        {item.total > 0 && (
                          <Progress
                            value={item.total * 10}
                            className="h-1.5 w-16 bg-gray-100"
                            indicatorClassName={getProgressColor(item.total)}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-right px-6">
                      {item.letter ? (
                        <Badge variant="outline" className={`font-black text-sm w-10 h-10 flex items-center justify-center rounded-xl ml-auto ${getScoreColor(item.letter)}`}>
                          {item.letter}
                        </Badge>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

