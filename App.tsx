import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import IntegrationTool from './components/IntegrationTool';
import { NLS_DATA } from './data';
import { GradeLevel } from './types';
import { Search, Download, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'lookup' | 'integration'>('lookup');
  const [activeGroupId, setActiveGroupId] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [grade, setGrade] = useState<GradeLevel>('L10');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get active group data
  const activeGroup = useMemo(() => 
    NLS_DATA.find(g => g.id === activeGroupId) || NLS_DATA[0], 
    [activeGroupId]
  );

  // Export functionality for Lookup View
  const handleExportLookup = () => {
    const dataToExport = {
      meta: {
        app: "Tra cứu NLS",
        grade: grade,
        timestamp: new Date().toISOString()
      },
      content: activeGroup
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NLS-${grade}-Group${activeGroupId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-800 font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        groups={NLS_DATA}
        activeGroupId={activeGroupId}
        onSelectGroup={(id) => {
            setActiveGroupId(id);
            setViewMode('lookup');
        }}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header - Contextual based on View Mode */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3 lg:px-8 shrink-0">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
            
            <div className="flex items-center w-full sm:w-auto gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
              
              {/* Only show Search in Lookup Mode */}
              {viewMode === 'lookup' && (
                <div className="relative w-full sm:w-64 md:w-80 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                    type="text"
                    placeholder="Tìm kiếm chỉ báo, từ khóa..."
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
              )}

              {viewMode === 'integration' && (
                  <div className="text-lg font-bold text-slate-700">
                      Công cụ tạo hồ sơ dạy học NLS
                  </div>
              )}
            </div>

            {/* Actions: Grade & Export */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {(['L10', 'L11', 'L12'] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`
                      px-3 py-1.5 text-xs font-semibold rounded-md transition-all
                      ${grade === g 
                        ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5' 
                        : 'text-slate-500 hover:text-slate-700'}
                    `}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {viewMode === 'lookup' && (
                <button
                    onClick={handleExportLookup}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
                    title="Xuất dữ liệu JSON"
                >
                    <Download size={16} />
                    <span className="hidden sm:inline">Xuất JSON</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 scroll-smooth">
          {viewMode === 'lookup' ? (
              <>
                <ContentArea 
                    activeGroup={activeGroup} 
                    searchTerm={searchTerm} 
                    grade={grade}
                />
                <footer className="py-8 text-center text-slate-400 text-xs">
                    <p>Dữ liệu nguồn: Phụ lục 1 - Năng lực số (L10-L12 NC1)</p>
                    <p className="mt-1">Ứng dụng hỗ trợ giáo dục 4.0</p>
                </footer>
              </>
          ) : (
              <IntegrationTool />
          )}
        </main>

      </div>
    </div>
  );
};

export default App;