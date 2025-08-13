'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { 
  UserPlusIcon, 
  EyeIcon, 
  EyeSlashIcon,
  SparklesIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import type { RegisterFormData } from '@/app/types'

const registerSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('¡Registro exitoso! Revisa tu email para verificar tu cuenta.')
        reset()
      } else {
        toast.error(result.message || 'Error en el registro')
      }
    } catch (error) {
      toast.error('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            FinanciApp
          </Link>
          <p className="mt-2 text-gray-600">Crea tu cuenta y comienza a ganar</p>
        </div>

        {/* Discount Banner */}
        <div className="discount-banner rounded-lg p-4 mb-6 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-2">
              <GiftIcon className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">¡OFERTA ESPECIAL!</span>
            </div>
            <p className="text-sm mb-2">
              🎉 <strong>10% de descuento</strong> en tu primera compra
            </p>
            <p className="text-xs opacity-90">
              Solo por $1 USD - Plan de afiliado incluido
            </p>
            <div className="flex items-center justify-center mt-2">
              <SparklesIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">¡Oferta limitada!</span>
              <SparklesIcon className="h-4 w-4 ml-1" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-400 opacity-20"></div>
        </div>

        {/* Registration Form */}
        <div className="card p-8">
          <div className="text-center mb-6">
            <UserPlusIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
            <p className="text-gray-600">Únete a nuestra comunidad</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  className="input-field"
                  placeholder="Tu nombre"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido *
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  className="input-field"
                  placeholder="Tu apellido"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                {...register('email')}
                className="input-field"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono (opcional)
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="input-field"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="input-field pr-10"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className="input-field pr-10"
                  placeholder="Repite tu contraseña"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código de Referido (opcional)
              </label>
              <input
                type="text"
                {...register('referralCode')}
                className="input-field"
                placeholder="¿Te refirió alguien?"
              />
              <p className="text-xs text-gray-500 mt-1">
                Si tienes un código de referido, ingrésalo para obtener beneficios adicionales
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creando cuenta...
                </div>
              ) : (
                <>
                  <UserPlusIcon className="h-5 w-5 mr-2" />
                  Crear Cuenta Gratis
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center">
              Al registrarte, aceptas nuestros{' '}
              <Link href="/terminos" className="text-blue-600 hover:underline">
                Términos de Servicio
              </Link>{' '}
              y{' '}
              <Link href="/privacidad" className="text-blue-600 hover:underline">
                Política de Privacidad
              </Link>
            </p>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}