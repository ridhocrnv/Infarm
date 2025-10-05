import { useEffect, useState } from 'react';
import { ShoppingBag, Plus, User, Search } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type ProductsProps = {
    onNavigate: (page: string, id?: string) => void;
};

export default function Products({ onNavigate }: ProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          seller:users(username)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Marketplace</h1>
                            <p className="text-lg text-gray-600">
                                Jual beli hasil panen dan produk pertanian
                            </p>
                        </div>
                        {user && (
                            <button
                                onClick={() => onNavigate('create-product')}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Jual Produk</span>
                            </button>
                        )}
                    </div>

                    <div className="mt-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari produk..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery
                                ? 'Coba kata kunci lain'
                                : 'Jadilah yang pertama menjual produk!'}
                        </p>
                        {user && !searchQuery && (
                            <button
                                onClick={() => onNavigate('create-product')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Jual Produk Pertama</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.product_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
                                            <ShoppingBag className="h-16 w-16 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                                        {product.product_name}
                                    </h3>
                                    {product.description && (
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                            {product.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-green-600">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                                        <User className="h-4 w-4" />
                                        <span>{product.seller?.username || 'Anonymous'}</span>
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
