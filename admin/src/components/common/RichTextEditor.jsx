import React, { useState, useRef, useEffect } from 'react';
import {
  Wand2,
  Bold,
  Italic,
  Underline,
  Eraser,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Table as TableIcon,
  Link2,
  Image as ImageIcon,
  Video,
  Maximize2,
  Minimize2,
  Code,
  HelpCircle,
  ChevronDown,
  X,
  Type
} from 'lucide-react';

const TEXT_COLORS = [
  { name: 'GIS Orange', color: '#EA580C' },
  { name: 'GIS Deep Orange', color: '#C2410C' },
  { name: 'Amber Gold', color: '#F59E0B' },
  { name: 'Slate Dark', color: '#1E293B' },
  { name: 'Charcoal Black', color: '#0F172A' },
  { name: 'Sky Blue', color: '#0284C7' },
  { name: 'Navy Blue', color: '#1E3A8A' },
  { name: 'Emerald Green', color: '#059669' },
  { name: 'Crimson Red', color: '#DC2626' },
  { name: 'Violet Purple', color: '#7C3AED' },
  { name: 'Muted Gray', color: '#64748B' },
  { name: 'White', color: '#FFFFFF' },
];

const HIGHLIGHT_COLORS = [
  { name: 'ไม่ใช้ไฮไลท์', color: 'transparent', label: 'None' },
  { name: 'เหลืองสว่าง', color: '#FEF08A', label: 'Yellow' },
  { name: 'ส้มพาสเทล', color: '#FED7AA', label: 'Orange' },
  { name: 'เขียวมิ้นต์', color: '#BBF7D0', label: 'Green' },
  { name: 'ฟ้าพาสเทล', color: '#BAE6FD', label: 'Sky' },
  { name: 'ชมพูพาสเทล', color: '#FBCFE8', label: 'Pink' },
];

const FONT_SIZES = [
  { label: 'ใหญ่พิเศษ (32px)', size: '32px', desc: 'Hero / Banner' },
  { label: 'หัวข้อใหญ่ (24px)', size: '24px', desc: 'Heading 1' },
  { label: 'หัวข้อรอง (20px)', size: '20px', desc: 'Heading 2' },
  { label: 'หัวข้อย่อย (18px)', size: '18px', desc: 'Heading 3' },
  { label: 'ข้อความปกติ (16px)', size: '16px', desc: 'Standard Body' },
  { label: 'ตัวหนังสือเล็ก (14px)', size: '14px', desc: 'Secondary' },
  { label: 'เล็กพิเศษ (12px)', size: '12px', desc: 'Footnote / Tag' },
];

