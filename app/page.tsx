import Link from 'next/link'
import { ArrowRightIcon, ShoppingBagIcon, UsersIcon, CreditCardIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                FinanciApp
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                La plataforma de financiación inteligente donde puedes comprar productos 
                y ganar dinero refiriendo amigos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/registro" 
                  className="btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  Comenzar Ahora
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/catalogo" 
                  className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir FinanciApp?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa que combina financiación inteligente con un 
              sistema de afiliados rentable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compras Financiadas</h3>
              <p className="text-gray-600">
                Compra productos de calidad con opciones de financiación flexibles 
                y tasas preferenciales
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sistema de Afiliados</h3>
              <p className="text-gray-600">
                Gana comisiones refiriendo amigos y construye un ingreso pasivo 
                mientras ayudas a otros
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pagos Seguros</h3>
              <p className="text-gray-600">
                Procesamiento seguro de pagos con múltiples opciones y 
                protección total de tus datos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Únete a nuestra comunidad hoy!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Más de 10,000 usuarios ya están ganando dinero y comprando inteligentemente
          </p>
          <Link 
            href="/registro" 
            className="btn-primary px-8 py-4 text-lg"
          >
            Registrarse Gratis
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">FinanciApp</h3>
            <p className="text-gray-400 mb-4">
              Tu plataforma de confianza para financiación y afiliados
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/terminos" className="text-gray-400 hover:text-white">
                Términos
              </Link>
              <Link href="/privacidad" className="text-gray-400 hover:text-white">
                Privacidad
              </Link>
              <Link href="/contacto" className="text-gray-400 hover:text-white">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}