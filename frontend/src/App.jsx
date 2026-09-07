import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValuesSection } from './components/ValuesSection';
import { BusinessSection } from './components/BusinessSection';
import { ProductsServicesSection } from './components/ProductsServicesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center justify-center font-mono">
          <div className="max-w-2xl w-full bg-red-950/80 border border-red-500 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-red-400 mb-2">⚠️ React Render Error Encountered</h2>
            <p className="text-xs text-slate-300 mb-4">หน้าเว็บพบข้อผิดพลาดระหว่างเรนเดอร์ กรุณาดูรายละเอียดด้านล่าง:</p>
            <pre className="text-xs bg-black/60 p-4 rounded text-red-200 overflow-x-auto whitespace-pre-wrap">
              {this.state.error?.toString()}
            </pre>
            <pre className="text-[10px] bg-black/40 p-4 rounded text-slate-400 mt-2 overflow-x-auto whitespace-pre-wrap max-h-48">
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="min-h-screen bg-[#0B0D11] text-slate-100 flex flex-col selection:bg-gis-orange selection:text-white">
          {/* Sticky Header */}
          <Navbar />

          {/* Main Sections */}
          <main className="flex-grow">
            {/* Hero Banner with Big Impactful Headline */}
            <HeroSection />

            {/* Values Statement (G-I-S Parallelogram Slanted Cards) */}
            <ValuesSection />

            {/* OUR BUSINESS Section (EPC, IBT, ENR & Fujitsu Video) */}
            <BusinessSection />

            {/* PRODUCTS & SERVICES Section (Overview Banner + Interactive Products/Services Tabs) */}
            <ProductsServicesSection />

            {/* About Us & ISO Certifications */}
            <AboutSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
