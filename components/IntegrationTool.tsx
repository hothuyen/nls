import React, { useState, useRef } from 'react';
import { Upload, Plus, Trash2, FileText, Download, X, Wand2, Copy } from 'lucide-react';
import IndicatorPicker from './IndicatorPicker';
import FileSaver from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, HeadingLevel, AlignmentType } from 'docx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NLS_DATA } from '../data';

interface RowData {
  id: string;
  content: string;
  nlsTags: { group: string; code: string; desc: string }[];
}

// Helper function to suggest NLS tags based on keywords
const suggestNLS = (text: string) => {
  const suggestions: { group: string; code: string; desc: string }[] = [];
  const lower = text.toLowerCase();

  // Keyword mapping for specific NLS indicators
  const keywords: Record<string, string[]> = {
    '1.1.b': ['tìm kiếm', 'search', 'google', 'tra cứu', 'truy vấn', 'thu thập'],
    '1.1.d': ['chiến lược', 'từ khóa', 'kế hoạch tìm'],
    '1.2.a': ['đánh giá', 'tin cậy', 'nguồn tin', 'fake news', 'xác thực'],
    '1.3.a': ['lưu trữ', 'sắp xếp', 'thư mục', 'cloud', 'drive', 'tổ chức', 'quản lý dữ liệu'],
    '2.1.a': ['zalo', 'facebook', 'email', 'chat', 'nhắn tin', 'messenger', 'tương tác'],
    '2.1.b': ['phương tiện', 'kênh giao tiếp', 'liên lạc'],
    '2.2.a': ['chia sẻ', 'share', 'gửi', 'phát tán', 'công bố'],
    '2.3.b': ['công dân số', 'tham gia', 'xã hội', 'trách nhiệm'],
    '2.5.a': ['quy tắc', 'ứng xử', 'netiquette', 'lịch sự', 'văn hóa mạng'],
    '3.1.a': ['soạn thảo', 'word', 'powerpoint', 'canva', 'thiết kế', 'video', 'tạo', 'slide', 'trình chiếu', 'biên tập'],
    '3.3.a': ['bản quyền', 'tác giả', 'trích dẫn', 'creative commons', 'giấy phép'],
    '3.4.a': ['lập trình', 'code', 'scratch', 'python', 'thuật toán', 'c++', 'hướng dẫn máy tính'],
    '4.1.a': ['bảo vệ thiết bị', 'khóa máy', 'an toàn thiết bị'],
    '4.1.c': ['bảo mật', '2fa', 'mật khẩu', 'password', 'virus', 'malware'],
    '4.2.a': ['dữ liệu cá nhân', 'riêng tư', 'thông tin cá nhân'],
    '5.1.b': ['sửa lỗi', 'khắc phục', 'trục trặc', 'sự cố'],
    '5.2.b': ['phần mềm', 'ứng dụng', 'app', 'công cụ số', 'giải pháp'],
    '6.1.a': ['ai ', 'trí tuệ nhân tạo', 'chatgpt', 'bot', 'gemini', 'copilot'],
    '6.2.a': ['sử dụng ai', 'prompt', 'câu lệnh']
  };

  NLS_DATA.forEach(group => {
    group.subCompetencies.forEach(sub => {
      sub.indicators.forEach(ind => {
        const fullCode = `${sub.id}.${ind.id}`;
        
        // Check if any keyword matches
        if (keywords[fullCode]) {
          if (keywords[fullCode].some(k => lower.includes(k))) {
            suggestions.push({
              group: group.shortTitle,
              code: fullCode,
              desc: ind.description
            });
          }
        }
      });
    });
  });

  return suggestions;
};

