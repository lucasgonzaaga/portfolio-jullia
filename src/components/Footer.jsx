import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white py-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary-600 fill-current" />
                    <span className="font-serif font-bold text-gray-800">Doula Maju</span>
                </div>

                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Todos os direitos reservados.
                </p>

                <div className="flex gap-6 text-gray-500 text-sm">
                    <a href="#" className="hover:text-primary-600 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-primary-600 transition-colors">WhatsApp</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