export const RichTextEditor = ({
  label,
  value = '',
  onChange,
  placeholder = 'พิมพ์ข้อความที่นี่...',
  rows = 5,
  lang = 'th',
  compact = false,
  singleLine = false,
  minHeight = 'auto'
}) => {
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [showCaseMenu, setShowCaseMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAlignMenu, setShowAlignMenu] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const editorRef = useRef(null);
  const styleMenuRef = useRef(null);
  const caseMenuRef = useRef(null);
  const colorPickerRef = useRef(null);
  const alignMenuRef = useRef(null);
  const tableMenuRef = useRef(null);
  const savedRangeRef = useRef(null);

  // Sync external value to contentEditable div
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isSourceMode]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (styleMenuRef.current && !styleMenuRef.current.contains(e.target)) {
        setShowStyleMenu(false);
      }
      if (caseMenuRef.current && !caseMenuRef.current.contains(e.target)) {
        setShowCaseMenu(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
      if (alignMenuRef.current && !alignMenuRef.current.contains(e.target)) {
        setShowAlignMenu(false);
      }
      if (tableMenuRef.current && !tableMenuRef.current.contains(e.target)) {
        setShowTableMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save current selection range so clicking dropdown items won't lose it
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      if (onChange) onChange(html);
    }
  };

  const handleSourceChange = (e) => {
    const html = e.target.value;
    if (onChange) onChange(html);
  };

  const exec = (command, val = null) => {
    if (isSourceMode) return;
    restoreSelection();
    const selection = window.getSelection();
    // Smart auto-select all if user hasn't selected a specific word but field has text
    if (selection && selection.isCollapsed && editorRef.current && (editorRef.current.innerText || '').trim()) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    document.execCommand(command, false, val);
    handleInput();
  };

  const handleApplyColor = (color) => {
    restoreSelection();
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      document.execCommand('foreColor', false, color);
    } else if (editorRef.current) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('foreColor', false, color);
    }
    handleInput();
    setShowColorPicker(false);
  };

  const handleApplyBgColor = (color) => {
    restoreSelection();
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      document.execCommand('hiliteColor', false, color);
    } else if (editorRef.current) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('hiliteColor', false, color);
    }
    handleInput();
    setShowColorPicker(false);
  };

  const handleHeading = (tag) => {
    restoreSelection();
    document.execCommand('formatBlock', false, tag);
    handleInput();
    setShowStyleMenu(false);
  };

  const handleSetFontSize = (size) => {
    restoreSelection();
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = size;
      span.appendChild(range.extractContents());
      range.insertNode(span);
    } else if (editorRef.current) {
      const span = document.createElement('span');
      span.style.fontSize = size;
      span.innerHTML = editorRef.current.innerHTML;
      editorRef.current.innerHTML = '';
      editorRef.current.appendChild(span);
    }
    handleInput();
    setShowStyleMenu(false);
  };

  const handleCaseTransform = (mode) => {
    restoreSelection();
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const text = range.toString();
      let transformed = text;
      if (mode === 'upper') transformed = text.toUpperCase();
      else if (mode === 'lower') transformed = text.toLowerCase();
      else if (mode === 'capitalize') {
        transformed = text.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      }
      document.execCommand('insertText', false, transformed);
    } else if (editorRef.current) {
      let text = editorRef.current.innerText || editorRef.current.textContent || '';
      if (mode === 'upper') text = text.toUpperCase();
      else if (mode === 'lower') text = text.toLowerCase();
      else if (mode === 'capitalize') {
        text = text.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      }
      editorRef.current.innerText = text;
    }
    handleInput();
    setShowStyleMenu(false);
    setShowCaseMenu(false);
  };

  const handleInsertLink = () => {
    const url = prompt('ระบุ URL ของลิงก์ (เช่น https://gisgroup.co.th):');
    if (url) {
      exec('createLink', url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt('ระบุ URL รูปภาพ (เช่น https://example.com/photo.jpg):');
    if (url) {
      exec('insertImage', url);
    }
  };

  const handleInsertVideo = () => {
    const url = prompt('ระบุลิงก์ YouTube URL (เช่น https://www.youtube.com/watch?v=...):');
    if (url) {
      let embedUrl = url;
      if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      const videoHtml = `<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin:16px 0; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1);"><iframe src="${embedUrl}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p><br></p>`;
      exec('insertHTML', videoHtml);
    }
  };

  const handleInsertTable = (rows = 3, cols = 3) => {
    let tableHtml = '<table style="width:100%; border-collapse:collapse; margin:14px 0; border:1px solid #cbd5e1; font-size:13px;"><thead><tr>';
    for (let c = 0; c < cols; c++) {
      tableHtml += `<th style="border:1px solid #cbd5e1; padding:10px; background-color:#f1f5f9; font-weight:bold; text-align:left; color:#1e293b;">หัวข้อ ${c + 1}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';
    for (let r = 1; r < rows; r++) {
      tableHtml += '<tr>';
      for (let c = 0; c < cols; c++) {
        tableHtml += '<td style="border:1px solid #cbd5e1; padding:8px 10px; color:#334155;">ข้อมูล...</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p><br></p>';
    exec('insertHTML', tableHtml);
    setShowTableMenu(false);
  };

  const handleKeyDown = (e) => {
    if (singleLine && e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    if (singleLine) {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain').replace(/\r?\n|\r/g, ' ');
      document.execCommand('insertText', false, text);
      handleInput();
    }
  };

  // Word & Character count calculation
  const rawText = (value || '').replace(/<[^>]*>/g, '');
  const wordCount = rawText.trim() ? rawText.trim().split(/\s+/).length : 0;
  const charCount = rawText.length;

  return (
    <div
      className={`space-y-1.5 transition-all ${
        isFullscreen
          ? 'fixed inset-4 z-50 bg-white p-6 rounded-2xl shadow-2xl border border-slate-300 flex flex-col'
          : 'w-full'
      }`}
    >
      {/* Label and Statistics */}
      {label && (
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span>{label}</span>
            {lang && (
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                lang === 'th' ? 'bg-orange-100 text-[#EA580C]' : 'bg-blue-100 text-blue-700'
              }`}>
                {lang === 'th' ? 'TH' : 'EN'}
              </span>
            )}
          </label>

          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
            <span>{wordCount} คำ</span>
            <span>•</span>
            <span>{charCount} ตัวอักษร</span>
          </div>
        </div>
      )}

      {/* Editor Main Container */}
      <div className={`relative border rounded-xl bg-white shadow-xs flex flex-col ${
        isFullscreen ? 'flex-1' : ''
      } border-slate-300 focus-within:border-[#EA580C] focus-within:ring-2 focus-within:ring-orange-500/20`}>
        
        {/* ============================================================ */}
        {/* TOOLBAR: COMPACT OR FULL MODE                                */}
        {/* ============================================================ */}
        <div className="relative z-30 bg-[#E2E8F0] border-b border-slate-300 p-1.5 flex flex-wrap items-center gap-1 select-none rounded-t-xl">
          
          {/* 1. MAGIC WAND / STYLE, FONT SIZE & CASE DROPDOWN */}
          <div className="relative" ref={styleMenuRef}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                saveSelection();
                setShowStyleMenu(!showStyleMenu);
              }}
              className="h-8 px-2 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              title="เลือกขนาดข้อความและรูปแบบ (Font Size & Heading)"
            >
              <Wand2 size={15} className="text-white" />
              <ChevronDown size={11} className="text-slate-200" />
            </button>

            {showStyleMenu && (
              <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in zoom-in-95 space-y-2 max-h-84 overflow-y-auto">
                {/* Text Case Options */}
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
                  <span>รูปแบบตัวพิมพ์ (Text Case)</span>
                  <span className="text-[9px] text-[#EA580C] font-semibold">พิมพ์เล็ก-ใหญ่</span>
                </div>
                <div className="grid grid-cols-3 gap-1 px-1">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleCaseTransform('upper')}
                    className="px-2 py-1.5 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 rounded-md text-xs font-bold text-slate-800 border border-slate-200 text-center transition-colors cursor-pointer"
                    title="ตัวพิมพ์ใหญ่ทั้งหมด (ALL UPPERCASE)"
                  >
                    UPPER
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleCaseTransform('lower')}
                    className="px-2 py-1.5 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 rounded-md text-xs font-medium text-slate-800 border border-slate-200 text-center transition-colors cursor-pointer"
                    title="ตัวพิมพ์เล็กทั้งหมด (all lowercase)"
                  >
                    lower
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleCaseTransform('capitalize')}
                    className="px-2 py-1.5 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 rounded-md text-xs font-semibold text-slate-800 border border-slate-200 text-center transition-colors cursor-pointer"
                    title="ตัวแรกพิมพ์ใหญ่ (Capitalize Each Word)"
                  >
                    Capital
                  </button>
                </div>

                <div className="border-t border-slate-100 my-1"></div>

                {/* Font Size Options */}
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  ขนาดตัวอักษรเฉพาะจุด (Font Size)
                </div>
                <div className="grid grid-cols-2 gap-1 px-1">
                  {FONT_SIZES.map((f) => (
                    <button
                      key={f.size}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSetFontSize(f.size)}
                      className="text-left px-2 py-1.5 hover:bg-orange-50 rounded-md text-xs text-slate-700 flex flex-col transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-slate-800">{f.size}</span>
                      <span className="text-[9px] text-slate-400 truncate">{f.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Headings (only in non-singleLine mode) */}
                {!singleLine && (
                  <>
                    <div className="border-t border-slate-100 my-1"></div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      หัวข้อหลัก (Headings)
                    </div>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleHeading('h1')}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-base font-black text-slate-900 flex items-center justify-between"
                    >
                      <span>Heading 1</span>
                      <span className="text-[10px] text-slate-400 font-mono">H1 (28px)</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleHeading('h2')}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-sm font-bold text-slate-800 flex items-center justify-between"
                    >
                      <span>Heading 2</span>
                      <span className="text-[10px] text-slate-400 font-mono">H2 (22px)</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleHeading('p')}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs text-slate-700 flex items-center justify-between"
                    >
                      <span>ข้อความปกติ (Paragraph)</span>
                      <span className="text-[10px] text-slate-400 font-mono">P</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 2. DEDICATED QUICK CASE DROPDOWN (aA / Type Case) */}
          <div className="relative" ref={caseMenuRef}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                saveSelection();
                setShowCaseMenu(!showCaseMenu);
              }}
              className="h-8 px-2 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              title="สลับตัวพิมพ์เล็ก-ใหญ่ (Text Case: UPPER / lower / Capitalize)"
            >
              <span className="font-serif font-black text-xs tracking-tighter">aA</span>
              <ChevronDown size={11} className="text-slate-200" />
            </button>

            {showCaseMenu && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5">
                  ปรับตัวพิมพ์ (Case)
                </div>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCaseTransform('upper')}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                >
                  <span>UPPERCASE</span>
                  <span className="text-[10px] text-slate-400 font-mono">ABC</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCaseTransform('lower')}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span>lowercase</span>
                  <span className="text-[10px] text-slate-400 font-mono">abc</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCaseTransform('capitalize')}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs font-semibold text-slate-800 flex items-center justify-between cursor-pointer"
                >
                  <span>Capitalize Word</span>
                  <span className="text-[10px] text-slate-400 font-mono">Abc</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. BOLD */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('bold')}
            className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center font-black shadow-xs transition-colors cursor-pointer"
            title="ตัวหนา (Ctrl+B)"
          >
            <Bold size={15} strokeWidth={2.8} />
          </button>

          {/* 4. ITALIC */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('italic')}
            className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            title="ตัวเอียง (Ctrl+I)"
          >
            <Italic size={15} strokeWidth={2.5} />
          </button>

          {/* 5. UNDERLINE */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('underline')}
            className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            title="ขีดเส้นใต้ (Ctrl+U)"
          >
            <Underline size={15} strokeWidth={2.5} />
          </button>

          {/* 6. ERASER (CLEAR FORMATTING) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('removeFormat')}
            className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            title="ล้างรูปแบบที่เลือกทั้งหมด (Clear Format)"
          >
            <Eraser size={15} />
          </button>

          {/* 7. COLOR PICKER DROPDOWN ('A' with yellow highlight) */}
          <div className="relative" ref={colorPickerRef}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                saveSelection();
                setShowColorPicker(!showColorPicker);
              }}
              className="h-8 px-2 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              title="เปลี่ยนสีตัวอักษรและสีไฮไลท์ (Text Color & Highlight)"
            >
              <div className="w-4 h-4 rounded-xs bg-[#FEF08A] text-slate-900 flex items-center justify-center font-black text-[11px] shadow-xs leading-none">
                A
              </div>
              <ChevronDown size={11} className="text-slate-200" />
            </button>

            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in zoom-in-95 space-y-3">
                {/* Text Color Options */}
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>สีตัวอักษร (Text Color)</span>
                    <span className="text-orange-600 font-mono text-[9px] font-bold">GIS Brand</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {TEXT_COLORS.map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleApplyColor(c.color)}
                        className="h-8 rounded-lg border-2 border-slate-200 hover:border-orange-500 hover:scale-105 flex items-center justify-center transition-all cursor-pointer shadow-xs relative group"
                        style={{ backgroundColor: c.color }}
                        title={c.name}
                      >
                        {c.color === '#FFFFFF' && (
                          <span className="text-[10px] text-slate-400 font-bold">W</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Highlights */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    สีไฮไลท์พื้นหลัง (Highlight Color)
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {HIGHLIGHT_COLORS.map((bg) => (
                      <button
                        key={bg.name}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleApplyBgColor(bg.color)}
                        className="px-2 py-1.5 rounded-md text-[10px] font-semibold border border-slate-200 hover:border-orange-400 text-slate-800 truncate text-center transition-colors cursor-pointer"
                        style={{ backgroundColor: bg.color }}
                        title={bg.name}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Input */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">เลือกผสมสีเอง (Custom):</span>
                  <input
                    type="color"
                    onChange={(e) => handleApplyColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white shadow-inner"
                    title="เปิดกล่องเลือกสีอิสระ"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ADVANCED FULL TOOLS: Shown when compact is false */}
          {!compact && (
            <>
              {/* 8. UNORDERED LIST */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('insertUnorderedList')}
                className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="รายการสัญลักษณ์หัวข้อย่อย (Bullet List)"
              >
                <List size={15} />
              </button>

              {/* 9. ORDERED LIST */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('insertOrderedList')}
                className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="รายการลำดับตัวเลข (Numbered List)"
              >
                <ListOrdered size={15} />
              </button>

              {/* 10. ALIGNMENTS DROPDOWN */}
              <div className="relative" ref={alignMenuRef}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    saveSelection();
                    setShowAlignMenu(!showAlignMenu);
                  }}
                  className="h-8 px-2 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  title="การจัดตำแหน่งข้อความ (Alignment)"
                >
                  <AlignLeft size={15} />
                  <ChevronDown size={11} className="text-slate-200" />
                </button>

                {showAlignMenu && (
                  <div className="absolute top-full left-0 mt-1.5 w-36 bg-white rounded-xl shadow-2xl border border-slate-200 p-1 z-50 space-y-0.5">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { exec('justifyLeft'); setShowAlignMenu(false); }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <AlignLeft size={14} />
                      <span>ชิดซ้าย</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { exec('justifyCenter'); setShowAlignMenu(false); }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <AlignCenter size={14} />
                      <span>กึ่งกลาง</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { exec('justifyRight'); setShowAlignMenu(false); }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <AlignRight size={14} />
                      <span>ชิดขวา</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { exec('justifyFull'); setShowAlignMenu(false); }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-orange-50 rounded-lg text-xs text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <AlignJustify size={14} />
                      <span>เต็มบรรทัด</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 11. TABLE DROPDOWN */}
              <div className="relative" ref={tableMenuRef}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    saveSelection();
                    setShowTableMenu(!showTableMenu);
                  }}
                  className="h-8 px-2 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  title="แทรกตารางข้อมูล (Insert Table)"
                >
                  <TableIcon size={15} />
                  <ChevronDown size={11} className="text-slate-200" />
                </button>

                {showTableMenu && (
                  <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      เลือกขนาดตาราง
                    </div>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleInsertTable(2, 2)}
                      className="w-full text-left px-2 py-1.5 hover:bg-orange-50 rounded-md text-xs text-slate-700 cursor-pointer"
                    >
                      ตาราง 2 x 2 แถว/คอลัมน์
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleInsertTable(3, 3)}
                      className="w-full text-left px-2 py-1.5 hover:bg-orange-50 rounded-md text-xs text-slate-700 cursor-pointer"
                    >
                      ตาราง 3 x 3 (แนะนำ)
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleInsertTable(4, 4)}
                      className="w-full text-left px-2 py-1.5 hover:bg-orange-50 rounded-md text-xs text-slate-700 cursor-pointer"
                    >
                      ตาราง 4 x 4 แถว/คอลัมน์
                    </button>
                  </div>
                )}
              </div>

              {/* 12. INSERT LINK */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleInsertLink}
                className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="แทรกลิงก์ข้อความ (Insert Link)"
              >
                <Link2 size={15} />
              </button>

              {/* 13. INSERT IMAGE */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleInsertImage}
                className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="แทรกรูปภาพจาก URL (Insert Image)"
              >
                <ImageIcon size={15} />
              </button>

              {/* 14. INSERT VIDEO */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleInsertVideo}
                className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="แทรกคลิปวิดีโอ YouTube (Insert Video)"
              >
                <Video size={15} />
              </button>
            </>
          )}

          <div className="flex-1"></div>

          {/* RIGHT CONTROLS */}
          {!compact && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              title={isFullscreen ? 'ย่อหน้าต่างปกติ' : 'ขยายเต็มหน้าจอ (Fullscreen)'}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
          )}

          {/* SOURCE CODE VIEW TOGGLE (</>) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsSourceMode(!isSourceMode)}
            className={`w-8 h-8 rounded flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
              isSourceMode
                ? 'bg-slate-900 text-emerald-400 ring-2 ring-emerald-500'
                : 'bg-[#94A3B8] hover:bg-[#64748B] text-white'
            }`}
            title="สลับดูโค้ด HTML (Source Code View)"
          >
            <Code size={15} />
          </button>

          {!compact && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowHelp(true)}
              className="w-8 h-8 rounded bg-[#94A3B8] hover:bg-[#64748B] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              title="คู่มือการใช้งานแถบเครื่องมือ"
            >
              <HelpCircle size={15} />
            </button>
          )}

        </div>

        {/* ============================================================ */}
        {/* CONTENT EDITABLE AREA: WYSIWYG vs SOURCE HTML                */}
        {/* ============================================================ */}
        {isSourceMode ? (
          <textarea
            value={value || ''}
            onChange={handleSourceChange}
            rows={singleLine ? 2 : rows}
            className={`w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 outline-none leading-relaxed resize-y rounded-b-xl ${
              isFullscreen ? 'flex-1' : ''
            }`}
            placeholder="<!-- พิมพ์หรือแก้ไขโค้ด HTML ได้โดยตรงที่นี่ -->"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={() => { handleInput(); saveSelection(); }}
            onMouseUp={saveSelection}
            onKeyUp={saveSelection}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none leading-relaxed bg-white rounded-b-xl transition-all ${
              singleLine
                ? 'min-h-[44px]'
                : 'min-h-[100px] overflow-y-auto prose prose-sm max-w-none prose-orange'
            } ${isFullscreen ? 'flex-1' : ''}`}
            style={{
              minHeight: minHeight !== 'auto' ? minHeight : singleLine ? '44px' : `${rows * 28}px`
            }}
            data-placeholder={placeholder}
          />
        )}

      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <HelpCircle size={18} className="text-[#EA580C]" />
                <span>คู่มือแถบเครื่องมือตกแต่งข้อความ</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>• <strong>คทาวิเศษ (Wand):</strong> เลือกขนาดฟอนต์ 12px - 32px, รูปแบบพิมพ์เล็ก/ใหญ่ และขนาดหัวข้อ</p>
              <p>• <strong>ปุ่ม aA (Text Case):</strong> สลับเป็น UPPERCASE (ตัวพิมพ์ใหญ่ทั้งหมด), lowercase (ตัวพิมพ์เล็ก) หรือ Capitalize (ตัวแรกใหญ่)</p>
              <p>• <strong>B / I / U:</strong> ปรับตัวหนา, ตัวเอียง, ขีดเส้นใต้ (กดคีย์ลัด Ctrl+B, Ctrl+I, Ctrl+U ได้)</p>
              <p>• <strong>ยางลบ (Eraser):</strong> ล้างรูปแบบและการตกแต่งทั้งหมดของข้อความ</p>
              <p>• <strong>ปุ่ม A ไฮไลท์เหลือง:</strong> ไฮไลท์ข้อความแล้วเลือกสี เช่น GIS Orange (#EA580C), สีทอง, สีน้ำเงิน หรือใส่สีไฮไลท์พื้นหลัง</p>
              <p>• <strong>&lt;/&gt; (Source Mode):</strong> สลับดูโค้ด HTML เพื่อแก้ไขสไตล์ละเอียด</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="px-5 py-2 bg-[#EA580C] hover:bg-orange-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                เข้าใจแล้ว
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
