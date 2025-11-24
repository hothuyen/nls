import React from 'react';
import { Database, Users, PenTool, ShieldCheck, Zap, Cpu, Menu, FileText, Search } from 'lucide-react';
import { CompetencyGroup } from '../types';

interface SidebarProps {
  groups: CompetencyGroup[];
  activeGroupId: string;
  onSelectGroup: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  viewMode: 'lookup' | 'integration';
  onChangeViewMode: (mode: 'lookup' | 'integration') => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database size={20} />,
  Users: <Users size={20} />,
  PenTool: <PenTool size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Zap: <Zap size={20} />,
  Cpu: <Cpu size={20} />,
};

const Sidebar: React.FC<SidebarProps> = ({ 
  groups, 
  activeGroupId, 
  onSelectGroup, 
  isOpen, 
  onToggle,
  viewMode,
  onChangeViewMode
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h1 className="text-xl font-bold text-indigo-600 tracking-tight flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 rounded-lg">
              <Database size={20} className="text-indigo-600"/>
            </span>
            NLS Tra Cứu
          </h1>
          <button onClick={onToggle} className="lg:hidden text-gray-500">
            <Menu size={24} />
          </button>
        </div>

        {/* Main View Switcher */}
        <div className="p-4 pb-2 border-b border-gray-100 shrink-0 space-y-2">
            <button
                onClick={() => onChangeViewMode('lookup')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold
                ${viewMode === 'lookup' 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
            >
                <Search size={18} />
                Tra cứu NLS
            </button>
            <button
                onClick={() => {
                    onChangeViewMode('integration');
                    if(window.innerWidth < 1024) onToggle();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold
                ${viewMode === 'integration' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
            >
                <FileText size={18} />
                Công cụ tích hợp
            </button>
        </div>

        {/* Dynamic Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
            {viewMode === 'lookup' && (
                <>
                    <h3 className="px-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Các nhóm năng lực
                    </h3>
                    <div className="space-y-1">
                        {groups.map((group) => {
                            const isActive = activeGroupId === group.id;
                            return (
                            <button
                                key={group.id}
                                onClick={() => {
                                    onSelectGroup(group.id);
                                    if (window.innerWidth < 1024) onToggle();
                                }}
                                className={`
                                w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
                                ${isActive 
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                                    : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}
                                `}
                            >
                                <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                                {iconMap[group.iconName]}
                                </span>
                                <span className="text-left">{group.shortTitle}</span>
                            </button>
                            );
                        })}
                    </div>
                </>
            )}
            
            {viewMode === 'integration' && (
                <div className="px-4 py-2 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
                    <p className="font-medium mb-1">Hướng dẫn:</p>
                    <ol className="list-decimal pl-4 space-y-1 text-xs text-blue-700">
                        <li>Đặt tên tài liệu</li>
                        <li>Thêm các hoạt động/nội dung dạy học</li>
                        <li>Chọn các mã NLS phù hợp cho từng mục</li>
                        <li>Tải xuống file DOCX hoặc PDF</li>
                    </ol>
                </div>
            )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;