const IntegrationTool: React.FC = () => {
  const [docTitle, setDocTitle] = useState('Kế hoạch bài dạy');
  const [rows, setRows] = useState<RowData[]>([
    { id: '1', content: 'Hoạt động 1: Tìm kiếm thông tin trên Internet về biến đổi khí hậu.', nlsTags: [] }
  ]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Set title from filename
    const name = file.name.replace(/\.[^/.]+$/, "");
    setDocTitle(name);

    // Simple text parsing
    if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim() !== '');
            const newRows = lines.map((line, idx) => {
                const suggestions = suggestNLS(line);
                return {
                    id: Date.now().toString() + idx,
                    content: line,
                    nlsTags: suggestions
                };
            });
            setRows(newRows);
        };
        reader.readAsText(file);
    } else {
        // For binary files (docx/pdf), we can't parse easily in browser without heavy libs.
        // Just inform the user to copy content.
        alert(`Đã nhận diện file: "${file.name}".\nVui lòng sao chép nội dung các hoạt động vào bảng bên dưới để tích hợp NLS.`);
    }
  };

  const analyzeAllRows = () => {
    const updatedRows = rows.map(row => {
        if (row.nlsTags.length > 0) return row; // Skip if already has tags
        return {
            ...row,
            nlsTags: suggestNLS(row.content)
        };
    });
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), content: '', nlsTags: [] }]);
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRowContent = (id: string, text: string) => {
    setRows(rows.map(r => r.id === id ? { ...r, content: text } : r));
  };

  const openPicker = (id: string) => {
    setCurrentRowId(id);
    setIsPickerOpen(true);
  };

  const handleTagsConfirmed = (tags: { group: string; code: string; desc: string }[]) => {
    if (currentRowId) {
      setRows(rows.map(r => r.id === currentRowId ? { ...r, nlsTags: tags } : r));
    }
    setIsPickerOpen(false);
    setCurrentRowId(null);
  };

  const removeTag = (rowId: string, tagCode: string) => {
    setRows(rows.map(r => {
        if (r.id !== rowId) return r;
        return { ...r, nlsTags: r.nlsTags.filter(t => t.code !== tagCode) };
    }));
  };

  const copyRowTags = (tags: { group: string; code: string; desc: string }[]) => {
    if (tags.length === 0) return;
    
    const textToCopy = tags.map(t => `${t.code}: ${t.desc}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopyFeedback('Đã sao chép!');
        setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  // --- Export Functions ---

  const exportDocx = () => {
    const tableRows = [
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ text: "Nội dung / Hoạt động", padding: { bottom: 100 }, alignment: AlignmentType.CENTER, style: "Heading2" })],
                    shading: { fill: "E0E7FF" }
                }),
                new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ text: "Năng lực số (NLS) tích hợp", alignment: AlignmentType.CENTER, style: "Heading2" })],
                    shading: { fill: "E0E7FF" }
                }),
            ],
        }),
        ...rows.map(row => {
            const tagsParagraphs = row.nlsTags.map(t => new Paragraph({
                children: [
                    new TextRun({ text: t.code, bold: true }),
                    new TextRun({ text: ` - ${t.desc}` })
                ],
                spacing: { after: 100 },
                bullet: { level: 0 }
            }));

            return new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph(row.content)],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        verticalAlign: "center",
                    }),
                    new TableCell({
                        children: tagsParagraphs.length > 0 ? tagsParagraphs : [new Paragraph("-")],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        verticalAlign: "center",
                    }),
                ],
            });
        })
    ];

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: docTitle,
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 }
                }),
                new Paragraph({
                    text: "Bảng đối chiếu tích hợp Năng lực số",
                    heading: HeadingLevel.HEADING_3,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Table({
                    rows: tableRows,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                }),
                new Paragraph({
                    text: "Được tạo bởi Ứng dụng Tra cứu NLS",
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 500 },
                    style: "Subtitle"
                })
            ],
        }],
    });

    Packer.toBlob(doc).then(blob => {
        FileSaver.saveAs(blob, `${docTitle}_Integrated.docx`);
    });
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    
    doc.text(docTitle, 14, 20);
    doc.setFontSize(10);
    doc.text("Bảng tích hợp Năng lực số", 14, 28);

    const tableData = rows.map(r => [
        r.content,
        r.nlsTags.map(t => `${t.code}\n${t.desc}`).join('\n\n')
    ]);

    autoTable(doc, {
        startY: 35,
        head: [['Nội dung hoạt động', 'Mã NLS tích hợp']],
        body: tableData,
        styles: { font: "helvetica", overflow: 'linebreak' },
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229] },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 80 }
        }
    });

    doc.save(`${docTitle}_Integrated.pdf`);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto h-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Tên tài liệu / Kế hoạch bài dạy</label>
          <input 
            type="text" 
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="w-full text-xl font-bold text-slate-900 border-b-2 border-slate-200 focus:border-indigo-600 bg-transparent px-1 py-1 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2">
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept=".txt,.docx,.pdf"
                onChange={handleFileUpload}
            />
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium shadow-sm transition-all"
            >
                <Upload size={18} />
                Upload (TXT)
            </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {copyFeedback && (
        <div className="fixed top-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm animate-bounce">
            {copyFeedback}
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-5 md:col-span-6">Nội dung / Hoạt động</div>
            <div className="col-span-6 md:col-span-5">Năng lực số bổ sung</div>
            <div className="col-span-1 text-right">#</div>
        </div>

        {/* Table Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {rows.map((row, index) => (
                <div key={row.id} className="grid grid-cols-12 gap-4 items-start group">
                    {/* Content Input */}
                    <div className="col-span-5 md:col-span-6">
                        <textarea 
                            value={row.content}
                            onChange={(e) => updateRowContent(row.id, e.target.value)}
                            placeholder="Nhập nội dung hoạt động..."
                            className="w-full h-full min-h-[100px] p-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-800 resize-y"
                        />
                    </div>

                    {/* NLS Tags */}
                    <div className="col-span-6 md:col-span-5">
                        <div className="min-h-[100px] p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2 relative">
                            {row.nlsTags.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-16 text-center">
                                     <p className="text-xs text-slate-400 italic">Chưa có mã NLS nào.</p>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {row.nlsTags.map(tag => (
                                    <span key={tag.code} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-indigo-100 text-indigo-700 text-xs shadow-sm group/tag max-w-full">
                                        <span className="font-bold flex-shrink-0">{tag.code}</span>
                                        <span className="truncate max-w-[200px] hidden sm:inline" title={tag.desc}>{tag.desc}</span>
                                        <button 
                                            onClick={() => removeTag(row.id, tag.code)}
                                            className="ml-1 text-indigo-400 hover:text-red-500 rounded-full hover:bg-red-50 flex-shrink-0"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex gap-2 mt-3 pt-2 border-t border-slate-200/50">
                                <button 
                                    onClick={() => openPicker(row.id)}
                                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded transition-colors"
                                >
                                    <Plus size={14} /> Thêm chỉ báo
                                </button>
                                {row.nlsTags.length > 0 && (
                                    <button 
                                        onClick={() => copyRowTags(row.nlsTags)}
                                        className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-200 px-2 py-1 rounded transition-colors ml-auto"
                                        title="Copy toàn bộ mã NLS của dòng này"
                                    >
                                        <Copy size={14} /> Copy mã
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex justify-end pt-2">
                        <button 
                            onClick={() => deleteRow(row.id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa dòng này"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2 w-full sm:w-auto">
                <button 
                    onClick={addRow}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 font-medium shadow-sm transition-all text-sm"
                >
                    <Plus size={16} /> Thêm dòng
                </button>
                <button 
                    onClick={analyzeAllRows}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-100 font-medium shadow-sm transition-all text-sm"
                    title="Tự động quét nội dung và gợi ý NLS"
                >
                    <Wand2 size={16} /> Quét & Gợi ý NLS
                </button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
                <button 
                    onClick={exportPdf}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-100 rounded-xl hover:bg-red-100 font-medium transition-all"
                >
                    <FileText size={18} /> PDF
                </button>
                <button 
                    onClick={exportDocx}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                    <Download size={18} /> Tải DOCX
                </button>
            </div>
        </div>
      </div>

      {/* Picker Modal */}
      {isPickerOpen && currentRowId && (
        <IndicatorPicker 
            onClose={() => setIsPickerOpen(false)}
            onConfirm={handleTagsConfirmed}
            initialSelected={rows.find(r => r.id === currentRowId)?.nlsTags || []}
        />
      )}
    </div>
  );
};

export default IntegrationTool;