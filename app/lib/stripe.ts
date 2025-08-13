import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const createCheckoutSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  successUrl: string,
  cancelUrl: string,
  metadata?: Stripe.MetadataParam
): Promise<Stripe.Checkout.Session> => {
  return await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
}

export const createAffiliatePlanCheckout = async (
  userId: string,
  userEmail: string
): Promise<string> => {
  const session = await createCheckoutSession(
    [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Plan de Afiliado Premium - FinanciApp',
          description: 'Activa tu plan de afiliado y comienza a ganar comisiones del 5%',
          images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'],
        },
        unit_amount: 100, // $1.00 in cents
      },
      quantity: 1,
    }],
    `${process.env.NEXTAUTH_URL}/pago-exitoso?type=affiliate`,
    `${process.env.NEXTAUTH_URL}/afiliado`,
    {
      userId,
      userEmail,
      paymentType: 'AFFILIATE_PLAN',
    }
  )

  return session.url!
}

export const createProductCheckout = async (
  userId: string,
  userEmail: string,
  products: Array<{ id: string; name: string; price: number; quantity: number }>
): Promise<string> => {
  const lineItems = products.map(product => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price * 100), // Convert to cents
    },
    quantity: product.quantity,
  }))

  const session = await createCheckoutSession(
    lineItems,
    `${process.env.NEXTAUTH_URL}/pago-exitoso?type=product`,
    `${process.env.NEXTAUTH_URL}/catalogo`,
    {
      userId,
      userEmail,
      paymentType: 'PRODUCT_PURCHASE',
      products: JSON.stringify(products.map(p => ({ id: p.id, quantity: p.quantity }))),
    }
  )

  return session.url!
}

export const handleWebhookEvent = async (
  body: string,
  signature: string
): Promise<Stripe.Event> => {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}