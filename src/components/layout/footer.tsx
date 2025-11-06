import { Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

import logoAmevi from "@/assets/e214b3767302229bb769b749498b0cffbf615395.png";



export function Footer() {
    return (
        <footer className="py-16 px-4 bg-[#1A1A1A]">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo e Redes Sociais */}
                    <div className="space-y-4">
                        <img
                            src={logoAmevi}
                            alt="Amevi"
                            className="h-20 w-auto object-contain mb-4"
                        />
                        <p className="text-gray-300 text-sm">
                            Sofisticação em cada fragrância
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://wa.me/558598039134"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#C9A14A] flex items-center justify-center hover:bg-[#B69142] transition-colors"
                            >
                                <WhatsAppIcon className="h-5 w-5 text-black" />
                            </a>
                            <a
                                href="https://instagram.com/ameviis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#C9A14A] flex items-center justify-center hover:bg-[#B69142] transition-colors"
                            >
                                <Instagram className="h-5 w-5 text-black" />
                            </a>
                        </div>
                    </div>

                    {/* Produtos */}
                    <div>
                        <h3 className="text-white mb-4">Produtos</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>Perfumes Importados</li>
                            <li>Perfumes Árabes</li>
                            <li>Body Splash</li>
                            <li>Maquiagem</li>
                            <li>Skincare</li>
                            <li>Acessórios de Beleza</li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="text-white mb-4">Contato</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>Maracanaú - CE</li>
                            <li className="pt-2">Tel: (85) 99803-9134</li>
                        </ul>
                    </div>

                    {/* Horário de Funcionamento */}
                    <div>
                        <h3 className="text-white mb-4">
                            Horário de Funcionamento
                        </h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>Segunda a Domingo: 9h às 19h</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-[#C9A14A]/20">
                    <div className="text-center text-sm text-gray-300">
                        <p>
                            © 2025 Amevi. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

