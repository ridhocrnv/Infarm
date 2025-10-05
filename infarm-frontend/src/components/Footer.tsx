import { Sprout, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-4">
                            <Sprout className="h-8 w-8 text-green-500" />
                            <span className="ml-2 text-2xl font-bold text-white">InFarm</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4">
                            Platform informasi pertanian untuk mencapai SDGs poin 1 (Tanpa Kemiskinan) dan 2 (Tanpa Kelaparan)
                            dengan memanfaatkan lahan pekarangan rumah untuk bertani.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center text-white font-bold">
                                SDG
                            </div>
                            <div>
                                <div className="font-semibold text-white">1: Tanpa Kemiskinan</div>
                                <div className="font-semibold text-white">2: Tanpa Kelaparan</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Menu</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-green-500 transition-colors">Beranda</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Artikel</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Panduan Bertani</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Forum</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Produk</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Kontak</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                                <span>info@infarm.id</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                                <span>Jakarta, Indonesia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} InFarm. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
