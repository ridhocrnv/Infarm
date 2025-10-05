import { Sprout, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type NavbarProps = {
    onNavigate: (page: string) => void;
    currentPage: string;
};

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOut } = useAuth();

    const menuItems = [
        { id: 'home', label: 'Beranda' },
        { id: 'articles', label: 'Artikel' },
        { id: 'guides', label: 'Panduan Bertani' },
        { id: 'forum', label: 'Forum' },
        { id: 'products', label: 'Produk' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
                        <Sprout className="h-8 w-8 text-green-600" />
                        <span className="ml-2 text-2xl font-bold text-gray-900">InFarm</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`text-sm font-medium transition-colors ${currentPage === item.id
                                        ? 'text-green-600'
                                        : 'text-gray-700 hover:text-green-600'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        {user ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => onNavigate('profile')}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                                >
                                    <User className="h-4 w-4" />
                                    <span>Profil</span>
                                </button>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Keluar</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onNavigate('login')}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Masuk</span>
                            </button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-green-600"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 py-4 space-y-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onNavigate(item.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === item.id
                                        ? 'bg-green-50 text-green-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        {user ? (
                            <>
                                <button
                                    onClick={() => {
                                        onNavigate('profile');
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                                >
                                    <User className="h-4 w-4" />
                                    <span>Profil</span>
                                </button>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Keluar</span>
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    onNavigate('login');
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Masuk</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
