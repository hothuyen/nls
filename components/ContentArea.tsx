import React, { useMemo } from 'react';
import { CompetencyGroup, GradeLevel } from '../types';
import { Search, Info } from 'lucide-react';

interface ContentAreaProps {
  activeGroup: CompetencyGroup;
  searchTerm: string;
  grade: GradeLevel;
}

const ContentArea: React.FC<ContentAreaProps> = ({ activeGroup, searchTerm, grade }) => {
  
  // Filter logic: Check sub-competency title OR any indicator description
  const filteredSubCompetencies = useMemo(() => {
    if (!searchTerm) return activeGroup.subCompetencies;

    const lowerTerm = searchTerm.toLowerCase();
    return activeGroup.subCompetencies.filter(sub => {
      const titleMatch = sub.title.toLowerCase().includes(lowerTerm);
      const indicatorMatch = sub.indicators.some(ind => 
        ind.description.toLowerCase().includes(lowerTerm) || 
        ind.id.toLowerCase().includes(lowerTerm)
      );
      return titleMatch || indicatorMatch;
    });
  }, [activeGroup, searchTerm]);

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">{activeGroup.title}</h2>
        <div className="flex flex-wrap gap-2 items-center text-slate-500 text-sm">
            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-100 font-medium">
              Chương trình NC1
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
                Áp dụng cho: 
                <span className="font-semibold text-slate-700">Lớp {grade.replace('L', '')}</span>
            </span>
        </div>
      </div>

      {filteredSubCompetencies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-gray-300">
          <Search size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">Không tìm thấy kết quả</p>
          <p className="text-sm">Hãy thử từ khóa khác trong nhóm năng lực này.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredSubCompetencies.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Header of the Card */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-sm">
                        {sub.id}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-800 leading-tight pt-1 md:pt-0">
                        {sub.title.replace(`${sub.id}. `, '')}
                    </h3>
                </div>
              </div>

              {/* Indicators Body */}
              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  {sub.indicators.map((ind) => (
                    <div 
                        key={ind.id} 
                        className={`
                            flex items-start gap-3 p-3 rounded-lg border border-slate-100 transition-colors
                            ${searchTerm && ind.description.toLowerCase().includes(searchTerm.toLowerCase()) ? 'bg-yellow-50 border-yellow-200' : 'hover:bg-slate-50'}
                        `}
                    >
                      <div className={`
                        flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-mono font-bold text-sm
                        ${['a', 'c'].includes(ind.id) ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'}
                      `}>
                        {ind.id}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed pt-1.5">
                        {ind.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3 items-start">
        <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
        <div>
            <h4 className="font-semibold text-blue-800 text-sm">Ghi chú sử dụng</h4>
            <p className="text-blue-600 text-sm mt-1">
                Các chỉ báo (a, b, c, d) mô tả mức độ thực hiện của năng lực. Giáo viên có thể sử dụng các mã này để đánh giá học sinh trong các hoạt động học tập liên quan.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;