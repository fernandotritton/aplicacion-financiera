import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { hashPassword, generateAffiliateCode, generateEmailVerificationToken } from '@/app/lib/auth'
import { sendVerificationEmail } from '@/app/lib/email'
import { z } from 'zod'

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  referralCode: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'El usuario ya existe con este email' },
        { status: 400 }
      )
    }

    // Validate referral code if provided
    let referredByUser = null
    if (validatedData.referralCode) {
      referredByUser = await prisma.user.findUnique({
        where: { affiliateCode: validatedData.referralCode }
      })

      if (!referredByUser) {
        return NextResponse.json(
          { message: 'Código de referido inválido' },
          { status: 400 }
        )
      }
    }

    // Hash password and generate tokens
    const hashedPassword = await hashPassword(validatedData.password)
    const affiliateCode = generateAffiliateCode(validatedData.firstName, validatedData.lastName)
    const emailVerificationToken = generateEmailVerificationToken()

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: hashedPassword,
        phone: validatedData.phone,
        affiliateCode,
        referredBy: referredByUser?.id,
        emailVerificationToken,
      }
    })

    // Send verification email
    try {
      await sendVerificationEmail(
        user.email,
        `${user.firstName} ${user.lastName}`,
        emailVerificationToken
      )
    } catch (emailError) {
      console.error('Error sending verification email:', emailError)
      // Don't fail registration if email fails
    }

    return NextResponse.json({
      message: 'Usuario registrado exitosamente. Revisa tu email para verificar tu cuenta.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        affiliateCode: user.affiliateCode,
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}