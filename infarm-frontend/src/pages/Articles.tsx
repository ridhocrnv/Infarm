import { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Plus, Search, RefreshCw } from 'lucide-react';
import { supabase, type Article } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type ArticlesProps = {
    onNavigate: (page: string, id?: string) => void;
};

export default function Articles({ onNavigate }: ArticlesProps) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        loadArticles();
    }, []);

    // Auto-refresh when coming from create article
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                loadArticles(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    const loadArticles = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            
            const { data, error } = await supabase
                .from('articles')
                .select(`
                    *,
                    author:users(username)
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error loading articles:', error);
                throw error;
            }
            
            setArticles(data || []);
        } catch (error) {
            console.error('Error loading articles:', error);
            // Set empty array on error to show empty state
            setArticles([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        loadArticles(true);
    };

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Artikel Pertanian</h1>
                            <p className="text-lg text-gray-600">
                                Temukan tips, trik, dan informasi terbaru seputar pertanian
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50"
                            >
                                <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
                                <span>{refreshing ? 'Memuat...' : 'Refresh'}</span>
                            </button>
                            {user && (
                                <button
                                    onClick={() => onNavigate('create-article')}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                >
                                    <Plus className="h-5 w-5" />
                                    <span>Tulis Artikel</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari artikel..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredArticles.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {searchQuery ? 'Artikel tidak ditemukan' : 'Belum ada artikel'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery
                                ? 'Coba kata kunci lain'
                                : 'Jadilah yang pertama membuat artikel!'}
                        </p>
                        {user && !searchQuery && (
                            <button
                                onClick={() => onNavigate('create-article')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Tulis Artikel Pertama</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <article
                                key={article.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                                onClick={() => onNavigate('article', article.id)}
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    {article.image_url ? (
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
                                            <span className="text-6xl">🌱</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                                        {article.content}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                <span>{article.author?.username || 'Anonymous'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                                        <span>Baca Selengkapnya</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
