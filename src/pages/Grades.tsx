import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GRADES_DATA } from '@/lib/mock-data';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function GradesSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function Grades() {
  return (
    <PageTransition skeleton={<GradesSkeleton />}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <span className="text-[#a70015] font-bold tracking-widest text-xs uppercase mb-2 block">Student Workspace</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Điểm thi</h1>
        </div>

        <Card className="shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Học phần</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Tín chỉ</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Điểm QT</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Điểm thi</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Tổng kết</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Điểm chữ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {GRADES_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{item.subject}</td>
                    <td className="p-4 text-center font-medium text-gray-600">{item.credits}</td>
                    <td className="p-4 text-center font-medium text-gray-600">{item.midterm.toFixed(1)}</td>
                    <td className="p-4 text-center font-medium text-gray-600">{item.final.toFixed(1)}</td>
                    <td className="p-4 text-center font-black text-[#a70015]">{item.total.toFixed(1)}</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-[#a70015] font-black text-sm">
                        {item.letter}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
