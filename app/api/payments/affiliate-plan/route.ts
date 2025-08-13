import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { createAffiliatePlanCheckout } from '@/app/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    // For now, we'll simulate a user. In a real app, you'd get this from authentication
    // This endpoint should require authentication
    const body = await request.json()
    const { userId, userEmail } = body

    // If no user provided, create a demo checkout (for testing)
    if (!userId || !userEmail) {
      const checkoutUrl = await createAffiliatePlanCheckout(
        'demo-user-id',
        'demo@example.com'
      )

      return NextResponse.json({
        checkoutUrl,
        message: 'Checkout session created successfully'
      })
    }

    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Check if user already has affiliate plan
    if (user.hasAffiliatePlan) {
      return NextResponse.json(
        { message: 'Ya tienes un plan de afiliado activo' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const checkoutUrl = await createAffiliatePlanCheckout(user.id, user.email)

    return NextResponse.json({
      checkoutUrl,
      message: 'Checkout session created successfully'
    })
  } catch (error) {
    console.error('Affiliate plan payment error:', error)
    return NextResponse.json(
      { message: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
}