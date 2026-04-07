import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HISTORY_DATA } from '@/lib/mock-data';
import { Calendar, CheckCircle2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function HistorySkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

export default function History() {
  return (
    <PageTransition skeleton={<HistorySkeleton />}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <span className="text-[#a70015] font-bold tracking-widest text-xs uppercase mb-2 block">Student Workspace</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Lịch sử thi</h1>
        </div>

        <div className="space-y-4">
          {HISTORY_DATA.map((item) => (
            <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.date}</span>
                    <span className="text-gray-300">|</span>
                    <span>{item.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Điểm số</p>
                    <p className="text-2xl font-black text-[#a70015]">{item.score.toFixed(1)}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-none flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
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
