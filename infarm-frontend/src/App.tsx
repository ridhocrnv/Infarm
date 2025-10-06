import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Articles from './pages/Articles';
import Guides from './pages/Guides';
import Forum from './pages/Forum';
import Products from './pages/Products';
import CreateArticle from './pages/CreateArticle';
import CreateThread from './pages/CreateThread';
import CreateProduct from './pages/CreateProduct';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentId, setCurrentId] = useState<string | undefined>();

  const handleNavigate = (page: string, id?: string | boolean) => {
    setCurrentPage(page);
    if (typeof id === 'string') {
      setCurrentId(id);
    } else {
      setCurrentId(undefined);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'articles':
        return <Articles onNavigate={handleNavigate} />;
      case 'guides':
        return <Guides onNavigate={handleNavigate} />;
      case 'forum':
        return <Forum onNavigate={handleNavigate} />;
      case 'products':
        return <Products onNavigate={handleNavigate} />;
      case 'create-article':
        return <CreateArticle onNavigate={handleNavigate} />;
      case 'create-thread':
        return <CreateThread onNavigate={handleNavigate} />;
      case 'create-product':
        return <CreateProduct onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'guide-detail':
        return <Guides onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
