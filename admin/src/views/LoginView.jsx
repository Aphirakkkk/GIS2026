import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const LoginView = () => {
  const { login, showToast } = useAdmin();
  const [username, setUsername] = useState('developer');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('กรุณากรอกชื่อผู้ใช้งาน หรืออีเมล');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('กรุณากรอกรหัสผ่าน');
      return;
    }

    setIsLoading(true);

    // Authenticate credentials
    setTimeout(() => {
      const success = login(username, password, rememberMe);
      if (!success) {
        setErrorMsg('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#0C1527] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gis-orange/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-2xl shadow-black/40 overflow-hidden relative z-10 border border-slate-100 transition-all">
        
        {/* Card Header & Brand Logo */}
        <div className="pt-10 pb-6 px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gis-orange to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/30">
              G
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-black text-2xl tracking-wider text-[#14213D]">GIS</span>
                <span className="font-black text-2xl tracking-wider text-gis-orange">GROUP</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Engineering Contractor</span>
            </div>
          </div>

          <h1 className="text-base font-bold text-slate-800 mt-4">Sign in to Admin Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">ระบบจัดการเนื้อหาเว็บไซต์ GIS GROUP (เฉพาะผู้ดูแลระบบ)</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-4">
          
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Username Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">ชื่อผู้ใช้งาน (Username / Email)</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="developer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">รหัสผ่าน (Password)</label>
              <button
                type="button"
                onClick={() => showToast('รหัสผ่านเริ่มต้นสำหรับระบบทดสอบคือ: password', 'info')}
                className="text-[11px] text-blue-600 hover:underline"
              >
                ลืมรหัสผ่าน?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>จดจำการเข้าสู่ระบบ</span>
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-4 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign in (เข้าสู่ระบบ)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Page Bottom Branding */}
      <div className="absolute bottom-4 text-center text-xs text-slate-500 font-light">
        © {new Date().getFullYear()} GIS GROUP Company Limited. All rights reserved.
      </div>
    </div>
  );
};
