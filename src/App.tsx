import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { RentPage } from './pages/RentPage';
import { SellPage } from './pages/SellPage';
import { CommercialPage } from './pages/CommercialPage';
import { PostPropertyPage } from './pages/PostPropertyPage';
import { AccountPage } from './pages/AccountPage';

export type PageType = 'home' | 'buy' | 'rent' | 'sell' | 'commercial' | 'post-property' | 'account';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'buy':
        return <BuyPage onNavigate={setCurrentPage} />;
      case 'rent':
        return <RentPage onNavigate={setCurrentPage} />;
      case 'sell':
        return <SellPage onNavigate={setCurrentPage} />;
      case 'commercial':
        return <CommercialPage onNavigate={setCurrentPage} />;
      case 'post-property':
        return <PostPropertyPage onNavigate={setCurrentPage} />;
      case 'account':
        return <AccountPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}