import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { APPEALS_DATA } from '@/lib/mock-data';
import { FileWarning, Plus, Calendar } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function AppealsSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

export default function Appeals() {
  return (
    <PageTransition skeleton={<AppealsSkeleton />}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-[#a70015] font-bold tracking-widest text-xs uppercase mb-2 block">Student Workspace</span>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Phúc khảo</h1>
          </div>
          <Button className="bg-[#a70015] hover:bg-[#8a0011] text-white rounded-xl shadow-lg shadow-red-900/20">
            <Plus className="w-4 h-4 mr-2" /> Tạo đơn phúc khảo mới
          </Button>
        </div>

        <div className="space-y-4">
          {APPEALS_DATA.map((item) => (
            <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.subject}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.date}</span>
                    <span className="text-gray-300">|</span>
                    <span>{item.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2"><span className="font-bold">Lý do:</span> {item.reason}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Badge className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-none flex items-center gap-1.5 ${
                    item.status === 'Đang xử lý' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
