import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HISTORY_DATA } from '@/lib/mock-data';
import { Calendar, Check, CheckCircle2, Search, Filter, AlertCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Skeleton } from '@/components/ui/skeleton';

function HistorySkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  const filteredData = HISTORY_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === 'all' || item.status.toLowerCase().includes(filterMode.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition skeleton={<HistorySkeleton />}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <span className="text-[#a70015] font-bold tracking-widest text-xs uppercase mb-2 block">Student Workspace</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Lịch sử thi</h1>
          <p className="text-gray-500 mt-2">Xem lại các bài thi bạn đã tham gia và tiến độ của từng kỳ thi.</p>
        </div>

        <Card className="border-gray-200 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm môn học..."
                    className="pl-10 h-11 rounded-xl bg-white border-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Tabs defaultValue="all" value={filterMode} onValueChange={setFilterMode} className="w-full md:w-auto overflow-x-auto">
                <TabsList className="bg-gray-200/50 p-1 rounded-xl h-12 w-full md:w-auto">
                  <TabsTrigger value="all" className="rounded-lg font-bold">Tất cả</TabsTrigger>
                  <TabsTrigger value="hoàn thành" className="rounded-lg font-bold">Đã hoàn thành</TabsTrigger>
                  <TabsTrigger value="vắng thi" className="rounded-lg font-bold">Vắng thi</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs px-6">Học phần</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs">Loại bài thi</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs">Thời gian thi</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-right">Trạng thái</TableHead>
                  <TableHead className="py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-right px-6">Điểm số</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center text-gray-500">
                      Không tìm thấy bài thi nào phù hợp với bộ lọc.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="border-gray-50 hover:bg-gray-50 transition-colors">
                      <TableCell className="py-5 px-6">
                        <span className="font-bold text-gray-900 line-clamp-1">{item.title}</span>
                      </TableCell>
                      <TableCell className="py-5">
                        <span className="text-gray-600 font-medium">{item.type}</span>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{item.date}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-right">
                        {item.status === 'Đã hoàn thành' ? (
                          <Badge className="bg-[#22c55e] text-white hover:bg-[#16a34a] border-none py-1.5 px-4 shadow-sm rounded-full font-bold">
                            <CheckCircle2 className="w-4 h-4 mr-1.5" /> {item.status}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200 py-1.5 px-4 rounded-full font-bold">
                            <AlertCircle className="w-4 h-4 mr-1.5" /> {item.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-5 text-right px-6">
                        <span className="text-xl font-black text-[#a70015]">
                          {item.score > 0 ? item.score.toFixed(1) : '-'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

