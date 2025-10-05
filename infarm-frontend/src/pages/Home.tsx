import { Leaf, BookOpen, Users, ShoppingBag, ArrowRight, Target } from 'lucide-react';

type HomeProps = {
    onNavigate: (page: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
    return (
        <div className="min-h-screen">
            <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                <Target className="h-4 w-4" />
                                <span>Mendukung SDGs 1 & 2</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Bertani di Pekarangan,
                                <span className="text-green-600"> Wujudkan Ketahanan Pangan</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Platform informasi lengkap untuk membantu Anda memanfaatkan lahan pekarangan rumah
                                menjadi sumber pangan dan penghasilan. Mari bersama mencapai Indonesia tanpa kemiskinan
                                dan tanpa kelaparan.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => onNavigate('guides')}
                                    className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
                                >
                                    <span>Mulai Bertani</span>
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onNavigate('articles')}
                                    className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all hover:scale-105"
                                >
                                    Baca Artikel
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                            <div className="absolute -bottom-8 right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                            <img
                                src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Urban Farming"
                                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Mengapa InFarm?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Kami menyediakan semua yang Anda butuhkan untuk memulai pertanian di pekarangan rumah
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-green-100">
                            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BookOpen className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Panduan Lengkap</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Tutorial step-by-step untuk berbagai jenis tanaman dan teknik pertanian modern
                            </p>
                        </div>

                        <div className="group p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-green-100">
                            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Leaf className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Artikel Terkini</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Informasi terbaru tentang teknik bertani, tips perawatan, dan inovasi pertanian
                            </p>
                        </div>

                        <div className="group p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-green-100">
                            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Komunitas Aktif</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Bergabung dengan forum untuk berbagi pengalaman dan belajar dari petani lain
                            </p>
                        </div>

                        <div className="group p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-green-100">
                            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Marketplace</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Jual hasil panen Anda dan temukan produk pertanian berkualitas
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-green-700 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="SDGs"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold">
                                Kontribusi untuk SDGs
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white text-green-600 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                                            1
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Tanpa Kemiskinan</h3>
                                            <p className="text-green-50 leading-relaxed">
                                                Memberdayakan masyarakat untuk menghasilkan pangan dan pendapatan tambahan
                                                dari lahan pekarangan rumah.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white text-green-600 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                                            2
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Tanpa Kelaparan</h3>
                                            <p className="text-green-50 leading-relaxed">
                                                Meningkatkan ketahanan pangan keluarga dengan memproduksi sayuran dan
                                                buah-buahan sendiri di rumah.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Siap Memulai Perjalanan Bertani Anda?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Bergabunglah dengan ribuan petani pekarangan di seluruh Indonesia
                    </p>
                    <button
                        onClick={() => onNavigate('login')}
                        className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2"
                    >
                        <span>Daftar Sekarang</span>
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </section>
        </div>
    );
}
