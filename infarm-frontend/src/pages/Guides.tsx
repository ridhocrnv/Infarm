import { Sprout, Droplets, Bug, Sun, BookOpen } from 'lucide-react';

type GuidesProps = {
    onNavigate: (page: string) => void;
};

export default function Guides({ onNavigate }: GuidesProps) {
    const categories = [
        {
            id: 'vegetables',
            title: 'Sayuran',
            description: 'Panduan lengkap menanam berbagai jenis sayuran di pekarangan',
            icon: Sprout,
            color: 'from-green-400 to-green-600',
            image: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=600',
            guides: [
                'Cara Menanam Cabai di Pot',
                'Budidaya Tomat untuk Pemula',
                'Menanam Kangkung Hidroponik',
                'Tips Menanam Sawi di Lahan Sempit',
            ],
        },
        {
            id: 'fruits',
            title: 'Buah-buahan',
            description: 'Teknik menanam buah di lahan terbatas',
            icon: Sun,
            color: 'from-orange-400 to-orange-600',
            image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600',
            guides: [
                'Menanam Jeruk dalam Pot',
                'Budidaya Strawberry di Rumah',
                'Cara Menanam Pepaya Organik',
                'Tips Merawat Pohon Mangga',
            ],
        },
        {
            id: 'herbs',
            title: 'Tanaman Obat & Rempah',
            description: 'Budidaya tanaman obat dan rempah-rempah',
            icon: Droplets,
            color: 'from-teal-400 to-teal-600',
            image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=600',
            guides: [
                'Menanam Jahe di Polybag',
                'Budidaya Kunyit Organik',
                'Cara Menanam Lengkuas',
                'Tips Menanam Daun Mint',
            ],
        },
        {
            id: 'techniques',
            title: 'Teknik Pertanian',
            description: 'Metode dan teknik pertanian modern',
            icon: BookOpen,
            color: 'from-blue-400 to-blue-600',
            image: 'https://images.pexels.com/photos/4505172/pexels-photo-4505172.jpeg?auto=compress&cs=tinysrgb&w=600',
            guides: [
                'Pengenalan Hidroponik',
                'Teknik Vertikultur untuk Lahan Sempit',
                'Sistem Irigasi Tetes Sederhana',
                'Kompos dari Sampah Rumah',
            ],
        },
        {
            id: 'pest',
            title: 'Pengendalian Hama',
            description: 'Cara alami mengatasi hama dan penyakit tanaman',
            icon: Bug,
            color: 'from-red-400 to-red-600',
            image: 'https://images.pexels.com/photos/8101520/pexels-photo-8101520.jpeg?auto=compress&cs=tinysrgb&w=600',
            guides: [
                'Pestisida Organik dari Bahan Alami',
                'Cara Mengatasi Hama Kutu Daun',
                'Mencegah Penyakit Busuk Akar',
                'Tips Mengusir Ulat Tanpa Kimia',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Panduan Bertani
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Pelajari cara bertani yang baik dan benar dengan panduan lengkap dari para ahli.
                        Mulai dari persiapan lahan hingga panen.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-30 backdrop-blur-sm rounded-full mb-3">
                                                <Icon className="h-8 w-8" />
                                            </div>
                                            <h2 className="text-2xl font-bold">{category.title}</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {category.description}
                                    </p>
                                    <div className="space-y-3">
                                        {category.guides.map((guide, index) => (
                                            <button
                                                key={index}
                                                onClick={() => onNavigate('guide-detail')}
                                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                                                        {guide}
                                                    </span>
                                                </div>
                                                <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Butuh Panduan Khusus?
                        </h2>
                        <p className="text-green-50 mb-6 leading-relaxed">
                            Bergabunglah dengan forum kami dan ajukan pertanyaan langsung kepada petani
                            berpengalaman dan ahli pertanian.
                        </p>
                        <button
                            onClick={() => onNavigate('forum')}
                            className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                        >
                            Tanya di Forum
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
