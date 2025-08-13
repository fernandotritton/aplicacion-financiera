# FinanciApp - Plataforma de Financiación y Afiliados

Una aplicación web completa para compras financiadas con un sistema de afiliados integrado. Los usuarios pueden registrarse, verificar su email, activar un plan de afiliado por $1 USD, comprar productos con descuentos exclusivos y ganar comisiones por referir amigos.

## 🚀 Características Principales

### ✅ Sistema de Registro y Autenticación
- **Registro completo** con validación de formularios
- **Verificación por email** automatizada
- **Banner de descuento del 10%** en registro
- **Códigos de referido** para afiliación

### ✅ Plan de Afiliados
- **Activación por $1 USD** (pago único)
- **Comisiones del 5%** por cada venta referida
- **Código de afiliado único** para cada usuario
- **Dashboard de estadísticas** en tiempo real

### ✅ Catálogo de Productos
- **16+ productos de muestra** en diferentes categorías
- **Búsqueda y filtros** avanzados
- **Descuentos para afiliados** (10% adicional)
- **Procesamiento de pagos** con Stripe

### ✅ Sistema de Pagos
- **Integración con Stripe** para pagos seguros
- **Pagos para plan de afiliado** ($1 USD)
- **Pagos para productos** con descuentos
- **Webhooks** para confirmación automática

### ✅ Sistema de Comisiones
- **Tracking de referidos** automático
- **Cálculo de comisiones** en tiempo real
- **Estados de cuenta mensuales**
- **Reportes detallados** de ganancias

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Heroicons
- **Backend**: Next.js API Routes
- **Base de Datos**: Prisma + SQLite (desarrollo)
- **Autenticación**: JWT, bcryptjs
- **Pagos**: Stripe
- **Email**: Nodemailer
- **Validación**: Zod, React Hook Form

## 📦 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd financiacion-afiliados-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
```

Configura las siguientes variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="tu-clave-secreta-muy-larga-y-segura"
NEXTAUTH_URL="http://localhost:3000"

# Email (Gmail)
EMAIL_SERVER_USER="tu-email@gmail.com"
EMAIL_SERVER_PASSWORD="tu-contraseña-de-aplicación"
EMAIL_FROM="noreply@financiacion-app.com"

# Stripe (modo de prueba)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Configuración de la app
AFFILIATE_COMMISSION_RATE="0.05"
DISCOUNT_PERCENTAGE="10"
AFFILIATE_PLAN_PRICE="1.00"
```

### 4. Configurar la base de datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma db push

# Poblar con datos de ejemplo
npx tsx prisma/seed.ts
```

### 5. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🎯 Flujo de Usuario

### 1. Registro de Usuario
- Usuario accede a `/registro`
- Ve banner de descuento del 10%
- Completa formulario con opción de código de referido
- Recibe email de verificación

### 2. Verificación de Email
- Usuario hace clic en enlace de verificación
- Sistema confirma cuenta y envía email de bienvenida
- Usuario recibe su código de afiliado único

### 3. Activación de Plan de Afiliado
- Usuario accede a `/afiliado`
- Ve información del plan ($1 USD)
- Procesa pago con Stripe
- Plan se activa automáticamente

### 4. Compras y Comisiones
- Usuario navega `/catalogo`
- Puede comprar con descuento de afiliado
- Puede compartir código para ganar comisiones
- Ve estadísticas en dashboard personal

## 📊 Estructura de la Base de Datos

### Modelos Principales:
- **User**: Información de usuarios y afiliados
- **Product**: Catálogo de productos
- **Order**: Órdenes de compra
- **Payment**: Procesamiento de pagos
- **AffiliateEarning**: Comisiones ganadas
- **AccountStatement**: Estados de cuenta mensuales

## 🎨 Páginas Principales

- **`/`** - Homepage con información de la plataforma
- **`/registro`** - Registro de usuarios con banner de descuento
- **`/verificar-email`** - Verificación de email automática
- **`/catalogo`** - Catálogo de productos con filtros
- **`/afiliado`** - Información y activación del plan de afiliado
- **`/dashboard`** - Panel de control del usuario (por implementar)

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting del código

# Base de datos
npx prisma studio    # Interfaz visual de la DB
npx prisma db push   # Aplicar cambios del schema
npx tsx prisma/seed.ts # Poblar con datos de ejemplo
```

## 🎁 Datos de Ejemplo

La aplicación incluye:
- **16 productos** en diferentes categorías
- **3 códigos de descuento** predefinidos
- **Imágenes de Unsplash** para los productos
- **Precios realistas** en USD

## 💳 Configuración de Stripe

### Para modo de prueba:
1. Crear cuenta en [Stripe](https://stripe.com)
2. Obtener claves de API en modo de prueba
3. Configurar webhook para eventos de pago
4. Usar tarjetas de prueba: `4242424242424242`

### Webhooks requeridos:
- `checkout.session.completed`
- `payment_intent.succeeded`

## 🔒 Seguridad

- **Validación de datos** con Zod en frontend y backend
- **Sanitización** de inputs del usuario
- **Hashing de contraseñas** con bcryptjs
- **Tokens JWT** para sesiones
- **Verificación de email** obligatoria
- **Procesamiento seguro** de pagos con Stripe

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Variables de entorno en producción:
- Configurar todas las variables en el panel de Vercel
- Usar base de datos PostgreSQL en producción
- Configurar dominio personalizado para emails

## 📞 Soporte

Para dudas o problemas:
- Revisa la documentación
- Verifica la configuración de variables de entorno
- Confirma que Stripe esté configurado correctamente
- Verifica que los emails se estén enviando

## 🔄 Próximas Funcionalidades

- [ ] Dashboard completo del usuario
- [ ] Sistema de carrito de compras
- [ ] Procesamiento de pagos para productos
- [ ] Reportes avanzados de afiliados
- [ ] Sistema de notificaciones
- [ ] App móvil con React Native

---

## 📄 Licencia

Este proyecto es para fines educativos y de demostración.

¡Gracias por usar FinanciApp! 🎉