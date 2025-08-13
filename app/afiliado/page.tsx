'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon,
  GiftIcon,
  CheckCircleIcon,
  CreditCardIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function AfiliadoPage() {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAffiliatePurchase = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch('/api/payments/affiliate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (response.ok) {
        // Redirect to Stripe checkout
        window.location.href = result.checkoutUrl
      } else {
        toast.error(result.message || 'Error al procesar el pago')
      }
    } catch (error) {
      toast.error('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FinanciApp
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-600">
                Iniciar Sesión
              </Link>
              <Link href="/registro" className="btn-primary">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Plan de Afiliado
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Únete a nuestro programa de afiliados por solo $1 USD y comienza a ganar dinero
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                <span>Solo $1 USD</span>
              </div>
              <div className="flex items-center">
                <UsersIcon className="h-6 w-6 mr-2" />
                <span>Sin límite de referidos</span>
              </div>
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 mr-2" />
                <span>Comisiones del 5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Inversión Única de Solo $1 USD!
            </h2>
            <p className="text-lg text-gray-600">
              Una pequeña inversión para grandes oportunidades de ingresos
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">
            <div className="card p-8 text-center relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  MÁS POPULAR
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Plan Afiliado Premium
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-blue-600">$1</span>
                  <span className="text-lg text-gray-600 ml-2">USD único</span>
                </div>
                <p className="text-gray-600">
                  Pago único para activar tu plan de afiliado de por vida
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Tu código de afiliado único</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">5% de comisión por cada venta</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">10% de descuento en tus compras</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Dashboard de estadísticas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Reportes mensuales detallados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Soporte prioritario 24/7</span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handleAffiliatePurchase}
                disabled={isProcessing}
                className="w-full btn-success py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  <>
                    <CreditCardIcon className="h-5 w-5 mr-2" />
                    Activar Plan por $1 USD
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Pago seguro procesado por Stripe. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestro plan de afiliado?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Beneficios únicos que te ayudarán a maximizar tus ganancias
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comisiones Altas</h3>
              <p className="text-gray-600">
                Gana 5% por cada venta realizada a través de tu código de referido.
                Sin límites en tus ganancias.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Red Ilimitada</h3>
              <p className="text-gray-600">
                Refiere a tantas personas como quieras. Cada nuevo afiliado 
                aumenta tu potencial de ganancias.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análisis Detallado</h3>
              <p className="text-gray-600">
                Dashboard completo con estadísticas en tiempo real de tus ventas,
                comisiones y referidos activos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros afiliados
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "En solo 3 meses he ganado más de $500 USD refiriendo amigos. 
                La inversión de $1 se pagó el primer día."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold">María González</p>
                  <p className="text-sm text-gray-600">Afiliada desde marzo 2024</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "La plataforma es súper fácil de usar y los pagos llegan puntualmente. 
                Recomiendo el plan de afiliado al 100%."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  C
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Carlos Rodríguez</p>
                  <p className="text-sm text-gray-600">Afiliado desde enero 2024</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Excelente oportunidad de generar ingresos pasivos. 
                El dashboard me permite ver todo en tiempo real."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Ana López</p>
                  <p className="text-sm text-gray-600">Afiliada desde febrero 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para comenzar a ganar dinero?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Únete a miles de afiliados que ya están generando ingresos con FinanciApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleAffiliatePurchase}
              disabled={isProcessing}
              className="btn-success px-8 py-4 text-lg"
            >
              Comenzar por $1 USD
            </button>
            <Link 
              href="/catalogo" 
              className="btn-secondary bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}