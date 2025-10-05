import { useEffect, useState } from 'react';
import { MessageSquare, Plus, User, Calendar, Search } from 'lucide-react';
import { supabase, type ForumThread } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type ForumProps = {
    onNavigate: (page: string, id?: string) => void;
};

export default function Forum({ onNavigate }: ForumProps) {
    const [threads, setThreads] = useState<ForumThread[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        loadThreads();
    }, []);

    const loadThreads = async () => {
        try {
            const { data: threadsData, error: threadsError } = await supabase
                .from('forum_threads')
                .select(`
          *,
          author:users(username)
        `)
                .order('created_at', { ascending: false });

            if (threadsError) throw threadsError;

            const threadsWithCounts = await Promise.all(
                (threadsData || []).map(async (thread) => {
                    const { count } = await supabase
                        .from('forum_replies')
                        .select('*', { count: 'exact', head: true })
                        .eq('thread_id', thread.id);

                    return { ...thread, reply_count: count || 0 };
                })
            );

            setThreads(threadsWithCounts);
        } catch (error) {
            console.error('Error loading threads:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredThreads = threads.filter((thread) =>
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Forum Diskusi</h1>
                            <p className="text-lg text-gray-600">
                                Tanya jawab dan berbagi pengalaman seputar pertanian
                            </p>
                        </div>
                        {user && (
                            <button
                                onClick={() => onNavigate('create-thread')}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Buat Thread</span>
                            </button>
                        )}
                    </div>

                    <div className="mt-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari diskusi..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredThreads.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {searchQuery ? 'Thread tidak ditemukan' : 'Belum ada diskusi'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery
                                ? 'Coba kata kunci lain'
                                : 'Mulai diskusi dan ajukan pertanyaan Anda!'}
                        </p>
                        {user && !searchQuery && (
                            <button
                                onClick={() => onNavigate('create-thread')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Buat Thread Pertama</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredThreads.map((thread) => (
                            <div
                                key={thread.id}
                                onClick={() => onNavigate('thread', thread.id)}
                                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <MessageSquare className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                            {thread.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                                            {thread.content}
                                        </p>
                                        <div className="flex items-center gap-6 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                <span>{thread.author?.username || 'Anonymous'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{new Date(thread.created_at).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="h-4 w-4" />
                                                <span>{thread.reply_count} balasan</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
