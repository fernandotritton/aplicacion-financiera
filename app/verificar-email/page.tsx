'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function VerificarEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [affiliateCode, setAffiliateCode] = useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token de verificación no encontrado')
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const result = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage(result.message)
          setAffiliateCode(result.affiliateCode)
        } else {
          setStatus('error')
          setMessage(result.message || 'Error al verificar el email')
        }
      } catch (error) {
        setStatus('error')
        setMessage('Error de conexión. Inténtalo de nuevo.')
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            FinanciApp
          </Link>
        </div>

        <div className="card p-8 text-center">
          {status === 'loading' && (
            <div className="animate-fade-in">
              <ArrowPathIcon className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verificando tu email...
              </h2>
              <p className="text-gray-600">
                Por favor espera mientras procesamos tu verificación
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="animate-fade-in">
              <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Email Verificado!
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              
              {affiliateCode && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Tu Código de Afiliado
                  </h3>
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-mono text-lg">
                    {affiliateCode}
                  </div>
                  <p className="text-green-700 text-sm mt-2">
                    ¡Comparte este código y gana comisiones!
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="w-full btn-primary py-3 text-lg"
                >
                  Ir a Mi Dashboard
                </Link>
                <Link
                  href="/catalogo"
                  className="w-full btn-secondary py-3 text-lg"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="animate-fade-in">
              <XCircleIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Error en la Verificación
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              
              <div className="space-y-3">
                <Link
                  href="/registro"
                  className="w-full btn-primary py-3 text-lg"
                >
                  Registrarse de Nuevo
                </Link>
                <Link
                  href="/login"
                  className="w-full btn-secondary py-3 text-lg"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}