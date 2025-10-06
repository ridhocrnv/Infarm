import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type CreateArticleProps = {
    onNavigate: (page: string, refresh?: boolean) => void;
};

export default function CreateArticle({ onNavigate }: CreateArticleProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('Anda harus login terlebih dahulu');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const { error: insertError } = await supabase.from('articles').insert({
                title,
                content,
                image_url: imageUrl || null,
                author_id: user.id,
            });

            if (insertError) throw insertError;

            alert('Artikel berhasil dibuat!');
            onNavigate('articles', true); // Pass refresh flag
        } catch (err) {
            setError('Gagal membuat artikel. Silakan coba lagi.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => onNavigate('articles')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Kembali</span>
                </button>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Tulis Artikel Baru</h1>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Judul Artikel
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                                placeholder="Masukkan judul artikel..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL Gambar
                            </label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                                placeholder="https://example.com/image.jpg (opsional)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Konten Artikel
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none resize-none"
                                placeholder="Tulis konten artikel Anda di sini..."
                                required
                            ></textarea>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="h-5 w-5" />
                                <span>{loading ? 'Menyimpan...' : 'Publikasikan Artikel'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => onNavigate('articles')}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
