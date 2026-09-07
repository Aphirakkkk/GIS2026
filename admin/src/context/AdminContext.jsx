import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialData } from '../data/initialData';

const AdminContext = createContext();

const STORAGE_KEY = 'GIS_ADMIN_DATA_V1';
const AUTH_KEY = 'GIS_ADMIN_AUTH_USER_V1';

export const AdminProvider = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState({
    name: 'Developer',
    role: 'Super Administrator',
    email: 'developer@gisgroup.co.th'
  });

  // Load stored data or default with deep fallback
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...initialData,
          ...parsed,
          content: {
            th: {
              ...initialData.content.th,
              ...(parsed.content?.th || {}),
              businessData: parsed.content?.th?.businessData || initialData.content.th.businessData,
              aboutSections: parsed.content?.th?.aboutSections || initialData.content.th.aboutSections,
              productsServicesData: parsed.content?.th?.productsServicesData || initialData.content.th.productsServicesData,
              projectsReferenceData: parsed.content?.th?.projectsReferenceData || initialData.content.th.projectsReferenceData,
              newsEventsData: parsed.content?.th?.newsEventsData || initialData.content.th.newsEventsData,
              careerData: parsed.content?.th?.careerData || initialData.content.th.careerData,
              contactFooterData: parsed.content?.th?.contactFooterData || initialData.content.th.contactFooterData
            },
            en: {
              ...initialData.content.en,
              ...(parsed.content?.en || {}),
              businessData: parsed.content?.en?.businessData || initialData.content.en.businessData,
              aboutSections: parsed.content?.en?.aboutSections || initialData.content.en.aboutSections,
              productsServicesData: parsed.content?.en?.productsServicesData || initialData.content.en.productsServicesData,
              projectsReferenceData: parsed.content?.en?.projectsReferenceData || initialData.content.en.projectsReferenceData,
              newsEventsData: parsed.content?.en?.newsEventsData || initialData.content.en.newsEventsData,
              careerData: parsed.content?.en?.careerData || initialData.content.en.careerData,
              contactFooterData: parsed.content?.en?.contactFooterData || initialData.content.en.contactFooterData
            }
          }
        };
      }
    } catch (e) {
      console.error('Failed to load data from localStorage', e);
    }
    return initialData;
  });

  // Current editing language (th or en)
  const [lang, setLang] = useState('th');

  // Currently active sidebar view
  const [activeView, setActiveView] = useState('dashboard');

  // Live preview modal visibility
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const toastTimerRef = useRef(null);

  // Show toast notification
  const showToast = (message, type = 'success', duration = 3500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, duration);
  };

  const hideToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: false, message: '', type: 'success' });
  };

  // Custom Confirmation Modal state
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
    type: 'danger',
    onConfirm: null,
    onCancel: null
  });

  // Promise-based confirm dialog
  const showConfirm = ({
    title = 'ยืนยันการทำรายการ',
    message = 'คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้?',
    confirmText = 'ยืนยัน',
    cancelText = 'ยกเลิก',
    type = 'danger'
  }) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        type,
        onConfirm: () => {
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        }
      });
    });
  };

  // Helper to update specific section for current language
  const updateSection = (sectionKey, newContent) => {
    setData((prev) => {
      const updatedContent = {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          [sectionKey]: newContent
        }
      };
      return {
        ...prev,
        content: updatedContent
      };
    });
    showToast(`บันทึกข้อมูลส่วน "${sectionKey}" เรียบร้อยแล้ว`, 'success');
  };

  // Helper to update root-level items (e.g. stats, jobs, recentInquiries)
  const updateRootField = (fieldKey, value) => {
    setData((prev) => ({
      ...prev,
      [fieldKey]: value
    }));
    showToast(`อัปเดตข้อมูลสำเร็จ`, 'success');
  };

  // Reset all data back to factory defaults
  const resetToDefaults = async () => {
    const confirmed = await showConfirm({
      title: 'คืนค่าข้อมูลทั้งหมดของระบบ',
      message: 'คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่? ข้อมูลที่แก้ไขไว้ทั้งหมดจะถูกแทนที่ด้วยค่าเริ่มต้น',
      confirmText: 'รีเซ็ตข้อมูลทั้งหมด',
      cancelText: 'ยกเลิก',
      type: 'warning'
    });

    if (confirmed) {
      setData(initialData);
      localStorage.removeItem(STORAGE_KEY);
      showToast('รีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นเรียบร้อยแล้ว', 'info');
    }
  };

  // Export data as JSON file download
  const exportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gis-group-content-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('ดาวน์โหลดไฟล์สำรองข้อมูล (JSON) เรียบร้อยแล้ว', 'success');
  };

  // Import data from JSON file or string
  const importData = (importedJson) => {
    try {
      const parsed = typeof importedJson === 'string' ? JSON.parse(importedJson) : importedJson;
      if (parsed && parsed.content) {
        setData(parsed);
        showToast('นำเข้าข้อมูลสำเร็จเรียบร้อยแล้ว', 'success');
        return true;
      } else {
        throw new Error('โครงสร้างข้อมูลไม่ถูกต้อง');
      }
    } catch (e) {
      showToast(`นำเข้าข้อมูลไม่สำเร็จ: ${e.message}`, 'error');
      return false;
    }
  };

  // Login handler with credentials
  const login = (username, password, remember = true) => {
    const validUser = username.trim().toLowerCase() === 'developer';
    const validPass = password === 'admin1234';

    if (validUser && validPass) {
      setIsAuthenticated(true);
      setCurrentUser({
        name: 'Developer',
        role: 'Super Administrator',
        email: 'developer@gisgroup.co.th'
      });
      if (remember) {
        localStorage.setItem(AUTH_KEY, 'true');
      } else {
        sessionStorage.setItem(AUTH_KEY, 'true');
      }
      showToast('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ Developer', 'success');
      return true;
    }
    return false;
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  };

  // Quick accessors for current language content
  const currentContent = data.content[lang] || data.content.th;

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        data,
        lang,
        setLang,
        activeView,
        setActiveView,
        currentContent,
        updateSection,
        updateRootField,
        resetToDefaults,
        exportData,
        importData,
        toast,
        showToast,
        hideToast,
        confirmState,
        showConfirm,
        isPreviewOpen,
        setIsPreviewOpen
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
