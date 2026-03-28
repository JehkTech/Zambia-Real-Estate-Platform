import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { RentPage } from './pages/RentPage';
import { SellPage } from './pages/SellPage';
import { CommercialPage } from './pages/CommercialPage';
import { BoardingPage } from './pages/BoardingPage';
import { PostPropertyPage } from './pages/PostPropertyPage';
import { AccountPage } from './pages/AccountPage';

export type PageType = 'home' | 'buy' | 'rent' | 'sell' | 'commercial' | 'boarding' | 'post-property' | 'account';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'buy':
        return <BuyPage onNavigate={handleNavigate} />;
      case 'rent':
        return <RentPage onNavigate={handleNavigate} />;
      case 'sell':
        return <SellPage onNavigate={handleNavigate} />;
      case 'commercial':
        return <CommercialPage onNavigate={handleNavigate} />;
      case 'boarding':
        return <BoardingPage onNavigate={handleNavigate} />;
      case 'post-property':
        return <PostPropertyPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}