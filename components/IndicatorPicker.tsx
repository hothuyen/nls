import React, { useState } from 'react';
import { NLS_DATA } from '../data';
import { Indicator, CompetencyGroup } from '../types';
import { ChevronDown, ChevronRight, Check, X } from 'lucide-react';

interface IndicatorPickerProps {
  onClose: () => void;
  onConfirm: (selected: { group: string; code: string; desc: string }[]) => void;
  initialSelected?: { group: string; code: string; desc: string }[];
}

const IndicatorPicker: React.FC<IndicatorPickerProps> = ({ onClose, onConfirm, initialSelected = [] }) => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ group: string; code: string; desc: string }[]>(initialSelected);

  const toggleSelection = (groupTitle: string, subId: string, ind: Indicator) => {
    const fullCode = `${subId}.${ind.id}`;
    const exists = selectedItems.find(item => item.code === fullCode);
    
    if (exists) {
      setSelectedItems(selectedItems.filter(item => item.code !== fullCode));
    } else {
      setSelectedItems([
        ...selectedItems, 
        { 
            group: groupTitle,
            code: fullCode, 
            desc: ind.description 
        }
      ]);
    }
  };

  const activeGroup = NLS_DATA.find(g => g.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Chọn Chỉ Báo Năng Lực Số</h2>
            <p className="text-sm text-slate-500">Đã chọn: <span className="font-bold text-indigo-600">{selectedItems.length}</span> chỉ báo</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
            {/* Left Tabs */}
            <div className="w-1/3 md:w-1/4 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                {NLS_DATA.map(group => (
                    <button
                        key={group.id}
                        onClick={() => setActiveTab(group.id)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium border-l-4 transition-all
                            ${activeTab === group.id 
                                ? 'bg-white border-indigo-600 text-indigo-700 shadow-sm' 
                                : 'border-transparent text-slate-600 hover:bg-gray-100'
                            }
                        `}
                    >
                        <div className="font-bold mb-0.5">{group.id}. {group.shortTitle}</div>
                        <div className="text-xs font-normal opacity-70 truncate">{group.title}</div>
                    </button>
                ))}
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
                {activeGroup && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 sticky top-0 bg-white pb-2 border-b border-gray-100 z-10">
                            {activeGroup.title}
                        </h3>
                        {activeGroup.subCompetencies.map(sub => {
                            const isExpanded = expandedSub === sub.id || true; // Default expanded for easier view
                            return (
                                <div key={sub.id} className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div 
                                        className="bg-slate-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100"
                                        onClick={() => setExpandedSub(expandedSub === sub.id ? null : sub.id)}
                                    >
                                        <div className="font-semibold text-slate-700 text-sm">
                                            {sub.id}. {sub.title}
                                        </div>
                                        {/* {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />} */}
                                    </div>
                                    
                                    {isExpanded && (
                                        <div className="p-2 space-y-1">
                                            {sub.indicators.map(ind => {
                                                const fullCode = `${sub.id}.${ind.id}`;
                                                const isSelected = selectedItems.some(item => item.code === fullCode);
                                                return (
                                                    <div 
                                                        key={ind.id}
                                                        onClick={() => toggleSelection(activeGroup.shortTitle, sub.id, ind)}
                                                        className={`
                                                            group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border
                                                            ${isSelected 
                                                                ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                                                                : 'bg-white border-transparent hover:bg-gray-50 border-gray-100'
                                                            }
                                                        `}
                                                    >
                                                        <div className={`
                                                            w-5 h-5 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                                                            ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300 group-hover:border-indigo-400'}
                                                        `}>
                                                            {isSelected && <Check size={12} className="text-white" />}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-mono font-bold text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                                    {fullCode}
                                                                </span>
                                                            </div>
                                                            <p className={`text-sm mt-1 ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>
                                                                {ind.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors"
            >
                Hủy bỏ
            </button>
            <button 
                onClick={() => onConfirm(selectedItems)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
                Xác nhận ({selectedItems.length})
            </button>
        </div>
      </div>
    </div>
  );
};

export default IndicatorPicker;