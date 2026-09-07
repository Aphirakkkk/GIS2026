import React from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Toast } from './components/common/Toast';
import { LivePreviewModal } from './components/preview/LivePreviewModal';

// Views
import { DashboardView } from './views/DashboardView';
import { BannerView } from './views/BannerView';
import { AboutView } from './views/AboutView';
import { BusinessView } from './views/BusinessView';
import { ProductsServicesView } from './views/ProductsServicesView';
import { ProjectsView } from './views/ProjectsView';
import { NewsView } from './views/NewsView';
import { CareerView } from './views/CareerView';
import { ContactView } from './views/ContactView';
import { SettingsView } from './views/SettingsView';
import { LoginView } from './views/LoginView';

function AdminMain() {
  const { activeView, isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return (
      <>
        <LoginView />
        <Toast />
      </>
    );
  }

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'banner':
        return <BannerView />;
      case 'about':
      case 'about-us':
      case 'about-org':
      case 'about-ethics':
      case 'about-values':
      case 'about-iso9001':
      case 'about-iso45001':
      case 'about-iso27001':
      case 'about-achievement':
      case 'about-why-choose':
      case 'about-policy':
      case 'about-carbon':
      case 'about-story':
      case 'about-iso':
        return <AboutView />;
      case 'business':
      case 'business-epc':
      case 'business-ibt':
      case 'business-enr':
        return <BusinessView />;
      case 'products-services':
      case 'products':
      case 'services':
        return <ProductsServicesView />;
      case 'projects':
      case 'projects-highlight':
      case 'projects-government':
      case 'projects-commercial':
      case 'projects-industrial':
      case 'projects-health-education':
      case 'projects-critical-space':
      case 'projects-residential':
      case 'projects-hotel-leisure':
      case 'projects-construction':
      case 'projects-others':
        return <ProjectsView />;
      case 'news':
      case 'news-safety':
      case 'news-csr':
      case 'news-trip':
      case 'news-corporate':
        return <NewsView />;
      case 'career':
      case 'career-admin':
      case 'career-epc':
      case 'career-ibt':
      case 'career-apply':
        return <CareerView />;
      case 'contact':
      case 'contact-inquiries':
      case 'contact-hq':
      case 'contact-footer':
      case 'inquiries':
      case 'careers':
        return <ContactView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F1F5F9] text-slate-800 antialiased font-sans">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Popups and Overlays */}
      <Toast />
      <LivePreviewModal />
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <AdminMain />
    </AdminProvider>
  );
}

export default App;
