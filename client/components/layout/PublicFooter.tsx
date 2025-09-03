import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">EnvioFácil</h3>
            <p className="text-gray-400 mb-4">
              A plataforma mais inteligente para gestão de envios e redução de
              custos de frete.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/funcionalidades" className="hover:text-white">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="/#precos" className="hover:text-white">
                  Preços
                </a>
              </li>
              <li>
                <a href="/#como-funciona" className="hover:text-white">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="/#beneficios" className="hover:text-white">
                  Benefícios
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/sobre" className="hover:text-white">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="/carreiras" className="hover:text-white">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="/imprensa" className="hover:text-white">
                  Imprensa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/ajuda" className="hover:text-white">
                  Central de ajuda
                </a>
              </li>
              <li>
                <a href="/status" className="hover:text-white">
                  Status
                </a>
              </li>
              <li>
                <a href="/comunidade" className="hover:text-white">
                  Comunidade
                </a>
              </li>
              <li>
                <a href="/contato" className="hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 EnvioFácil. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="/termos" className="hover:text-white">
              Termos de uso
            </a>
            <a href="/privacidade" className="hover:text-white">
              Política de privacidade
            </a>
            <a href="/cookies" className="hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
