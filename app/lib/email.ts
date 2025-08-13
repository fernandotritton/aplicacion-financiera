import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export const sendVerificationEmail = async (
  email: string,
  name: string,
  verificationToken: string
): Promise<void> => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verificar-email?token=${verificationToken}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verificación de Email - FinanciApp</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Bienvenido a FinanciApp!</h1>
          <p>Verifica tu email para activar tu cuenta</p>
        </div>
        <div class="content">
          <h2>Hola ${name},</h2>
          <p>¡Gracias por registrarte en FinanciApp! Para completar tu registro y activar tu cuenta, necesitamos verificar tu dirección de email.</p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verificar Mi Email</a>
          </div>
          
          <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
          <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 5px;">
            ${verificationUrl}
          </p>
          
          <p><strong>Beneficios de verificar tu cuenta:</strong></p>
          <ul>
            <li>✅ Acceso completo a todos los productos</li>
            <li>✅ Descuento del 10% en tu primera compra</li>
            <li>✅ Plan de afiliado por solo $1 USD</li>
            <li>✅ Comisiones por referir amigos</li>
          </ul>
          
          <p>Si no creaste esta cuenta, puedes ignorar este email.</p>
          
          <p>¡Esperamos verte pronto en FinanciApp!</p>
        </div>
        <div class="footer">
          <p>© 2024 FinanciApp. Todos los derechos reservados.</p>
          <p>Este email fue enviado a ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: '🎉 Verifica tu email - FinanciApp',
    html: htmlContent,
  }

  await transporter.sendMail(mailOptions)
}

export const sendWelcomeEmail = async (
  email: string,
  name: string,
  affiliateCode: string
): Promise<void> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>¡Bienvenido a FinanciApp!</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .code-box { background: #22c55e; color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 ¡Tu cuenta está activada!</h1>
        </div>
        <div class="content">
          <h2>¡Hola ${name}!</h2>
          <p>Tu cuenta en FinanciApp ha sido verificada exitosamente. ¡Ya puedes comenzar a disfrutar de todos nuestros beneficios!</p>
          
          <div class="code-box">
            <h3>Tu Código de Afiliado:</h3>
            <h2 style="margin: 10px 0; font-size: 24px; letter-spacing: 2px;">${affiliateCode}</h2>
            <p>¡Comparte este código y gana comisiones!</p>
          </div>
          
          <p><strong>¿Qué puedes hacer ahora?</strong></p>
          <ul>
            <li>🛍️ Explorar nuestro catálogo de productos</li>
            <li>💰 Activar tu plan de afiliado por $1 USD</li>
            <li>👥 Referir amigos con tu código</li>
            <li>📊 Ver tus ganancias en tiempo real</li>
          </ul>
          
          <p>¡Gracias por unirte a FinanciApp!</p>
        </div>
        <div class="footer">
          <p>© 2024 FinanciApp. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: '🎉 ¡Cuenta activada! - FinanciApp',
    html: htmlContent,
  }

  await transporter.sendMail(mailOptions)
}