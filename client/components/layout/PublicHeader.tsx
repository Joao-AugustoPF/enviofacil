import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src="/logo.png" alt="EnvioFácil" className="w-28 h-auto" />
            </Link>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/funcionalidades"
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Funcionalidades
            </a>
            <a
              href="/#como-funciona"
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Como funciona
            </a>
            <a
              href="/#beneficios"
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Benefícios
            </a>
            <a
              href="/#precos"
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Preços
            </a>
            <a
              href="/#faq"
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              FAQ
            </a>
            <a
              href="/sobre"
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Sobre
            </a>
          </nav>

          {/* Botões de Ação Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-blue-600"
              onClick={() => (window.location.href = "/login")}
            >
              Entrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Criar conta grátis
            </Button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-2">
              <a
                href="/funcionalidades"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Funcionalidades
              </a>
              <a
                href="/#como-funciona"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Como funciona
              </a>
              <a
                href="/#beneficios"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Benefícios
              </a>
              <a
                href="/#precos"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Preços
              </a>
              <a
                href="/#faq"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="/sobre"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </a>
              <div className="px-4 py-2 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-blue-600 justify-start"
                  onClick={() => (window.location.href = "/login")}
                >
                  Entrar
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Criar conta grátis
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
