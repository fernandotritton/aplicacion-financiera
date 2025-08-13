import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { sendWelcomeEmail } from '@/app/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { message: 'Token de verificación requerido' },
        { status: 400 }
      )
    }

    // Find user with verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        isEmailVerified: false,
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Token de verificación inválido o ya utilizado' },
        { status: 400 }
      )
    }

    // Update user as verified
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
      }
    })

    // Send welcome email
    try {
      await sendWelcomeEmail(
        updatedUser.email,
        `${updatedUser.firstName} ${updatedUser.lastName}`,
        updatedUser.affiliateCode!
      )
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail verification if email fails
    }

    return NextResponse.json({
      message: '¡Email verificado exitosamente! Tu cuenta está ahora activa.',
      affiliateCode: updatedUser.affiliateCode,
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isEmailVerified: updatedUser.isEmailVerified,
      }
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}